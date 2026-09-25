# PF1822 · Cápsula 4 (AE4) · Preparar y medir texto — guion

Base para HeyGen: `AE4-capsula.pptx` (una escena por lámina; la narración está en las notas).
Esta tabla es la misma narración, para otras herramientas o para pulirla antes de grabar.

| Lámina | En pantalla | Narración |
| --- | --- | --- |
| 1 | Cápsula 4: Preparar y medir texto | Te doy la bienvenida a la cápsula 4 del módulo 2: Preparar y medir texto. "Basura entra, basura sale: limpiar antes, medir después". |
| 2 | Conceptos básicos de NLP | Conceptos básicos de NLP. Token (unidad que procesa el modelo), palabra, lema (forma de diccionario), stopwords (palabras frecuentes con poco contenido), n-gramas (secuencias de n tokens). |
| 3 | Limpieza | Limpieza. Quitar HTML, caracteres especiales, firmas y ruido; reemplazar correos y enlaces por marcas. Cuidado con no borrar el problema que reporta el ticket. |
| 4 | Normalización | Normalización. Mayúsculas y minúsculas, espacios, estandarización de texto; tildes solo para comparar al medir. |
| 5 | Tokenizar, lematizar, stemming | Tokenizar, lematizar, stemming. spaCy (es_core_news_sm) y NLTK. Lematizar: "corriendo", luego "correr"; stemming: recorta la raíz. |
| 6 | Vectorización básica | Vectorización básica. CountVectorizer y TF-IDF de scikit-learn: representar textos como números para compararlos. |
| 7 | Un pipeline modular | Un pipeline modular. Funciones reutilizables por etapa (limpiar, tokenizar, ngramas, medir) que se encadenan y se prueban por separado. |
| 8 | Métricas de calidad | Métricas de calidad. ROUGE (cuánto de la referencia aparece en el resumen), BLEU (cuánto del resumen aparece en la referencia, con penalización por largo), coherencia y relevancia con pauta humana. En español, usar un tokenizador que respete las tildes. |
| 9 | Registrar y ajustar | Registrar y ajustar. Una fila por prueba en un CSV; identificar ajustes a partir de los números. |
| 10 | Tu tarea | Tu tarea. Actividad 2, pasos 1, 4 y 5. |
