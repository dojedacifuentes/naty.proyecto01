# PF1822 · Cápsula 2 (AE2) · Consumir modelos por API — guion

Base para HeyGen: `AE2-capsula.pptx` (una escena por lámina; la narración está en las notas).
Esta tabla es la misma narración, para otras herramientas o para pulirla antes de grabar.

| Lámina | En pantalla | Narración |
| --- | --- | --- |
| 1 | Cápsula 2: Consumir modelos por API | Te doy la bienvenida a la cápsula 2 del módulo 2: Consumir modelos por API. "Hablar con un modelo es hacer una solicitud HTTP bien hecha". |
| 2 | REST en dos métodos | REST en dos métodos. GET para leer (listar modelos); POST para enviar datos y pedir un resultado (generar, obtener embeddings). |
| 3 | Leer la documentación oficial | Leer la documentación oficial. Cómo están organizados los manuales de OpenAI y de Hugging Face: referencia de la API, guías, ejemplos. En cada endpoint buscar URL, autenticación, cuerpo y respuesta. |
| 4 | Endpoints de generación y de embeddings | Endpoints de generación y de embeddings. Generación: messages con roles, luego texto en choices y consumo en usage. Embeddings: input, luego un vector por texto en data. |
| 5 | Autenticación y variables de entorno | Autenticación y variables de entorno. Encabezado Authorization: Bearer <clave>; la clave vive en una variable de entorno o en los Secrets del entorno, nunca en el código ni en el repositorio. |
| 6 | requests y httpx | requests y httpx. Las dos bibliotecas hacen lo mismo en lo básico; httpx suma tiempos de espera claros y una forma sencilla de simular la API en pruebas. |
| 7 | Cuerpos JSON y lectura de la respuesta | Cuerpos JSON y lectura de la respuesta. Armar el diccionario, enviarlo con json=, leer respuesta.json(). Siempre mirar primero status_code. |
| 8 | Errores del servicio | Errores del servicio. 401 clave inválida, 429 demasiadas solicitudes (esperar y reintentar), 5xx falla del proveedor. Un mensaje claro vale más que un programa que se cae. |
| 9 | Modularizar, documentar y probar | Modularizar, documentar y probar. Una clase que encapsula las llamadas, con docstrings, y pruebas unitarias que simulan la API para correr sin conexión ni costo. |
| 10 | Tu tarea | Tu tarea. Notebook guiado y actividad 1, parte B: ClienteIA. |
