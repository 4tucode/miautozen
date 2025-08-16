<script>
import { obtenerResultadoPorId } from '@/services/db'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

export default {
  name: 'DomainSummaryView',
  data() {
    return {
      loading: true,
      error: '',
      result: null,
      domainKey: this.$route.params.domain || 'animo',
      chartInstance: null
    }
  },
  computed: {
    domainLabel() {
      const map = { animo: 'Ánimo', ansiedad: 'Ansiedad', bienestar_fisico: 'Bienestar físico', impacto: 'Impacto' }
      return map[this.domainKey] || 'Dominio'
    },
    percent() {
      if (!this.result) return 0
      // Máximo por formulario de 15 preguntas con escala 0-3 => 45
      const max = 45
      const total = Number(this.result?.puntuacion || this.result?.total || 0)
      // Para dominios negativos (ansiedad/impacto), 100% = peor; mostramos bienestar (invertido)
      const negative = new Set(['ansiedad', 'impacto'])
      const rawPercent = Math.round((Math.max(0, Math.min(max, total)) / max) * 100)
      return negative.has(this.domainKey) ? (100 - rawPercent) : rawPercent
    },
    badgeClass() {
      const p = Number(this.percent || 0)
      if (p >= 67) return 'text-emerald-700 bg-emerald-50 border border-emerald-200'
      if (p >= 34) return 'text-purple-700 bg-purple-50 border border-purple-200'
      return 'text-rose-700 bg-rose-50 border border-rose-200'
    }
  },
  async created() {
    try {
      const id = this.$route.query.resultId
      if (!id) throw new Error('Falta resultId')
      const fetched = await obtenerResultadoPorId(id)
      this.result = fetched
      this.$nextTick(() => this.buildChart())
    } catch (e) {
      this.error = 'No se pudo cargar el resumen de dominio.'
      // eslint-disable-next-line no-console
      console.error(e)
    } finally {
      this.loading = false
    }
  },
  methods: {
    buildChart() {
      const el = this.$refs.chartEl
      if (!el || !this.result) return
      const p = Number(this.percent || 0)
      const data = [p, Math.max(0, 100 - p)]
      const ctx = el.getContext('2d')
      if (this.chartInstance) this.chartInstance.destroy()
      this.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Bienestar', 'Resto'],
          datasets: [{
            data,
            backgroundColor: ['#7c3aed', '#e5e7eb'],
            borderWidth: 0,
            hoverOffset: 3
          }]
        },
        options: {
          responsive: true,
          cutout: '70%',
          plugins: { legend: { display: false }, tooltip: { enabled: true } }
        }
      })
    },
    backToSummaryLink() {
      const fromResultId = this.$route.query.fromResultId
      return fromResultId
        ? { name: 'assessment-summary', query: { resultId: fromResultId } }
        : { name: 'assessment-summary' }
    }
  }
}
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
    <div class="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 sm:p-8 shadow-sm">
      <header class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold leading-tight">
            <span class="bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">Diagnóstico por dominio</span>
          </h1>
          <p class="mt-1 text-sm text-gray-600">{{ domainLabel }} • 15 preguntas</p>
        </div>
        <router-link :to="{ name: 'results' }" class="inline-flex items-center rounded-md bg-gradient-to-r from-purple-800 to-purple-400 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-95">Mis resultados</router-link>
      </header>

      <div class="mt-6">
        <p v-if="loading" class="h-24 w-full animate-pulse rounded-xl bg-gray-200/70"></p>
        <p v-else-if="error" class="text-sm font-medium text-red-600">{{ error }}</p>
        <div v-else-if="result" class="space-y-4">
          <div class="rounded-xl border border-gray-200 bg-white/80 p-5">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-700">
                <p class="font-medium text-gray-900">Nivel de bienestar en {{ domainLabel }}</p>
                <p class="mt-1 text-gray-600">Calculado a partir de tus respuestas. Úsalo como guía; no es un diagnóstico clínico.</p>
              </div>
              <span class="rounded-full px-2 py-0.5 text-xs font-semibold" :class="badgeClass">{{ percent }}%</span>
            </div>
            <div class="mt-4 h-2 w-full rounded-full bg-gray-200">
              <div class="h-full rounded-full bg-gradient-to-r from-purple-800 to-purple-400 transition-[width] duration-300 ease-out" :style="{ width: percent + '%' }"></div>
            </div>
          </div>

          <!-- Mini explicación y gráfica -->
          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-xl border border-gray-200 bg-white/80 p-5 text-sm text-gray-700">
              <p class="font-semibold text-gray-900">Interpretación</p>
              <p class="mt-1">Un valor mayor indica mejor bienestar en este dominio.</p>
              <ul class="mt-2 space-y-1">
                <li class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-emerald-500"></span><span>67–100%: sólido</span></li>
                <li class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-purple-500"></span><span>34–66%: medio</span></li>
                <li class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-rose-500"></span><span>0–33%: vulnerable</span></li>
              </ul>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white/80 p-5 text-sm text-gray-700">
              <div class="h-48 relative">
                <canvas ref="chartEl" class="absolute inset-0 h-full w-full"></canvas>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-lg font-semibold text-gray-800">{{ percent }}%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-xl border border-gray-200 bg-white/80 p-5 text-sm text-gray-700">
              <p class="font-semibold text-gray-900">Recomendaciones</p>
              <ul class="mt-2 list-disc pl-5 space-y-1">
                <li>Registra pequeñas acciones diarias relacionadas con {{ domainLabel.toLowerCase() }}.</li>
                <li>Si te preocupa, busca apoyo profesional. Pedir ayuda es una fortaleza.</li>
                <li>Explora <router-link to="/ayuda" class="text-purple-700 hover:text-purple-800 font-semibold">Recursos de apoyo</router-link>.</li>
              </ul>
            </div>
          </div>

          <div class="pt-2 flex items-center gap-3">
            <router-link :to="backToSummaryLink()" class="inline-flex items-center justify-center rounded-md bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50">
              Volver al resumen general
            </router-link>
            <router-link :to="{ name: 'results' }" class="inline-flex items-center justify-center rounded-md bg-white border border-purple-200/60 px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm hover:bg-purple-50">
              Ver todos mis resultados
            </router-link>
          </div>
        </div>
        <div v-else class="text-sm text-gray-700">No hay datos para mostrar.</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Tailwind se encarga del diseño */
</style>


