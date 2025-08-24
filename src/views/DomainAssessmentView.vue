<template>
  <section class="w-full py-8 bg-gradient-to-b from-[#ecf2ff] via-[#FFE5D6] to-[#ffe6f2]" tabindex="0">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
    <!-- Encabezado -->
    <header class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold leading-tight">
          <span class="bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">{{ formName }}</span>
        </h1>
        <p class="mt-1 text-sm text-gray-600">Profundización de 15 preguntas • Dominio: <span class="font-medium text-gray-900">{{ domainLabel }}</span></p>
      </div>
      <div class="flex items-center gap-2">
        <router-link :to="backToSummaryLink"
          class="inline-flex items-center rounded-full bg-gradient-to-r from-red-300 to-red-200 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-95">
          Volver al resumen
        </router-link>
        <div class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-sm font-medium text-gray-700 shadow-sm">
          <span class="h-2 w-2 rounded-full bg-gradient-to-r from-purple-800 to-purple-400"></span>
          {{ currentIndex + 1 }} / {{ totalQuestions }}
        </div>
      </div>
    </header>

    <div v-if="blockedReason" class="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
      {{ blockedReason }}
      <div class="mt-2 flex items-center gap-2">
        <router-link :to="backToSummaryLink" class="inline-flex items-center rounded-md bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50">Volver al resumen</router-link>
      </div>
    </div>

    <div v-else>
      <!-- Barra de progreso -->
      <div class="mt-6 h-2 w-full rounded-full bg-gray-200" role="progressbar" :aria-valuenow="progressPercent" :aria-valuemin="0" :aria-valuemax="100">
        <div class="h-full rounded-full bg-gradient-to-r from-purple-800 to-purple-400 transition-[width] duration-300 ease-out" :style="{ width: progressPercent + '%' }"></div>
      </div>

      <!-- Tarjeta de pregunta -->
      <Transition name="fade-slide" mode="out-in">
        <main class="mt-6 rounded-xl border border-gray-200 bg-white/80 backdrop-blur p-5 sm:p-6 shadow-sm" :key="questions[currentIndex]?.id">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ questions[currentIndex]?.text }}
          </h2>

          <!-- Opciones -->
          <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 stagger" role="radiogroup">
            <label v-for="c in choices" :key="c.value" class="cursor-pointer">
              <input class="peer sr-only" type="radio" :name="questions[currentIndex]?.id" :value="c.value" v-model.number="answers[currentIndex]" />
              <span class="block w-full rounded-lg border bg-white/70 px-4 py-3 text-center font-medium text-gray-800 shadow-sm transition-all duration-150 ease-out peer-focus:ring-2 peer-focus:ring-purple-500"
                :class="answers[currentIndex] === c.value ? 'border-transparent ring-2 ring-purple-500 bg-purple-50 text-purple-900 shadow' : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50/40'">
                <span class="block text-base">{{ c.label }}</span>
                <span v-if="c.rangeHint" class="mt-1 block text-xs text-gray-500">(~{{ c.rangeHint }})</span>
              </span>
            </label>
          </div>

          <p v-if="showSupportHint" class="mt-4 text-sm text-gray-700">
            Si este dominio te preocupa, recuerda que pedir ayuda está bien.
            <router-link to="/ayuda" class="font-semibold text-purple-700 hover:text-purple-800">Recursos de apoyo</router-link>
          </p>
        </main>
      </Transition>

      <!-- Acciones -->
      <footer class="mt-5 flex items-center justify-between gap-3">
        <button class="inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium text-gray-800 bg-white border-gray-200/60 shadow-sm transition-all duration-200 ease-out hover:shadow disabled:cursor-not-allowed disabled:opacity-50" :disabled="currentIndex===0" @click="goPrev">
          Atrás
        </button>
        <button class="inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium text-purple-700 bg-white border-purple-200/60 shadow-sm transition-all duration-200 ease-out hover:shadow disabled:cursor-not-allowed disabled:opacity-60" @click="handleNextOrSubmit">
          {{ isLast ? 'Guardar y ver diagnóstico' : 'Siguiente' }}
        </button>
      </footer>

      <div class="mt-4">
        <router-link :to="backToSummaryLink" class="inline-flex items-center justify-center rounded-md bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm hover:bg-gray-50">
          Volver al resumen general
        </router-link>
      </div>

      <div class="mt-6 text-[11px] text-gray-500">
        Referencias: herramientas y bancos de ítems orientativos inspirados en
        <a href="https://www.apa.org/depression-guideline/patients-and-families/symptoms" target="_blank" rel="noopener" class="underline">APA – síntomas de depresión</a>,
        <a href="https://www.nice.org.uk/guidance/qs53" target="_blank" rel="noopener" class="underline">NICE – Ansiedad</a>,
        <a href="https://www.sleepfoundation.org/insomnia" target="_blank" rel="noopener" class="underline">Sleep Foundation – Insomnio</a>.
      </div>
    </div>
    </div>
  </section>
  
</template>

<script>
import { addDoc, collection } from 'firebase/firestore'

import { auth, db, serverTimestamp } from '@/firebase'
import { listarResultadosPorUsuario, obtenerResultadoPorId, actualizarResultadoPorId } from '@/services/db'

export default {
  name: 'DomainAssessmentView',
  data() {
    return {
      loading: true,
      domainKey: this.$route.params.domain || 'animo',
      domainLabel: 'Ánimo',
      formId: '',
      formName: '',
      totalQuestions: 15,
      questions: [],
      choices: [
        { value: 0, label: 'No, en ningún momento', rangeHint: '0 días' },
        { value: 1, label: 'Sí, en algunos días', rangeHint: '1–7 días' },
        { value: 2, label: 'Sí, en más de la mitad de los días', rangeHint: '8–11 días' },
        { value: 3, label: 'Sí, casi cada día', rangeHint: '12–14 días' }
      ],
      currentIndex: 0,
      answers: Array(15).fill(null),
      blockedReason: ''
    }
  },
  computed: {
    isLast() { return this.currentIndex === this.totalQuestions - 1 },
    progressPercent() { return Math.round(((this.currentIndex + 1) / this.totalQuestions) * 100) },
    showSupportHint() { return (this.answers[this.currentIndex] || 0) >= 2 },
    backToSummaryLink() {
      const fromResultId = this.$route.query.fromResultId
      return fromResultId ? { name: 'assessment-summary', query: { resultId: fromResultId } } : { name: 'assessment-summary' }
    }
  },
  async created() {
    const key = String(this.$route.params.domain || 'animo')
    this.domainKey = key
    const labelMap = { animo: 'Ánimo', ansiedad: 'Ansiedad', bienestar_fisico: 'Bienestar físico', impacto: 'Impacto' }
    this.domainLabel = labelMap[key] || 'Dominio'
    this.formId = `domain_${key}_v1`
    this.formName = `Profundización en ${this.domainLabel}`
    this.questions = this.buildQuestionsForDomain(key)
    this.totalQuestions = this.questions.length

    // Comprobar restricciones: 1) sólo si dominio en rojo desde fromResultId, 2) no repetir para ESTE resultado base
    try {
      const uid = this.$store.state.usuario?.uid
      if (!uid) {
        this.$router.push({ name: 'login', query: { next: this.$route.fullPath } })
        return
      }
      // 2) Evitar repetir SOLO si ya existe para este resultado base (fromResultId)
      const fromResultId = this.$route.query.fromResultId
      if (fromResultId) {
        try {
          const base = await obtenerResultadoPorId(fromResultId)
          const ov = base?.overrides?.[this.domainKey]
          if (ov?.resultId) {
            const query = { resultId: ov.resultId, fromResultId }
            this.blockedReason = 'Ya completaste este dominio para este resultado. Te mostramos tu diagnóstico.'
            this.$router.replace({ name: 'domain-summary', params: { domain: this.domainKey }, query })
            return
          }
          // Buscar deep vinculado a este base por parentResultId
          const todos = await listarResultadosPorUsuario(uid)
          const deep = (todos || []).find(r => String(r.formId || '').startsWith('domain_') && r.domain === this.domainKey && r.parentResultId === fromResultId)
          if (deep) {
            const query = { resultId: deep.id, fromResultId }
            this.blockedReason = 'Ya completaste este dominio para este resultado. Te mostramos tu diagnóstico.'
            this.$router.replace({ name: 'domain-summary', params: { domain: this.domainKey }, query })
            return
          }
        } catch (e) { /* ignore */ }
      }
      // 1) Permitir profundización si vienes desde un resultado; no bloquear por umbral
      // (seguimos evitando duplicados por override o parentResultId más arriba)
    } catch (e) {
      // ignora y permite continuar si no se puede validar
    } finally {
      this.loading = false
    }
  },
  methods: {
    buildQuestionsForDomain(key) {
      // Fallback local de 15 preguntas por dominio con variación real por dominio
      if (key === 'animo') {
        const qs = [
          'Durante los últimos 14 días, ¿te has sentido sin motivación para iniciar actividades?',
          '¿Has tenido dificultad para disfrutar de cosas que antes te gustaban?',
          '¿Te ha costado levantarte o empezar el día?',
          '¿Has notado pensamientos negativos recurrentes?',
          '¿Te ha faltado esperanza sobre el futuro?',
          '¿Te has sentido aislado/a o desconectado/a de los demás?',
          '¿Has sentido culpa o autocrítica excesiva?',
          '¿Tu apetito o peso han cambiado notablemente?',
          '¿Te ha faltado energía para tareas cotidianas?',
          '¿Te ha costado concentrarte?',
          '¿Has evitado actividades por tu estado de ánimo?',
          '¿Te has sentido irritable?',
          '¿Has notado cambios en tu ritmo de sueño por el estado de ánimo?',
          '¿Sientes que tu estado de ánimo afecta tus relaciones?',
          '¿Has considerado pedir ayuda por cómo te sientes?'
        ]
        return qs.map((text, i) => ({ id: `${key}_${i+1}`, domain: key, text }))
      }
      if (key === 'ansiedad') {
        const qs = [
          'Durante los últimos 14 días, ¿te ha costado controlar la preocupación?',
          '¿Has sentido nerviosismo persistente?',
          '¿Has tenido tensión muscular o inquietud?',
          '¿Has experimentado sobresaltos o hipervigilancia?',
          '¿La preocupación te quita el sueño?',
          '¿Has evitado situaciones por miedo o ansiedad?',
          '¿Has tenido dificultad para concentrarte por la ansiedad?',
          '¿Has sentido sensación de falta de aire o palpitaciones?',
          '¿Has sentido miedo a perder el control?',
          '¿Te cuesta relajarte?',
          '¿Tu irritabilidad ha aumentado?',
          '¿Tu apetito ha cambiado por ansiedad?',
          '¿La ansiedad interfiere en tus relaciones?',
          '¿Te preocupa tu salud con frecuencia (ansiedad somática)?',
          '¿Has considerado pedir ayuda por la ansiedad?'
        ]
        return qs.map((text, i) => ({ id: `${key}_${i+1}`, domain: key, text }))
      }
      if (key === 'bienestar_fisico') {
        const qs = [
          'En los últimos 14 días, ¿te ha costado conciliar el sueño?',
          '¿Te despiertas durante la noche con frecuencia?',
          '¿Te levantas sin sensación de descanso?',
          '¿Te sientes cansado/a durante el día?',
          '¿Has reducido tu actividad física?',
          '¿Tu alimentación ha sido irregular?',
          '¿Has notado fatiga al realizar tareas simples?',
          '¿Tomas siestas por falta de energía?',
          '¿Consumes cafeína para compensar el cansancio?',
          '¿Has tenido dolores o molestias corporales frecuentes?',
          '¿Has sentido falta de energía para socializar?',
          '¿Notas variaciones de energía a lo largo del día?',
          '¿El uso de pantallas afecta tu descanso?',
          '¿Haces pausas activas cuando estudias/trabajas?',
          '¿Has considerado apoyo para mejorar sueño/energía?'
        ]
        return qs.map((text, i) => ({ id: `${key}_${i+1}`, domain: key, text }))
      }
      // impacto
      const qs = [
        'En los últimos 14 días, ¿estas dificultades han afectado tu rendimiento en estudios/trabajo?',
        '¿Te cuesta cumplir responsabilidades en casa?',
        '¿Has tenido conflictos por estas dificultades?',
        '¿Has dejado de hacer actividades importantes?',
        '¿Te cuesta organizar tu tiempo?',
        '¿Sientes que postergas por estas dificultades?',
        '¿Has faltado a compromisos por cómo te sientes?',
        '¿Te ha costado concentrarte en tareas clave?',
        '¿Has perdido oportunidades por estas dificultades?',
        '¿Tu productividad ha bajado?',
        '¿Has tenido problemas económicos derivados?',
        '¿Afecta tus relaciones familiares?',
        '¿Afecta tus amistades?',
        '¿Te sientes sobrepasado/a frecuentemente?',
        '¿Has considerado pedir apoyo por el impacto?'
      ]
      return qs.map((text, i) => ({ id: `${key}_${i+1}`, domain: key, text }))
    },
    goPrev() {
      if (this.currentIndex > 0) this.currentIndex--
    },
    goNext() {
      if (this.answers[this.currentIndex] === null) {
        this.$toast?.info?.('Selecciona una opción para continuar')
        return
      }
      if (!this.isLast) this.currentIndex++
    },
    handleNextOrSubmit() {
      if (!this.isLast) { this.goNext(); return }
      if (this.answers.includes(null)) {
        this.$toast?.info?.('Responde todas las preguntas')
        return
      }
      this.submit()
    },
    async submit() {
      try {
        const user = auth.currentUser
        if (!user) {
          this.$router.push({ name: 'login', query: { next: this.$route.fullPath } })
          return
        }
        const total = this.answers.reduce((a, v) => a + Number(v || 0), 0)
        const fromResultId = this.$route.query.fromResultId
        // baseline desde resultado padre
        let baselineWellbeing = null
        if (fromResultId) {
          try {
            const base = await obtenerResultadoPorId(fromResultId)
            const ds = base?.domainScores || {}
                    const maxByKey = { animo: 6, gestion_emocional: 6, bienestar_fisico: 6, funcionamiento: 3 }
        const calc = (k) => {
          if (k === 'animo') return Number(ds?.animo || 0)
          if (k === 'gestion_emocional') return Number(ds?.gestion_emocional || 0)
          if (k === 'bienestar_fisico') return Number(ds?.bienestar_fisico || 0)
          if (k === 'funcionamiento') return Number(ds?.funcionamiento || 0)
          return 0
        }
            const raw = Math.max(0, Math.min(maxByKey[this.domainKey] || 6, Number(calc(this.domainKey) || 0)))
            const sev = Math.round((raw / (maxByKey[this.domainKey] || 6)) * 100)
            const isPositive = new Set(['animo', 'gestion_emocional', 'bienestar_fisico', 'funcionamiento']).has(this.domainKey)
            const display = isPositive ? (100 - sev) : sev
            baselineWellbeing = isPositive ? display : (100 - display)
          } catch (e) { /* ignore */ }
        }
        // calcular wellbeing del dominio profundo
        const maxDeep = 45
        const severityPercent = Math.round((Math.max(0, Math.min(maxDeep, total)) / maxDeep) * 100)
        const isPositive = new Set(['animo', 'gestion_emocional', 'bienestar_fisico', 'funcionamiento']).has(this.domainKey)
        const displayPercent = isPositive ? (100 - severityPercent) : severityPercent
        const wellbeingPercent = isPositive ? displayPercent : (100 - displayPercent)
        let relative = null
        if (typeof baselineWellbeing === 'number') {
          const delta = Number((wellbeingPercent - baselineWellbeing).toFixed(0))
          const labelMap = { animo: 'Ánimo positivo', gestion_emocional: 'Gestión emocional', bienestar_fisico: 'Bienestar físico', funcionamiento: 'Funcionamiento diario' }
          const domainLabel = labelMap[this.domainKey] || 'Dominio'
          const better = delta > 0
          const same = delta === 0
          let message = ''
          if (same) message = `Tu nivel en ${domainLabel} se mantiene estable (Δ ${delta}%). Mantén tus hábitos y sigue atento/a a cambios.`
          else if (better) message = `Mejoraste en ${domainLabel} (Δ +${delta}%). Puede deberse a mejores hábitos de sueño/energía, manejo de estrés o apoyo social. Revisa las recomendaciones para consolidarlo.`
          else message = `Hay más señales en ${domainLabel} (Δ ${delta}%). Esto puede estar influido por estrés reciente, descanso irregular o carga de tareas. Aplica los consejos y considera apoyo si persiste.`
          relative = { kind: same ? 'same' : (better ? 'improved' : 'worse'), delta, baseline: baselineWellbeing, message }
        }
        const docRef = await addDoc(collection(db, 'resultados'), {
          usuarioId: user.uid,
          autoevaluacionSlug: this.formId,
          nombre: this.formName,
          respuestas: this.questions.map((q, i) => ({ id: q.id, dominio: q.domain, valor: Number(this.answers[i]) })),
          puntuacion: total,
          creadoEn: serverTimestamp(),
          formId: this.formId,
          answers: this.questions.map((q, i) => ({ id: q.id, domain: q.domain, value: Number(this.answers[i]) })),
          total,
          domain: this.domainKey,
          parentResultId: fromResultId || null,
          wellbeingPercent,
          ...(relative ? { relative } : {})
        })
        // Calcular wellbeingPercent para override en el resultado padre si existe
        if (fromResultId) {
          await actualizarResultadoPorId(fromResultId, { overrides: { [this.domainKey]: { resultId: docRef.id, wellbeingPercent, total } } })
        }
        const query = { resultId: docRef.id }
        if (fromResultId) query.fromResultId = fromResultId
        this.$router.push({ name: 'domain-summary', params: { domain: this.domainKey }, query })
      } catch (e) {
        this.$toast?.error?.('No se pudo guardar el resultado')
      }
    }
  }
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all 220ms ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(6px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-6px); }

.stagger > label:nth-child(1) { animation: optionIn 200ms ease-out both; animation-delay: 40ms; }
.stagger > label:nth-child(2) { animation: optionIn 200ms ease-out both; animation-delay: 80ms; }
.stagger > label:nth-child(3) { animation: optionIn 200ms ease-out both; animation-delay: 120ms; }
.stagger > label:nth-child(4) { animation: optionIn 200ms ease-out both; animation-delay: 160ms; }

@keyframes optionIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>


