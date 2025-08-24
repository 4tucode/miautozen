<template>
  <div class="relative isolate min-h-screen bg-gradient-to-b from-[#ecf2ff] via-[#FFE5D6] to-[#ffe6f2]">
    <!-- Overlays de baño cálido y anti-banding -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <!-- Claro: blush/almendra (radiales grandes en esquinas) -->
      <div class="absolute -left-24 -top-24 w-[120vh] h-[120vh] opacity-60 dark:hidden" style="background: radial-gradient(60vh 60vh at top left, rgba(255,241,236,0.16), rgba(255,229,214,0.08) 45%, rgba(255,229,214,0) 70%);"></div>
      <div class="absolute -right-24 -bottom-24 w-[120vh] h-[120vh] opacity-60 dark:hidden" style="background: radial-gradient(60vh 60vh at bottom right, rgba(255,229,214,0.14), rgba(255,241,236,0.06) 45%, rgba(255,241,236,0) 70%);"></div>
      <!-- Oscuro: sepia (radiales grandes en esquinas) -->
      <div class="absolute -left-24 -top-24 hidden dark:block w-[120vh] h-[120vh] opacity-70" style="background: radial-gradient(60vh 60vh at top left, rgba(26,20,17,0.20), rgba(23,18,15,0.10) 45%, rgba(23,18,15,0) 70%);"></div>
      <div class="absolute -right-24 -bottom-24 hidden dark:block w-[120vh] h-[120vh] opacity-70" style="background: radial-gradient(60vh 60vh at bottom right, rgba(23,18,15,0.18), rgba(26,20,17,0.08) 45%, rgba(26,20,17,0) 70%);"></div>
      <!-- Anti-banding sutil -->
      <div class="absolute inset-0 dark:hidden" style="background: radial-gradient(120vh 120vh at 50% 40%, rgba(255,255,255,0.06), rgba(255,255,255,0) 60%);"></div>
      <div class="absolute inset-0 hidden dark:block" style="background: radial-gradient(120vh 120vh at 50% 40%, rgba(0,0,0,0.08), rgba(0,0,0,0) 60%);"></div>

      <!-- Ruido sutil para textura (muy bajo, evita banding sin distraer) -->
      <div
        class="pointer-events-none absolute inset-0 opacity-5 mix-blend-multiply"
        style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2264%22 height=%2264%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>'); background-size: 64px 64px;"
      ></div>
    </div>
    <section
      class="assessment mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 outline-none"
      @keyup.left.prevent="goPrev"
      @keyup.right.prevent="goNext"
      tabindex="0"
    >
    <!-- Encabezado -->
    <header class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold leading-tight">
          <span class="bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">Autoevaluación</span>
        </h1>
        <p class="mt-1 text-sm text-gray-600">Periodo de referencia: {{ scalePeriod }}</p>
      </div>
      <div class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-sm font-medium text-gray-700 shadow-sm">
        <span class="h-2 w-2 rounded-full bg-gradient-to-r from-purple-800 to-purple-400"></span>
        {{ currentIndex + 1 }} / {{ totalQuestions }}
      </div>
    </header>

    <!-- Stepper -->
    <nav class="mt-6 flex justify-center gap-2" aria-label="Progreso">
      <span
        v-for="(q, i) in questions"
        :key="q.id"
        class="h-2 w-2 rounded-full bg-gray-300 transition-transform duration-200 ease-out"
        :class="i <= currentIndex ? 'bg-gradient-to-r from-purple-800 to-purple-400 scale-110' : ''"
        :aria-label="`Pregunta ${i+1} de ${totalQuestions}`"
      ></span>
    </nav>

    <!-- Barra de progreso -->
    <div
      class="mt-6 h-2 w-full rounded-full bg-gray-200"
      role="progressbar"
      :aria-valuenow="progressPercent"
      :aria-valuemin="0"
      :aria-valuemax="100"
    >
      <div
        class="h-full rounded-full bg-gradient-to-r from-purple-800 to-purple-400 transition-[width] duration-300 ease-out"
        :style="{ width: progressPercent + '%' }"
      ></div>
    </div>

    <!-- Tarjeta de pregunta con transición -->
    <Transition name="fade-slide" mode="out-in">
      <main
        class="mt-6 rounded-xl border border-gray-200 bg-white/80 backdrop-blur p-5 sm:p-6 shadow-sm"
        :key="questions[currentIndex]?.id"
      >
        <h2 class="text-xl font-black text-gray-900 font-urbanist">
          {{ questions[currentIndex]?.text }}
        </h2>

        <!-- Microcopy de ayuda (debajo de la pregunta) -->
        <p class="mt-2 text-sm text-gray-600">
          Piensa en cómo te has sentido en las últimas 2 semanas. No hace falta ser exacto: elige la opción que mejor se acerque a tu caso.
        </p>
        <p v-if="questions[currentIndex]?.domain === 'funcionamiento'" class="mt-1 text-xs font-medium text-emerald-700">
          Nota sobre Funcionamiento: 0% de interferencia es positivo (verde) porque indica que no hay problemas en tu vida diaria.
        </p>

        <!-- Opciones -->
        <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 stagger" role="radiogroup">
          <label
            v-for="c in choices"
            :key="c.value"
            class="cursor-pointer"
          >
            <input
              class="peer sr-only"
              type="radio"
              :name="questions[currentIndex]?.id"
              :value="c.value"
              v-model.number="answers[currentIndex]"
            />
            <span
              class="block w-full rounded-lg border bg-white/70 px-4 py-3 text-center font-medium text-gray-800 shadow-sm transition-all duration-150 ease-out peer-focus:ring-2 peer-focus:ring-purple-500"
              :class="answers[currentIndex] === c.value
                ? 'border-transparent ring-2 ring-purple-500 bg-purple-50 text-purple-900 shadow'
                : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50/40'"
            >
              <span class="block text-base">{{ c.label }}</span>
              <span v-if="c.rangeHint" class="mt-1 block text-xs text-gray-500">(~{{ c.rangeHint }})</span>
            </span>
          </label>
        </div>

        <!-- Dominio de la pregunta -->
        <div class="mt-3 text-center">
          <span class="text-xs text-gray-500">Dominio: {{ DOMINIOS_LABEL[questions[currentIndex]?.domain] }}</span>
        </div>

        <!-- Botón opcional para omitir respuesta -->
        <div v-if="allowSkip" class="mt-2">
          <button
            type="button"
            class="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-800"
            @click="skipCurrent"
          >
            Prefiero no responder
          </button>
        </div>

        <!-- Aviso de apoyo -->
        <p v-if="showSupportHint" class="mt-4 text-sm text-gray-700">
          Si ahora mismo te sientes muy mal, recuerda que pedir ayuda está bien.
          <router-link to="/ayuda" class="font-semibold text-purple-700 hover:text-purple-800">Recursos de apoyo</router-link>
        </p>
      </main>
    </Transition>

    <!-- Acciones -->
    <footer class="mt-5 flex items-center justify-between gap-3">
      <button
        class="inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium text-gray-800 bg-white border-gray-200/60 shadow-sm transition-all duration-200 ease-out hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="currentIndex===0"
        @click="goPrev"
      >
        Atrás
      </button>
      <button
        class="inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium text-purple-700 bg-white border-purple-200/60 shadow-sm transition-all duration-200 ease-out hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
        @click="handleNextOrSubmit"
      >
        {{ isLast ? 'Guardar y ver resumen' : 'Siguiente' }}
      </button>
    </footer>
    </section>
  </div>
</template>

<script>
import { doc, getDoc, collection, addDoc } from 'firebase/firestore'

import { db, auth, serverTimestamp } from '@/firebase'
import { DOMINIOS_LABEL } from '@/utils/dominios'

export default {
  name: 'AssessmentView',
  data() {
    return {
      loading: true,
      formId: 'auto_2025_v2', 
      formName: 'Autoevaluación de Bienestar Emocional (ABE‑7)',
      totalQuestions: 0,
      questions: [],
      choices: [
        { value: 0, label: 'No, en ningún momento', rangeHint: '0 días' },
        { value: 1, label: 'Sí, en algunos días', rangeHint: '1–7 días' },
        { value: 2, label: 'Sí, en más de la mitad de los días', rangeHint: '8–11 días' },
        { value: 3, label: 'Sí, casi cada día', rangeHint: '12–14 días' }
      ],
      currentIndex: 0,
      answers: [],
      scalePeriod: 'últimas 2 semanas',
      allowSkip: false
    }
  },
  computed: {
    isLast() {
      return this.currentIndex === this.totalQuestions - 1
    },
    progressPercent() {
      if (!this.totalQuestions) return 0
      // porcentaje “preguntas completadas incluyendo la actual”
      return Math.round(((this.currentIndex + 1) / this.totalQuestions) * 100)
    },
    showSupportHint() {
      // pista si en ánimo bajo (q1) o funcionamiento (q7) hay 2–3
      const idxQ1 = this.questions.findIndex(q => q.domain === 'animo')
      const idxQ7 = this.questions.findIndex(q => q.domain === 'funcionamiento')
      const v1 = idxQ1 >= 0 ? this.answers[idxQ1] : 0
      const v7 = idxQ7 >= 0 ? this.answers[idxQ7] : 0
      return (v1 >= 2 || v7 >= 2)
    }
  },
  async created() {
    try {
      // Carga el documento de configuración:
      // - si quieres usar el existente: doc(db, 'formularios', 'uKOyWktkSesEW3sUaL3r')
      // - si creas la v2: doc(db, 'formularios', 'auto_2025_v2')
      const formDocRef = doc(db, 'formularios', 'auto_2025_v2')
      const snap = await getDoc(formDocRef)

      if (snap.exists()) {
        const cfg = snap.data()
        this.formId = cfg.formId || 'auto_2025_v2'
        this.formName = cfg.name || cfg.nombre || cfg.title || this.formName
        this.questions = (cfg.questions || []).slice(0, 7) // garantizamos 7
        this.totalQuestions = this.questions.length
        this.scalePeriod = cfg?.scale?.period || this.scalePeriod
        if (cfg?.choices?.length === 4) this.choices = cfg.choices
        this.allowSkip = !!cfg?.allowSkip
      } else {
        // Fallback local por si aún no has creado el doc
        this.questions = [
          { id: 'q1', domain: 'animo', text:'¿Te has sentido triste, decaído/a o sin esperanzas?' },
          { id: 'q2', domain: 'animo', text:'¿Has notado poco interés o disfrute por cosas que normalmente te gustan?' },
          { id: 'q3', domain: 'gestion_emocional', text:'¿Te ha costado parar o controlar la preocupación?' },
          { id: 'q4', domain: 'gestion_emocional', text:'¿Te has sentido nervioso/a, en tensión o "con los nervios de la punta"?' },
          { id: 'q5', domain: 'bienestar_fisico', text:'¿Has tenido problemas para dormir bien o para mantener el sueño?' },
          { id: 'q6', domain: 'bienestar_fisico', text:'¿Te has sentido sin energía o con cansancio fácil?' },
          { id: 'q7', domain: 'funcionamiento', text:'¿Qué tanto han afectado estos problemas a tu vida diaria?' }
        ]
        this.totalQuestions = 7
      }

      this.answers = Array(this.totalQuestions).fill(null)
    } catch (e) {
      // Error cargando formulario
      this.$toast?.error?.('No se pudo cargar el formulario')
      // Fallback mínimo
      this.questions = [
        { id: 'q1', domain: 'animo', text:'¿Te has sentido triste, decaído/a o sin esperanzas?' },
        { id: 'q2', domain: 'animo', text:'¿Has notado poco interés o disfrute por cosas que normalmente te gustan?' },
        { id: 'q3', domain: 'gestion_emocional', text:'¿Te ha costado parar o controlar la preocupación?' },
        { id: 'q4', domain: 'gestion_emocional', text:'¿Te has sentido nervioso/a, en tensión o "con los nervios de la punta"?' },
        { id: 'q5', domain: 'bienestar_fisico', text:'¿Has tenido problemas para dormir bien o para mantener el sueño?' },
        { id: 'q6', domain: 'bienestar_fisico', text:'¿Te has sentido sin energía o con cansancio fácil?' },
        { id: 'q7', domain: 'funcionamiento', text:'¿Qué tanto han afectado estos problemas a tu vida diaria?' }
      ]
      this.totalQuestions = 7
      this.answers = Array(7).fill(null)
    } finally {
      this.loading = false
      this.$nextTick(() => this.focusSection())
    }
  },
  methods: {
    focusSection() {
      // mejora accesibilidad: foco en el contenedor
      const el = this.$el?.querySelector('.assessment')
      el && el.focus && el.focus()
    },
    goPrev() {
      if (this.currentIndex > 0) this.currentIndex--
      this.$nextTick(() => this.focusSection())
    },
    goNext() {
      if (this.answers[this.currentIndex] === null && !this.allowSkip) {
        this.$toast?.info?.('Selecciona una opción para continuar')
        return
      }
      if (!this.isLast) {
        this.currentIndex++
        this.$nextTick(() => this.focusSection())
      }
    },
    skipCurrent() {
      this.$set ? this.$set(this.answers, this.currentIndex, null) : (this.answers[this.currentIndex] = null)
      this.goNext()
    },
    handleNextOrSubmit() {
      if (!this.isLast) return this.goNext()
      if (this.answers.includes(null) && !this.allowSkip) {
        this.$toast?.info?.('Responde todas las preguntas')
        return false
      }
      return this.submit()
    },
    calcDomainScores() {
      // Suma por dominios: ánimo(1+2), gestión emocional(3+4), bienestar físico(5+6), funcionamiento(7)
      // Si una respuesta es null (omitida), se excluye del cálculo
      const map = {}
      this.questions.forEach((q, i) => {
        const raw = this.answers[i]
        if (raw === null || raw === undefined) return
        const v = Number(raw)
        if (Number.isNaN(v)) return
        map[q.domain] = (map[q.domain] || 0) + v
      })
      const domainScores = {
        animo: map['animo'] || 0,
        gestion_emocional: map['gestion_emocional'] || 0,
        bienestar_fisico: map['bienestar_fisico'] || 0,
        funcionamiento: map['funcionamiento'] || 0
      }
      const total = Object.values(domainScores).reduce((a, b) => a + b, 0)
      return { domainScores, total }
    },
    async submit() {
      try {
        const user = auth.currentUser
        if (!user) {
          this.$router.push({ name: 'login', query: { next: this.$route.fullPath } })
          return
        }
        const { domainScores, total } = this.calcDomainScores()
        const slug = this.$route.params.slug || this.formId
        await addDoc(collection(db, 'resultados'), {
          usuarioId: user.uid,
          autoevaluacionSlug: slug,
          nombre: this.formName,
          respuestas: this.questions.map((q, i) => ({ id: q.id, dominio: q.domain, valor: this.answers[i] === null ? null : Number(this.answers[i]) })),
          puntuacion: total,
          creadoEn: serverTimestamp(),
          // campos adicionales por compatibilidad
          domainScores,
          formId: this.formId,
          answers: this.questions.map((q, i) => ({ id: q.id, domain: q.domain, value: this.answers[i] === null ? null : Number(this.answers[i]) })),
          total
        })
        // Navega a resumen
        this.$router.push({ name: 'assessment-summary', query: { form: this.formId } })
      } catch (e) {
        // Error guardando resultado
        this.$toast?.error?.('No se pudo guardar el resultado, inténtalo de nuevo')
        // Aun así permite ver el resumen local
        this.$router.push({ name: 'assessment-summary', query: { form: this.formId, local: '1' } })
      }
    }
  }
}
</script>

<style scoped>
/* Transición de tarjeta */
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all 220ms ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(6px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-6px); }

/* Stagger simple para opciones: usa nth-child para introducir pequeños delays */
.stagger > label:nth-child(1) { animation: optionIn 200ms ease-out both; animation-delay: 40ms; }
.stagger > label:nth-child(2) { animation: optionIn 200ms ease-out both; animation-delay: 80ms; }
.stagger > label:nth-child(3) { animation: optionIn 200ms ease-out both; animation-delay: 120ms; }
.stagger > label:nth-child(4) { animation: optionIn 200ms ease-out both; animation-delay: 160ms; }

@keyframes optionIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
