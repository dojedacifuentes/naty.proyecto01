#!/usr/bin/env python3
"""Audita los enlaces verificadores declarados en las propuestas.

Recorre propuestas/<cliente>/<plan>/verificadores.md, extrae las URLs y comprueba
el estado HTTP de cada una. Escribe un informe en state/auditoria-verificadores.csv.

IMPORTANTE — lo que este script NO puede hacer:
  * No sabe si el LMS muestra el plan formativo correcto.
  * No sabe si el módulo visible es el segundo.
  * No sabe si las credenciales sirven (no autentica).
Esas tres verificaciones son humanas y son las que más propuestas salvan.
Ver docs/04-verificadores-protocolo.md.

Uso:
    python3 scripts/auditar_verificadores.py
    python3 scripts/auditar_verificadores.py --timeout 20
"""
import argparse
import csv
import re
import urllib.error
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PROPUESTAS = RAIZ / "propuestas"
SALIDA = RAIZ / "state" / "auditoria-verificadores.csv"

URL_RE = re.compile(r"https?://[^\s)\]<>\"']+")
UA = "Mozilla/5.0 (auditoria-verificadores; licitacion-td-2026)"


def estado(url: str, timeout: int) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA}, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return f"{r.status} abre"
    except urllib.error.HTTPError as e:
        if e.code in (401, 403):
            return f"{e.code} pide permiso"
        return f"{e.code} error"
    except urllib.error.URLError as e:
        return f"sin respuesta ({e.reason})"
    except Exception as e:  # noqa: BLE001
        return f"fallo ({type(e).__name__})"


def recolectar():
    if not PROPUESTAS.exists():
        return []
    filas = []
    for archivo in sorted(PROPUESTAS.glob("*/*/verificadores.md")):
        cliente, plan = archivo.parts[-3], archivo.parts[-2]
        for n, linea in enumerate(archivo.read_text(encoding="utf-8").splitlines(), 1):
            for url in URL_RE.findall(linea):
                filas.append({
                    "cliente": cliente,
                    "plan": plan,
                    "archivo": str(archivo.relative_to(RAIZ)),
                    "linea": n,
                    "url": url,
                    "contexto": linea.strip()[:120],
                })
    return filas


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--timeout", type=int, default=15)
    args = ap.parse_args()

    filas = recolectar()
    if not filas:
        print("No hay propuestas/*/*/verificadores.md todavía. Nada que auditar.")
        print("Crea propuestas con templates/anexo2-esqueleto.md y vuelve a correr.")
        return

    for f in filas:
        f["estado_http"] = estado(f["url"], args.timeout)
        f["muestra_lo_que_dice"] = "REVISAR A MANO"
        f["riesgo"] = ""
        f["accion"] = ""
        f["responsable"] = ""
        print(f"{f['estado_http']:28} {f['cliente']}/{f['plan']}  {f['url'][:70]}")

    SALIDA.parent.mkdir(parents=True, exist_ok=True)
    with SALIDA.open("w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=list(filas[0]))
        w.writeheader()
        w.writerows(filas)

    malos = [f for f in filas if not f["estado_http"].startswith("2")]
    print(f"\n{len(filas)} enlaces revisados, {len(malos)} con problema.")
    print(f"Informe: {SALIDA.relative_to(RAIZ)}")
    print("Recuerda: la columna 'muestra_lo_que_dice' se llena a mano.")


if __name__ == "__main__":
    main()
