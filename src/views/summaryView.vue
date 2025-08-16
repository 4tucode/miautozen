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
      ],
      deepByDomain: {},
      domainCurrent: 0
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
    domainBgClass(key) {
      if (key === 'animo') return 'from-amber-200/70 to-rose-200/60 ring-amber-200'
      if (key === 'ansiedad') return 'from-rose-200/70 to-purple-200/60 ring-rose-200'
      if (key === 'bienestar_fisico') return 'from-emerald-200/70 to-teal-200/60 ring-emerald-200'
      return 'from-purple-200/70 to-amber-200/60 ring-purple-200'
    },
    domainImage(key) {
      try {
        if (key === 'animo') return require('@/assets/zen1.png')
        if (key === 'ansiedad') return require('@/assets/zen2.png')
        if (key === 'bienestar_fisico') return require('@/assets/zen3.png')
      } catch (e) {
        // no-op
      }
      return require('@/assets/fondo.jpg')
    },
    domainEmoji(key) {
      if (key === 'animo') return '🙂'
      if (key === 'ansiedad') return '⚡'
      if (key === 'bienestar_fisico') return '🌙'
      return '🎯'
    },
    scrollDomains(dir = 1) {
      try {
        const el = this.$el?.querySelector?.('.domains-strip')
        if (!el) return
        const amount = Math.round(el.clientWidth * 0.9) * (dir >= 0 ? 1 : -1)
        el.scrollBy({ left: amount, behavior: 'smooth' })
      } catch (e) {
        // no-op
      }
    },
    goDomain(idx) {
      try {
        const el = this.$el?.querySelector?.('.domains-strip > .flex')
        const container = this.$el?.querySelector?.('.domains-strip')
        if (!el || !container) return
        const card = el.children?.[idx]
        if (!card) return
        container.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' })
        this.domainCurrent = idx
      } catch (e) {
        // no-op
      }
    },
    onDomainsScroll() {
      try {
        const container = this.$el?.querySelector?.('.domains-strip')
        const el = this.$el?.querySelector?.('.domains-strip > .flex')
        if (!el || !container) return
        const cards = Array.from(el.children || [])
        const midpoint = container.scrollLeft + container.clientWidth / 2
        let closestIdx = 0
        let closestDist = Number.POSITIVE_INFINITY
        cards.forEach((node, i) => {
          const center = node.offsetLeft + node.clientWidth / 2
          const d = Math.abs(center - midpoint)
          if (d < closestDist) { closestDist = d; closestIdx = i }
        })
        this.domainCurrent = closestIdx
      } catch (e) {
        // no-op
      }
    },
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
    },
    isDomainRed(c) {
      return Number(c?.wellbeingPercent || 0) < 34
    },
    hasDeepResultFor(key) {
      return Boolean(this.deepByDomain[key])
    },
    domainLearnMoreCta(c) {
      if (this.hasDeepResultFor(c?.key)) return `Ver diagnóstico de ${c.label.toLowerCase()}`
      const map = {
        animo: 'Saber más sobre tu ánimo',
        ansiedad: 'Saber más sobre tu ansiedad',
        bienestar_fisico: 'Saber más sobre tu bienestar físico',
        impacto: 'Saber más sobre tu impacto'
      }
      return map[c?.key] || 'Saber más de este dominio'
    },
    domainActionTarget(c) {
      if (!this.isDomainRed(c)) return null
      const fromResultId = this.resultado?.id || this.$route?.query?.resultId || ''
      const deep = this.deepByDomain[c?.key]
      if (deep) {
        return { name: 'domain-summary', params: { domain: c?.key }, query: { resultId: deep.id, ...(fromResultId ? { fromResultId } : {}) } }
      }
      return { name: 'domain-assessment', params: { domain: c?.key }, query: (fromResultId ? { fromResultId } : {}) }
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
      // Cargar resultados de dominio del usuario
      const todosUsuario = await listarResultadosPorUsuario(uid)
      const deep = todosUsuario.filter(r => String(r.formId || '').startsWith('domain_'))
      const map = {}
      deep.forEach(d => { if (d.domain && !map[d.domain]) map[d.domain] = d })
      this.deepByDomain = map
      if (!this.resultado) this.error = 'No se encontró el resultado recién guardado.'
    } catch (e) {
      this.error = 'No se pudo cargar el resumen.'
      // eslint-disable-next-line no-console
      console.error(e)
    } finally {
      this.cargando = false
    }
  }
  ,mounted() {
    // escuchar scroll del carrusel de dominios
    try {
      const el = this.$el?.querySelector?.('.domains-strip')
      el && el.addEventListener && el.addEventListener('scroll', this.onDomainsScroll, { passive: true })
    } catch (e) {
      // no-op
    }
  },
  beforeUnmount() {
    try {
      const el = this.$el?.querySelector?.('.domains-strip')
      el && el.removeEventListener && el.removeEventListener('scroll', this.onDomainsScroll)
    } catch (e) {
      // no-op
    }
  }
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
    <!-- Hero visual -->
    <div class="relative overflow-hidden rounded-3xl border border-amber-200/50 bg-gradient-to-br from-amber-50 via-rose-50 to-emerald-50 shadow-sm">
      <img src="@/assets/fondo.jpg" alt="" class="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div class="absolute inset-0 bg-gradient-to-t from-white/70 via-white/40 to-transparent"></div>
      <div class="relative px-6 sm:px-10 py-10 sm:py-14">
        <h1 class="text-4xl md:text-6xl font-black tracking-tight">
          <span class="bg-gradient-to-r from-amber-600 via-rose-500 to-emerald-600 bg-clip-text text-transparent">Tu resumen de bienestar</span>
        </h1>
        <p class="mt-3 max-w-2xl text-base md:text-lg text-gray-700">Una vista clara y serena de cómo estás. Usa esta guía para cuidarte con amabilidad.</p>
        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <div class="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-amber-200 p-5">
            <p class="text-xs font-medium text-amber-700">Bienestar global</p>
            <p class="mt-1 text-3xl md:text-4xl font-extrabold text-amber-800">{{ globalWellbeingPercent }}%</p>
          </div>
          <div class="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-rose-200 p-5">
            <p class="text-xs font-medium text-rose-700">Puntuación total</p>
            <p class="mt-1 text-3xl md:text-4xl font-extrabold text-rose-800">{{ resultado?.puntuacion }} pts</p>
          </div>
          <div class="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-emerald-200 p-5">
            <p class="text-xs font-medium text-emerald-700">Fecha</p>
            <p class="mt-1 text-lg md:text-xl font-semibold text-emerald-800">{{ resultado?.creadoEn?.toDate ? new Date(resultado.creadoEn.toDate()).toLocaleString('es-ES') : '—' }}</p>
          </div>
        </div>
        <div class="mt-6">
          <router-link :to="{ name: 'results' }" class="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Ver todos mis resultados</router-link>
        </div>
      </div>
    </div>

    <!-- Estados de carga/errores -->
    <p v-if="cargando" class="mt-8 h-40 w-full animate-pulse rounded-2xl bg-gray-200/70"></p>
    <p v-else-if="error" class="mt-8 text-sm font-medium text-red-600">{{ error }}</p>

    <div v-else-if="resultado" class="mt-10 space-y-12">
      <!-- Slider interpretativo -->
      <section>
        <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          <span class="bg-gradient-to-r from-amber-600 via-rose-500 to-emerald-600 bg-clip-text text-transparent">Cómo interpretar tus resultados</span>
        </h2>
        <div class="relative mt-4 overflow-hidden rounded-2xl ring-1 ring-gray-200 bg-white/60">
          <div class="flex transition-transform duration-300 ease-out" :style="{ width: (pages.length*100)+'%', transform: 'translateX(-'+ (current*100) +'%)' }">
            <div v-for="(p, i) in pages" :key="'slide-'+i" class="w-full shrink-0 px-6 py-6 md:px-8 md:py-8">
              <div :key="p.kind" class="rounded-2xl ring-1 p-5 sm:p-6 bg-white/85 backdrop-blur"
                   :class="p.kind==='intro' ? 'ring-amber-100' : p.kind==='total' ? 'ring-emerald-100' : p.kind==='domains' ? 'ring-purple-100' : p.kind==='impact' ? 'ring-rose-100' : 'ring-amber-100'">
                <div v-if="p.kind==='intro'" class="space-y-3 text-lg md:text-xl text-gray-700">
                  <p>Esta autoevaluación resume tu bienestar emocional con 7 preguntas (0–3 por ítem, total 0–21).</p>
                  <p>Úsalo como una guía para conocerte mejor. Si algo te preocupa, busca apoyo: pedir ayuda es una fortaleza.</p>
                </div>
                <div v-else-if="p.kind==='total'" class="space-y-3 text-lg md:text-xl text-gray-700">
                  <p class="font-semibold text-gray-900">Tu puntuación total se interpreta así:</p>
                  <ul class="space-y-2">
                    <li class="flex items-center gap-2"><span class="inline-flex h-3 w-3 rounded-full bg-green-500"></span><span><span class="font-bold">0–4</span> Muy baja: señales leves o ausentes.</span></li>
                    <li class="flex items-center gap-2"><span class="inline-flex h-3 w-3 rounded-full bg-emerald-500"></span><span><span class="font-bold">5–9</span> Leve: hábitos y rutinas pueden ayudar mucho.</span></li>
                    <li class="flex items-center gap-2"><span class="inline-flex h-3 w-3 rounded-full bg-amber-500"></span><span><span class="font-bold">10–14</span> Moderada: valora apoyo y acciones sostenidas.</span></li>
                    <li class="flex items-center gap-2"><span class="inline-flex h-3 w-3 rounded-full bg-rose-500"></span><span><span class="font-bold">15–21</span> Alta: busca ayuda profesional y apóyate en tu red cercana.</span></li>
                  </ul>
                </div>
                <div v-else-if="p.kind==='domains'" class="space-y-4 text-lg md:text-xl text-gray-700">
                  <p class="font-semibold text-gray-900">Qué mide cada dominio:</p>
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div class="flex items-start gap-3 rounded-xl bg-amber-50/80 p-4 ring-1 ring-amber-100">
                      <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 text-amber-800">🙂</span>
                      <div class="text-sm md:text-base"><p class="font-semibold text-gray-900">Ánimo</p><p>Estado de ánimo bajo y pérdida de interés.</p></div>
                    </div>
                    <div class="flex items-start gap-3 rounded-xl bg-rose-50/80 p-4 ring-1 ring-rose-100">
                      <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-200 text-rose-800">⚡</span>
                      <div class="text-sm md:text-base"><p class="font-semibold text-gray-900">Ansiedad</p><p>Preocupación constante, tensión o nerviosismo.</p></div>
                    </div>
                    <div class="flex items-start gap-3 rounded-xl bg-emerald-50/80 p-4 ring-1 ring-emerald-100">
                      <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-200 text-emerald-800">🌙</span>
                      <div class="text-sm md:text-base"><p class="font-semibold text-gray-900">Bienestar físico</p><p>Sueño y energía: descanso, cansancio o fatiga.</p></div>
                    </div>
                    <div class="flex items-start gap-3 rounded-xl bg-purple-50/80 p-4 ring-1 ring-purple-100">
                      <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-200 text-purple-800">🎯</span>
                      <div class="text-sm md:text-base"><p class="font-semibold text-gray-900">Impacto</p><p>Cómo afecta a estudios/trabajo, familia y tareas.</p></div>
                    </div>
                  </div>
                </div>
                <div v-else-if="p.kind==='impact'" class="space-y-3 text-lg md:text-xl text-gray-700">
                  <p>Si el <span class="font-semibold text-gray-900">impacto</span> es 2 o 3, estas dificultades interfieren de forma notable en tu vida diaria.</p>
                  <p>Pequeños pasos (rutinas, descanso, actividad) y apoyo profesional pueden marcar la diferencia.</p>
                </div>
                <div v-else-if="p.kind==='note'" class="space-y-3 text-lg md:text-xl text-gray-700">
                  <p>Este resultado es orientativo, no un diagnóstico. Si la puntuación es alta o el impacto elevado, busca ayuda.</p>
                  <p>Explora <router-link to="/ayuda" class="font-semibold text-rose-700 hover:text-rose-800">Recursos de apoyo</router-link> para dar el siguiente paso.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute inset-x-0 bottom-3 flex items-center justify-between px-4">
            <button class="inline-flex items-center rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-gray-800 ring-1 ring-gray-200 hover:bg-white" :disabled="current===0" @click="current = Math.max(0, current - 1)">Anterior</button>
            <div class="flex items-center gap-1">
              <span v-for="(p, i) in pages" :key="'dot-'+i" class="h-2 w-2 rounded-full bg-gray-300" :class="i === current ? 'bg-gradient-to-r from-amber-500 to-rose-500' : ''"></span>
            </div>
            <button class="inline-flex items-center rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-rose-700 ring-1 ring-rose-200 hover:bg-white" :disabled="current===pages.length-1" @click="current = Math.min(pages.length - 1, current + 1)">Siguiente</button>
          </div>
        </div>
      </section>

      <!-- Dominios visuales -->
      <section>
        <div class="flex items-end justify-between gap-4">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Tus dominios</h2>
          <div class="hidden sm:flex items-center gap-2">
            <button class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-gray-200 text-gray-700 hover:bg-gray-50" @click="scrollDomains(-1)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
            </button>
            <button class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-gray-200 text-gray-700 hover:bg-gray-50" @click="scrollDomains(1)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M8.25 4.5L15.75 12l-7.5 7.5"/></svg>
            </button>
          </div>
        </div>
        <div class="mt-4 overflow-x-auto domains-strip scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]" style="scrollbar-width: none;">
          <div class="flex gap-5 min-w-full">
            <article v-for="c in catBreakdown" :key="c.key" class="group relative w-[92%] sm:w-[520px] shrink-0 overflow-hidden rounded-3xl ring-1 p-0 shadow-sm bg-gradient-to-br" :class="domainBgClass(c.key)">
              <!-- Portada -->
              <div class="relative h-40 sm:h-56">
                <img :src="domainImage(c.key)" alt="" class="absolute inset-0 h-full w-full object-cover opacity-60" />
                <div class="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent"></div>
                <div class="relative h-full w-full p-5 flex items-end justify-between">
                  <div class="min-w-0">
                    <h3 class="text-2xl font-extrabold text-gray-900 tracking-tight">{{ c.label }}</h3>
                    <p class="mt-1 text-sm text-gray-700 max-w-md">{{ explanationFor(c) }}</p>
                  </div>
                  <div class="text-right">
                    <span class="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-sm font-bold bg-white/80 ring-1 ring-inset" :class="badgeClass(c.wellbeingPercent)">
                      <span class="select-none">{{ domainEmoji(c.key) }}</span>
                      <span>{{ c.percent }}%</span>
                    </span>
                  </div>
                </div>
              </div>
              <!-- Cuerpo -->
              <div class="p-5">
                <p class="text-sm text-gray-700">Estado actual de {{ c.label.toLowerCase() }}</p>
                <div class="mt-4">
                  <template v-if="isDomainRed(c)">
                    <router-link :to="domainActionTarget(c)" class="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-700 ring-1 ring-inset ring-rose-200 hover:bg-rose-50">
                      {{ domainLearnMoreCta(c) }}
                    </router-link>
                  </template>
                  <template v-else>
                    <span class="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">Dominio en buen estado</span>
                  </template>
                </div>
              </div>
            </article>
          </div>
          
        </div>
      </section>
    </div>

    <div v-else class="mt-8 text-sm text-gray-700">
      <p>No hay datos para mostrar.</p>
      <router-link :to="{ name: 'results' }" class="font-semibold text-rose-700 hover:text-rose-800">Ir a Mis resultados</router-link>
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

