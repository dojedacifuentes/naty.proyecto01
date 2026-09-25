import httpx
import pytest

from cliente_ia import ClienteIA, ErrorAPI


def cliente_simulado(cuerpo: dict, estado: int = 200, registro: list | None = None) -> ClienteIA:
    """Crea un ClienteIA cuyas solicitudes responde una API falsa."""
    def responder(solicitud: httpx.Request) -> httpx.Response:
        if registro is not None:
            registro.append(solicitud)
        return httpx.Response(estado, json=cuerpo)

    http = httpx.Client(base_url="https://api.test/v1", transport=httpx.MockTransport(responder))
    return ClienteIA(clave_api="clave-de-prueba", modelo_chat="modelo-x",
                     modelo_embeddings="embeddings-x", http=http)


def test_generar_devuelve_texto_tokens_y_autentica():
    registro = []
    cliente = cliente_simulado({"choices": [{"message": {"content": "Resumen"}}],
                                "usage": {"total_tokens": 42}}, registro=registro)
    respuesta = cliente.generar([{"role": "user", "content": "hola"}])
    assert respuesta == {"texto": "Resumen", "tokens": {"total_tokens": 42}}
    assert registro[0].method == "POST"
    assert registro[0].url.path == "/v1/chat/completions"
    assert registro[0].headers["Authorization"] == "Bearer clave-de-prueba"


def test_embeddings_respeta_el_orden_de_entrada():
    cliente = cliente_simulado({"data": [{"index": 1, "embedding": [0.3]},
                                         {"index": 0, "embedding": [0.1]}]})
    assert cliente.embeddings(["a", "b"]) == [[0.1], [0.3]]


def test_listar_modelos_usa_get():
    registro = []
    cliente = cliente_simulado({"data": [{"id": "m1"}, {"id": "m2"}]}, registro=registro)
    assert cliente.listar_modelos() == ["m1", "m2"]
    assert registro[0].method == "GET"


def test_error_http_se_informa_con_su_codigo():
    cliente = cliente_simulado({"error": {"message": "clave inválida"}}, estado=401)
    with pytest.raises(ErrorAPI) as error:
        cliente.generar([{"role": "user", "content": "hola"}])
    assert error.value.estado == 401


def test_sin_clave_no_arranca(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    with pytest.raises(ValueError):
        ClienteIA()
