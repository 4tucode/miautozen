<script>
import { listarResultadosPorUsuario, obtenerResultadoPorId } from '@/services/db'

export default {
  name: 'SummaryView',
  data() {
    return {
      cargando: true,
      resultado: null,
      error: '',
      current: 0,
      pages: [
        { kind: 'intro' },
        { kind: 'total' },
        { kind: 'domains' },
        { kind: 'impact' },
        { kind: 'note' }
      ]
    }
  },
  computed: {
    catBreakdown() {
      const out = []
      const labelByKey = {
        animo: 'Ánimo',
        ansiedad: 'Ansiedad',
        bienestar_fisico: 'Bienestar físico',
        impacto: 'Impacto'
      }
      const maxByKey = { animo: 6, ansiedad: 6, bienestar_fisico: 6, impacto: 3 }
      const r = this.resultado || {}
      let ds = r.domainScores
      if (!ds) {
        // calcular desde answers/respuestas para el formulario actual
        const answers = Array.isArray(r.answers)
          ? r.answers
          : Array.isArray(r.respuestas)
            ? r.respuestas.map(x => ({ domain: x.dominio, value: x.valor }))
            : []
        const tmp = {}
        answers.forEach(a => {
          const k = a.domain
          const v = Number(a.value || 0)
          if (!k) return
          tmp[k] = (tmp[k] || 0) + v
        })
        ds = tmp
      }
      const values = {
        animo: Number(ds?.animo || 0) + Number(ds?.anhedonia || 0),
        ansiedad: Number(ds?.ansiedad || 0) + Number(ds?.ansiedad_control || 0) + Number(ds?.ansiedad_tension || 0),
        bienestar_fisico: Number(ds?.bienestar_fisico || 0) + Number(ds?.sueno || 0) + Number(ds?.energia || 0),
        impacto: Number(ds?.impacto || 0)
      }
      const positiveOrientation = new Set(['animo', 'bienestar_fisico']) // 100% es bueno
      ;['animo', 'ansiedad', 'bienestar_fisico', 'impacto'].forEach(key => {
        const max = maxByKey[key]
        const raw = Math.max(0, Math.min(max, Number(values[key] || 0)))
        const severityPercent = Math.round((raw / max) * 100) // 100% = más síntomas/impacto
        const isPositive = positiveOrientation.has(key)
        const displayPercent = isPositive ? (100 - severityPercent) : severityPercent
        const wellbeingPercent = isPositive ? displayPercent : (100 - displayPercent)
        out.push({
          key,
          label: labelByKey[key],
          value: raw,
          max,
          percent: displayPercent, // lo que mostramos al usuario
          wellbeingPercent,        // para colores/emoji (alto = verde)
          orientation: isPositive ? 'positive' : 'negative'
        })
      })
      return out
    },
    globalWellbeingPercent() {
      const items = this.catBreakdown
      if (!items.length) return 0
      const sum = items.reduce((acc, c) => acc + Number(c.wellbeingPercent || 0), 0)
      return Math.round(sum / items.length)
    }
  },
  methods: {
    badgeClass(wellbeingPercent) {
      const p = Number(wellbeingPercent || 0)
      if (p >= 67) {
        return 'text-emerald-700 bg-emerald-50 border border-emerald-200'
      }
      if (p >= 34) {
        return 'text-purple-700 bg-purple-50 border border-purple-200'
      }
      return 'text-rose-700 bg-rose-50 border border-rose-200'
    },
    emojiForPercent(wellbeingPercent) {
      const p = Number(wellbeingPercent || 0)
      if (p >= 67) return '😊'
      if (p >= 34) return '😐'
      return '☹️'
    },
    explanationFor(c) {
      const p = Number(c?.percent || 0) // porcentaje mostrado
      const domainDescByKey = {
        animo: 'estado de ánimo bajo y pérdida de interés',
        ansiedad: 'preocupación, tensión o nerviosismo',
        bienestar_fisico: 'sueño y energía (descanso, cansancio, fatiga)',
        impacto: 'interferencia en tus actividades diarias'
      }
      const domainDesc = domainDescByKey[c?.key] || 'este dominio'
      // Mensajes adaptados por orientación
      if (c.orientation === 'positive') {
        let nivel = 'bajo', detalle = 'podría mejorar', sugerencia = 'pequeños hábitos pueden ayudar'
        if (p > 66) { nivel = 'alto'; detalle = 'muy buen estado'; sugerencia = 'sigue cuidando tus rutinas' }
        else if (p > 33) { nivel = 'moderado'; detalle = 'estado aceptable'; sugerencia = 'consolida tus hábitos saludables' }
        return `Tienes un ${p}% en ${c.label} (${nivel}): ${detalle}; ${sugerencia}.`
      } else {
        let nivel = 'bajo', detalle = 'señales leves', sugerencia = 'estás cerca de tu bienestar'
        if (p > 66) { nivel = 'alto'; detalle = 'señales elevadas'; sugerencia = 'considera buscar apoyo si persiste' }
        else if (p > 33) { nivel = 'moderado'; detalle = 'señales moderadas'; sugerencia = 'cuidar hábitos y rutinas puede ayudar' }
        return `Tienes un ${p}% en ${c.label} (${nivel}): ${detalle} de ${domainDesc}; ${sugerencia}.`
      }
    }
  },
  async created() {
    try {
      const uid = this.$store.state.usuario?.uid
      if (!uid) {
        this.$router.push({ name: 'login', query: { next: this.$route.fullPath } })
        return
      }
      const resultId = this.$route.query.resultId
      if (resultId) {
        // Cargar ese resultado concreto
        const fetched = await obtenerResultadoPorId(resultId)
        // seguridad básica: asegurar que pertenece al usuario actual
        this.resultado = fetched?.usuarioId === uid ? fetched : null
      } else {
        const todos = await listarResultadosPorUsuario(uid)
        const formFilter = this.$route.query.form
        const elegido = formFilter
          ? todos.find(r => r.formId === formFilter) || todos[0]
          : todos[0]
        this.resultado = elegido || null
      }
      if (!this.resultado) this.error = 'No se encontró el resultado recién guardado.'
    } catch (e) {
      this.error = 'No se pudo cargar el resumen.'
      // eslint-disable-next-line no-console
      console.error(e)
    } finally {
      this.cargando = false
    }
  }
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
    <div class="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 sm:p-8 shadow-sm">
      <div class="grid md:grid-cols-2 gap-10 items-start">
      <!-- Izquierda: resumen -->
      <div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          <span class="bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">Resumen</span>
        </h1>

        <p v-if="cargando" class="mt-6 h-32 w-full animate-pulse rounded-xl bg-gray-200/70"></p>
        <p v-else-if="error" class="mt-6 text-sm font-medium text-red-600">{{ error }}</p>

        <div v-else-if="resultado" class="mt-6 space-y-4">
          <div class="rounded-xl  border-gray-200 bg-white/80 backdrop-blur p-5">
            <dl class="grid grid-cols-1 gap-4 text-sm text-gray-700">
              <div class="flex items-center justify-between">
                <dt class="font-medium text-gray-900">Evaluación</dt>
                <dd class="ml-4 truncate">{{ resultado.nombre || resultado.formId }}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="font-medium text-gray-900">Bienestar global</dt>
                <dd class="ml-4">
                  <span
                    class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
                    :class="badgeClass(globalWellbeingPercent)"
                    :aria-label="`Bienestar global ${globalWellbeingPercent}%`"
                  >{{ emojiForPercent(globalWellbeingPercent) }} {{ globalWellbeingPercent }}%</span>
                </dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="font-medium text-gray-900">Puntuación total</dt>
                <dd class="ml-4 rounded-full bg-purple-50 px-2 py-0.5 text-purple-700 font-semibold">{{ resultado.puntuacion }} pts</dd>
              </div>
              <div class="flex items-center justify-between" v-if="resultado.creadoEn?.toDate">
                <dt class="font-medium text-gray-900">Fecha</dt>
                <dd class="ml-4">{{ new Date(resultado.creadoEn.toDate()).toLocaleString('es-ES') }}</dd>
              </div>
              <div class="mt-2 border-t border-gray-200 pt-3">
                <h3 class="text-sm font-semibold text-gray-900">Porcentaje por categorías (este formulario)</h3>
                <ul class="mt-2 grid grid-cols-1 gap-2">
                  <li v-for="c in catBreakdown" :key="c.key" class="rounded-md bg-white/60 px-3 py-2">
                    <div class="flex items-center justify-between">
                      <span class="text-gray-700">{{ c.label }}</span>
                      <span
                        class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
                        :class="badgeClass(c.wellbeingPercent)"
                        :aria-label="`Bienestar ${c.wellbeingPercent}%`"
                      >{{ emojiForPercent(c.wellbeingPercent) }} {{ c.percent }}%</span>
                    </div>
                    <p class="mt-1 text-[11px] leading-snug text-gray-600">
                      {{ explanationFor(c) }}
                    </p>
                  </li>
                </ul>
              </div>
            </dl>
          </div>

          <div class="pt-2">
            <router-link
              :to="{ name: 'results' }"
              class="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-800 to-purple-400 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:opacity-95 hover:-translate-y-0.5 hover:shadow-md"
            >
              Ver todos mis resultados
            </router-link>
          </div>
        </div>

        <div v-else class="mt-6 text-sm text-gray-700">
          <p>No hay datos para mostrar.</p>
          <router-link :to="{ name: 'results' }" class="font-semibold text-purple-700 hover:text-purple-800">Ir a Mis resultados</router-link>
        </div>
      </div>
      
      <!-- Derecha: explicación de puntuaciones con paginación (mismo contenedor) -->
      <div class="mt-8 md:mt-0">
        <h2 class="text-lg font-semibold text-gray-900">Cómo interpretar tus resultados</h2>
        <div class="mt-3 min-h-[9.5rem]">
          <Transition name="fade-right" mode="out-in">
            <div :key="pages[current].kind">
              <!-- Intro -->
              <div v-if="pages[current].kind==='intro'" class="space-y-2 text-sm text-gray-700">
                <p>
                  Esta autoevaluación resume tu bienestar emocional con 7 preguntas. Cada una puntúa de 0 a 3 y el total va de 0 a 21.
                </p>
                <p>
                  Úsalo como una guía para conocerte mejor. Si algo te preocupa, busca apoyo: pedir ayuda es una fortaleza.
                </p>
              </div>

              <!-- Total score ranges -->
              <div v-else-if="pages[current].kind==='total'" class="space-y-3">
                <p class="text-sm text-gray-700">Tu puntuación total se interpreta así:</p>
                <ul class="space-y-2">
                  <li class="flex items-center gap-2 text-sm">
                    <span class="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    <span class="font-semibold text-gray-900">0–4</span>
                    <span class="text-gray-700">Muy baja: señales leves o ausentes.</span>
                  </li>
                  <li class="flex items-center gap-2 text-sm">
                    <span class="inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span class="font-semibold text-gray-900">5–9</span>
                    <span class="text-gray-700">Leve: observa hábitos y rutinas, puede ayudar mucho.</span>
                  </li>
                  <li class="flex items-center gap-2 text-sm">
                    <span class="inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                    <span class="font-semibold text-gray-900">10–14</span>
                    <span class="text-gray-700">Moderada: considera apoyo y pequeñas acciones sostenidas.</span>
                  </li>
                  <li class="flex items-center gap-2 text-sm">
                    <span class="inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
                    <span class="font-semibold text-gray-900">15–21</span>
                    <span class="text-gray-700">Alta: busca ayuda profesional y apóyate en tu red cercana.</span>
                  </li>
                </ul>
              </div>

              <!-- Domains list -->
              <div v-else-if="pages[current].kind==='domains'" class="space-y-2">
                <p class="text-sm text-gray-700">Qué mide cada dominio:</p>
                <ul class="space-y-2">
                  <li class="flex items-start gap-3">
                    <!-- icon -->
                    <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7v1.25a4.75 4.75 0 0 0-1 2.95V15a4 4 0 0 0 4 4h1v-2H8a2 2 0 0 1-2-2v-1.8c0-.9.37-1.76 1.02-2.38.2-.2.31-.47.31-.75V9a5 5 0 1 1 10 0v.32c0 .28.11.55.31.75.65.62 1.02 1.48 1.02 2.38V15a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4v-1.8c0-1.06-.36-2.08-1-2.9V9a7 7 0 0 0-7-7Z"/></svg>
                    </span>
                    <div class="text-sm">
                      <p class="font-semibold text-gray-900">Ánimo</p>
                      <p class="text-gray-700">Estado de ánimo bajo y pérdida de interés o disfrute.</p>
                    </div>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10.012 10.012 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z"/></svg>
                    </span>
                    <div class="text-sm">
                      <p class="font-semibold text-gray-900">Ansiedad</p>
                      <p class="text-gray-700">Preocupación constante, tensión o nerviosismo.</p>
                    </div>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12v2H6zM4 6h16v2H4zm3 4h10v2H7zm-3 4h16v2H4zm4 4h8v2H8z"/></svg>
                    </span>
                    <div class="text-sm">
                      <p class="font-semibold text-gray-900">Bienestar físico</p>
                      <p class="text-gray-700">Sueño y energía: descanso, cansancio o fatiga.</p>
                    </div>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22a1 1 0 0 1-1-1v-7H7a1 1 0 0 1-.8-1.6l6-8a1 1 0 0 1 1.8.6V11h4a1 1 0 0 1 .8 1.6l-6 8a1 1 0 0 1-.8.4Z"/></svg>
                    </span>
                    <div class="text-sm">
                      <p class="font-semibold text-gray-900">Impacto</p>
                      <p class="text-gray-700">Cómo afecta a estudios/trabajo, familia y tareas diarias.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Impact detail -->
              <div v-else-if="pages[current].kind==='impact'" class="space-y-2 text-sm text-gray-700">
                <p>
                  Si el <span class="font-semibold text-gray-900">impacto</span> es 2 o 3, significa que estas dificultades interfieren de forma notable en tu vida diaria.
                </p>
                <p>
                  Dar pasos pequeños (rutinas, descanso, actividad) y buscar apoyo puede marcar la diferencia. Si puedes, consulta con un profesional.
                </p>
              </div>

              <!-- Note -->
              <div v-else-if="pages[current].kind==='note'" class="space-y-2 text-sm text-gray-700">
                <p>
                  Este resultado es orientativo, no un diagnóstico. Si la puntuación total es alta o el impacto elevado, busca ayuda.
                </p>
                <p>
                  Explora la sección
                  <router-link to="/ayuda" class="font-semibold text-purple-700 hover:text-purple-800">Recursos de apoyo</router-link>
                  para dar el siguiente paso.
                </p>
              </div>
            </div>
          </Transition>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <button
            class="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium text-gray-800 bg-white border-gray-200/60 shadow-sm transition-transform duration-200 ease-out hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="current === 0"
            @click="current = Math.max(0, current - 1)"
          >Anterior</button>
          <div class="flex items-center gap-1">
            <span
              v-for="(p, i) in pages"
              :key="'dot-'+i"
              class="h-1.5 w-1.5 rounded-full bg-gray-300"
              :class="i === current ? 'bg-gradient-to-r from-purple-800 to-purple-400' : ''"
            ></span>
          </div>
          <button
            class="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium text-purple-700 bg-white border-purple-200/60 shadow-sm transition-transform duration-200 ease-out hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="current === pages.length - 1"
            @click="current = Math.min(pages.length - 1, current + 1)"
          >Siguiente</button>
        </div>
      </div>
      </div>
    </div>
  </section>
  
</template>

<style scoped>
/* Estilos mínimos, Tailwind se encarga del diseño */
/* Transición fade-in hacia la derecha */
.fade-right-enter-active,
.fade-right-leave-active { transition: all 220ms ease; }
.fade-right-enter-from { opacity: 0; transform: translateX(8px); }
.fade-right-leave-to { opacity: 0; transform: translateX(-8px); }
</style>

