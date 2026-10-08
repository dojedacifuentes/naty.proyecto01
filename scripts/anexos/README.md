# Verificador de Anexos 2

Compara el texto de cada Anexo 2 con la **tabla de verdad** y deja, en cada casilla, un estado y su evidencia.

```
reglas (data/reglas/reglas.json) ─┐
tabla de verdad ──────────────────┼─► verificar-anexos.mjs ─► resultados.json · resultados.csv · panel.html
textos de los anexos (Drive) ─────┤
aula en vivo (opcional) ──────────┘
```

## Cómo se construye un chequeo

Cada chequeo es una función pura `f(anexo, filaDeLaTabla) → { estado, evidencia }`:

1. **Una regla** del catálogo (`regla: 'R39'`), que trae severidad y origen.
2. **Un valor esperado** que sale de la tabla de verdad, nunca del criterio del momento.
3. **Una comparación determinista**: texto normalizado (sin tildes ni formato), conteo o URL.
4. **Evidencia**: la cita del anexo y su sección, o el dato que falta.
5. **Cuatro salidas**: CUMPLE, NO CUMPLE, REQUIERE JUICIO (no se puede decidir comparando) o NO APLICA.

Agregar un chequeo es agregar un objeto al arreglo `CHEQUEOS` y su ID en la regla correspondiente.
Después se corre la prueba sembrada: si un error conocido no se detecta, el chequeo no sirve.

## Fórmula

| Medida | Cálculo |
|---|---|
| Índice de Alineación (IA) | Σ peso·[cumple] ÷ Σ peso·[cumple o no cumple]. Peso: crítica 3, mayor 2, menor 1. Los chequeos de juicio no pesan |
| Completitud (K) | casillas evaluadas ÷ (anexos esperados × chequeos) |
| Estado del anexo | BLOQUEADO si no se leyó o falla un crítico · OBSERVADO si IA < 100 % o hay juicio · LISTO si IA = 100 % y sin juicio |
| Sensibilidad (S) | errores sembrados detectados ÷ errores sembrados (`--sembrar`) |

El script se detiene si la suma de casillas no cuadra con anexos × chequeos.

## Uso

```bash
node privado/verificador-anexos/construir-tabla.mjs
node scripts/anexos/verificar-anexos.mjs --sembrar
```

La skill `.claude/skills/cruce-anexo` describe el flujo completo, incluida la lectura de los anexos desde Drive.
