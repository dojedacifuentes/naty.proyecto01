/**
 * Texto de SIPFOR (todo en mayúsculas) → oración con las mismas palabras. Lo usan la narración de las
 * cápsulas (produccion.mjs) y los enunciados de ABP y ABPRO (abp-abpro.mjs).
 */

// Texto del plan (en mayúsculas en SIPFOR) → oración para la voz, con las mismas palabras.
// Algunas voces deletrean las palabras en mayúsculas; las siglas y nombres propios se restauran.
export const PROPIOS = [
  ['apis', 'APIs'], ['api', 'API'], ['http', 'HTTP'], ['json', 'JSON'], ['csv', 'CSV'], ['xml', 'XML'],
  ['roi', 'ROI'], ['crud', 'CRUD'], ['ia', 'IA'], ['nlp', 'NLP'], ['bleu', 'BLEU'], ['rouge', 'ROUGE'],
  ['tf-idf', 'TF-IDF'], ['qa', 'QA'], ['rest', 'REST'], ['get', 'GET'], ['post', 'POST'], ['nltk', 'NLTK'],
  ['spacy', 'spaCy'], ['openai', 'OpenAI'], ['hugging face', 'Hugging Face'], ['supabase', 'Supabase'],
  ['python', 'Python'], ['if/switch', 'If/Switch'], ['merge', 'Merge'], ['filter', 'Filter'],
  ['summarize', 'Summarize'], ['split', 'Split'], ['set', 'Set'], ['tensorflow', 'TensorFlow'],
  ['pytorch', 'PyTorch'], ['langchain', 'LangChain'], ['diffusers', 'Diffusers'], ['transformers', 'Transformers'],
  ['countvectorizer', 'CountVectorizer'],
];
export function oracion(t) {
  let s = t.toLowerCase();
  for (const [a, b] of PROPIOS) {
    const patron = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // en modo u, "-" y "/" no se escapan
    s = s.replace(new RegExp(`(?<![\\p{L}\\d])${patron}(?![\\p{L}\\d])`, 'gu'), b);
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}
