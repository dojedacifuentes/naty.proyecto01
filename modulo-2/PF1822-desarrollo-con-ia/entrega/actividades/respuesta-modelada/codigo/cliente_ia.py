"""Cliente mínimo y reutilizable para APIs de modelos generativos compatibles con OpenAI."""
from __future__ import annotations

import os

import httpx


class ErrorAPI(Exception):
    """Error devuelto por la API, con su código HTTP y el mensaje del servicio."""

    def __init__(self, estado: int, mensaje: str):
        super().__init__(f"HTTP {estado}: {mensaje}")
        self.estado = estado
        self.mensaje = mensaje


class ClienteIA:
    """Encapsula las llamadas de listado de modelos, generación y embeddings.

    Args:
        base_url: URL base de la API, por ejemplo "https://api.openai.com/v1".
        clave_api: clave de acceso. Si es None, se lee de la variable OPENAI_API_KEY.
        modelo_chat: modelo de generación. Si es None, se lee de MODELO_CHAT.
        modelo_embeddings: modelo de embeddings. Si es None, se lee de MODELO_EMBEDDINGS.
        timeout: segundos máximos de espera por solicitud.
        http: cliente httpx ya construido; las pruebas lo usan para simular la API.
    """

    def __init__(self, base_url: str = "https://api.openai.com/v1", clave_api: str | None = None,
                 modelo_chat: str | None = None, modelo_embeddings: str | None = None,
                 timeout: float = 30.0, http: httpx.Client | None = None):
        self.clave_api = clave_api or os.environ.get("OPENAI_API_KEY")
        if not self.clave_api:
            raise ValueError("Falta OPENAI_API_KEY: defínela en el entorno, nunca en el código.")
        self.modelo_chat = modelo_chat or os.environ.get("MODELO_CHAT")
        self.modelo_embeddings = modelo_embeddings or os.environ.get("MODELO_EMBEDDINGS")
        self.http = http or httpx.Client(base_url=base_url, timeout=timeout)
        self.http.headers["Authorization"] = f"Bearer {self.clave_api}"

    def _revisar(self, respuesta: httpx.Response) -> dict:
        """Devuelve el JSON de la respuesta o lanza ErrorAPI si el estado es 400 o más."""
        if respuesta.status_code >= 400:
            raise ErrorAPI(respuesta.status_code, respuesta.text[:300])
        return respuesta.json()

    def listar_modelos(self) -> list[str]:
        """Devuelve los identificadores de los modelos disponibles (GET /models)."""
        datos = self._revisar(self.http.get("/models"))
        return [m["id"] for m in datos.get("data", [])]

    def generar(self, mensajes: list[dict], temperature: float = 0.2, max_tokens: int = 300) -> dict:
        """Envía una conversación al endpoint de chat (POST /chat/completions).

        Args:
            mensajes: lista de {"role": "system" | "user" | "assistant", "content": str}.
            temperature: aleatoriedad de la respuesta; baja para resúmenes consistentes.
            max_tokens: máximo de tokens de la respuesta.

        Returns:
            {"texto": str, "tokens": dict} con el texto generado y el uso de tokens.
        """
        if not self.modelo_chat:
            raise ValueError("Falta el modelo: define MODELO_CHAT.")
        datos = self._revisar(self.http.post("/chat/completions", json={
            "model": self.modelo_chat, "messages": mensajes,
            "temperature": temperature, "max_tokens": max_tokens,
        }))
        return {"texto": datos["choices"][0]["message"]["content"], "tokens": datos.get("usage", {})}

    def embeddings(self, textos: list[str]) -> list[list[float]]:
        """Devuelve un vector por texto, en el mismo orden de entrada (POST /embeddings)."""
        if not self.modelo_embeddings:
            raise ValueError("Falta el modelo: define MODELO_EMBEDDINGS.")
        datos = self._revisar(self.http.post("/embeddings", json={
            "model": self.modelo_embeddings, "input": textos,
        }))
        return [d["embedding"] for d in sorted(datos["data"], key=lambda d: d["index"])]
