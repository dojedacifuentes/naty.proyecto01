"""Mide resúmenes generados contra referencias y registra los resultados."""
import csv
import re

from nltk.translate.bleu_score import SmoothingFunction, sentence_bleu
from rouge_score import rouge_scorer

from preprocesar import quitar_tildes


class TokenizadorES:
    """rouge-score descarta por defecto las letras con tilde; este tokenizador las conserva."""

    def tokenize(self, texto: str) -> list[str]:
        return re.findall(r"\w+", quitar_tildes(texto.lower()))


tok = TokenizadorES()
rouge = rouge_scorer.RougeScorer(["rouge1", "rougeL"], tokenizer=tok)
suavizado = SmoothingFunction().method1  # textos cortos: sin suavizado BLEU da 0 con facilidad


def medir(referencia: str, generado: str) -> dict:
    """Devuelve ROUGE-1, ROUGE-L (F1) y BLEU de un resumen frente a su referencia."""
    r = rouge.score(referencia, generado)
    bleu = sentence_bleu([tok.tokenize(referencia)], tok.tokenize(generado), smoothing_function=suavizado)
    return {"rouge1_f": round(r["rouge1"].fmeasure, 3), "rougeL_f": round(r["rougeL"].fmeasure, 3),
            "bleu": round(bleu, 3)}


def registrar(filas: list[dict], ruta: str = "resultados.csv") -> None:
    """Escribe el protocolo: una fila por ticket, estrategia y temperature."""
    campos = ["ticket", "estrategia", "version", "temperature", "rouge1_f", "rougeL_f", "bleu",
              "tokens", "coherencia_1a3", "relevancia_1a3", "comentario"]
    with open(ruta, "w", newline="", encoding="utf-8") as f:
        escritor = csv.DictWriter(f, fieldnames=campos)
        escritor.writeheader()
        escritor.writerows(filas)
