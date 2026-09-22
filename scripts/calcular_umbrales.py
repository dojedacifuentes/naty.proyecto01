#!/usr/bin/env python3
"""Calcula, por plan formativo, los umbrales cuantitativos de la rúbrica 7.4.

Uso:
    python3 scripts/calcular_umbrales.py            # imprime tabla
    python3 scripts/calcular_umbrales.py --csv      # escribe data/umbrales-por-plan.csv

El único umbral que depende de las horas del plan es el de actividades de extensión
(ítem D3): 1 actividad por cada 50 / 80 / 100 horas para nota 7 / 5 / 3.
Los demás umbrales son constantes y se incluyen para tener un checklist por plan.
"""
import csv
import math
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PLANES = RAIZ / "data" / "planes-formativos.csv"
SALIDA = RAIZ / "data" / "umbrales-por-plan.csv"

# Umbrales constantes de la rúbrica (bases 2026, punto 7.4)
CONSTANTES = {
    "indicadores_por_ae": 3,      # B1
    "instrumentos_distintos": 3,  # B2
    "elementos_portafolio": 6,    # B3, num. 4.3
    "actividades_practicas": 2,   # C2
    "herramientas_didacticas": 2, # C4
    "habilidades_siglo_xxi": 3,   # C5
    "herramientas_industria": 5,  # D1
    "estrategias_vinculacion": 4, # D2
}


def extension(horas: int, cada: int) -> int:
    """Actividades de extensión exigidas: 1 por cada `cada` horas, redondeando arriba."""
    return math.ceil(horas / cada)


def filas():
    with PLANES.open(encoding="utf-8") as fh:
        for p in csv.DictReader(fh):
            horas = int(p["horas"])
            yield {
                "codigo_plan": p["codigo_plan"],
                "nombre": p["nombre"],
                "linea": p["linea"],
                "horas": horas,
                "extension_nota7": extension(horas, 50),
                "extension_nota5": extension(horas, 80),
                "extension_nota3": extension(horas, 100),
                **CONSTANTES,
            }


def main() -> None:
    datos = list(filas())
    if "--csv" in sys.argv:
        with SALIDA.open("w", newline="", encoding="utf-8") as fh:
            w = csv.DictWriter(fh, fieldnames=list(datos[0]))
            w.writeheader()
            w.writerows(datos)
        print(f"escrito: {SALIDA.relative_to(RAIZ)}  ({len(datos)} planes)")
        return

    print(f"{'PLAN':8} {'HORAS':>6} {'EXT-7':>6} {'EXT-5':>6} {'EXT-3':>6}  NOMBRE")
    for d in sorted(datos, key=lambda x: -x["horas"]):
        print(
            f"{d['codigo_plan']:8} {d['horas']:6} {d['extension_nota7']:6} "
            f"{d['extension_nota5']:6} {d['extension_nota3']:6}  {d['nombre'][:50]}"
        )
    total = sum(d["extension_nota7"] for d in datos)
    print(f"\nActividades de extensión distintas a diseñar por cliente para nota 7: {total}")


if __name__ == "__main__":
    main()
