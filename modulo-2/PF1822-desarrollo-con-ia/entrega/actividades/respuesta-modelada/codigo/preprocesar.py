"""Limpieza, normalización y tokenización de tickets antes de enviarlos al modelo."""
import html
import re
import unicodedata

import spacy

nlp = spacy.load("es_core_news_sm")  # python -m spacy download es_core_news_sm


def limpiar(texto: str) -> str:
    """Quita HTML, firma y datos personales; deja un texto listo para el modelo."""
    texto = html.unescape(texto)
    texto = re.sub(r"<br\s*/?>|</p>", "\n", texto, flags=re.IGNORECASE)
    texto = re.sub(r"<[^>]+>", " ", texto)                   # resto de etiquetas HTML
    texto = re.split(r"\n\s*--\s", texto)[0]                 # todo lo que sigue a la firma "-- "
    texto = re.sub(r"Enviado desde mi \w+", " ", texto, flags=re.IGNORECASE)
    texto = re.sub(r"\S+@\S+", "[correo]", texto)            # datos personales fuera
    texto = re.sub(r"https?://\S+", "[enlace]", texto)
    texto = re.sub(r"!{2,}", "!", texto)
    return re.sub(r"\s+", " ", texto).strip()


def quitar_tildes(texto: str) -> str:
    """Pasa 'sesión' a 'sesion'; se usa solo para comparar textos al medir."""
    return "".join(c for c in unicodedata.normalize("NFD", texto) if unicodedata.category(c) != "Mn")


def tokenizar(texto: str, lematizar: bool = False, sin_stopwords: bool = False) -> list[str]:
    """Tokeniza con spaCy; opcionalmente lematiza y quita stopwords y puntuación."""
    tokens = []
    for t in nlp(texto.lower()):
        if t.is_punct or t.is_space or (sin_stopwords and t.is_stop):
            continue
        tokens.append(t.lemma_ if lematizar else t.text)
    return tokens


def ngramas(tokens: list[str], n: int = 2) -> list[tuple[str, ...]]:
    """Devuelve los n-gramas consecutivos de una lista de tokens."""
    return list(zip(*(tokens[i:] for i in range(n))))
