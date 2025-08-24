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
  // Verificar que las respuestas sean válidas
  if (!respuestas || typeof respuestas !== 'object') {
    console.warn('calcularBienestarPorDominio: respuestas inválidas', respuestas)
    // Retornar valores por defecto si no hay respuestas válidas
    const out = {}
    for (const dom of Object.keys(DOMINIOS_LABEL)) {
      out[dom] = 0
    }
    return out
  }

  // Debug: mostrar qué se está procesando
  console.log('calcularBienestarPorDominio input:', { questions, respuestas })

  const buckets = {}
  let totalValidAnswers = 0
  
  for (const q of questions) {
    const val = Number(respuestas[q.id])
    // Solo contar respuestas válidas (0, 1, 2, 3)
    if (!Number.isNaN(val) && val >= 0 && val <= 3) {
      if (!buckets[q.domain]) buckets[q.domain] = { sum: 0, n: 0 }
      buckets[q.domain].sum += val
      buckets[q.domain].n += 1
      totalValidAnswers++
    } else {
      console.log(`Respuesta inválida para pregunta ${q.id}:`, respuestas[q.id])
    }
  }
  
  // Debug: mostrar buckets
  console.log('Buckets calculados:', buckets)
  console.log('Total respuestas válidas:', totalValidAnswers)
  
  // Si no hay respuestas válidas, retornar 0% para todos los dominios
  if (totalValidAnswers === 0) {
    console.warn('calcularBienestarPorDominio: no hay respuestas válidas')
    const out = {}
    for (const dom of Object.keys(DOMINIOS_LABEL)) {
      out[dom] = 0
    }
    return out
  }
  
  const out = {}
  for (const [dom, { sum, n }] of Object.entries(buckets)) {
    if (n > 0) {
      const max = 3 * n
      const pct = Math.round((1 - (sum / max)) * 100)
      out[dom] = Math.max(0, Math.min(100, pct))
      console.log(`Dominio ${dom}: sum=${sum}, n=${n}, max=${max}, pct=${pct}%`)
    } else {
      out[dom] = 0
      console.log(`Dominio ${dom}: sin respuestas, pct=0%`)
    }
  }
  
  // Garantiza los 4 dominios aunque falten respuestas
  for (const dom of Object.keys(DOMINIOS_LABEL)) {
    if (!(dom in out)) {
      out[dom] = 0
      console.log(`Dominio ${dom}: no encontrado en buckets, pct=0%`)
    }
  }
  
  console.log('Resultado final calcularBienestarPorDominio:', out)
  return out
}
