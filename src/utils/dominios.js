export const DOMINIOS_LABEL = {
  animo: 'Ánimo positivo',
  gestion_emocional: 'Gestión emocional',
  bienestar_fisico: 'Bienestar físico',
  funcionamiento: 'Funcionamiento diario',
};

/**
 * Calcula % de bienestar por dominio (0..100, mayor = mejor)
 * @param {Array<{id:string, domain:string}>} questions
 * @param {Record<string, number>} respuestas - mapa qid -> 0..3
 * @returns {Record<string, number>} dominio -> porcentaje
 */
export function calcularBienestarPorDominio(questions, respuestas) {
  const buckets = {};
  for (const q of questions) {
    const val = Number(respuestas[q.id] ?? 0);
    if (!buckets[q.domain]) buckets[q.domain] = { sum: 0, n: 0 };
    buckets[q.domain].sum += val;
    buckets[q.domain].n += 1;
  }
  const out = {};
  for (const [dom, { sum, n }] of Object.entries(buckets)) {
    const max = 3 * n;
    const pct = Math.round((1 - (sum / max)) * 100);
    out[dom] = Math.max(0, Math.min(100, pct));
  }
  // garantiza los 4 dominios aunque falten respuestas
  for (const dom of Object.keys(DOMINIOS_LABEL)) {
    if (!(dom in out)) out[dom] = 0;
  }
  return out;
}
