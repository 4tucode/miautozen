<script>
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'

import { obtenerResultadoPorId } from '@/services/db'
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
    },
    level() {
      const p = Number(this.percent || 0)
      if (p >= 67) return 'alto'
      if (p >= 34) return 'medio'
      return 'bajo'
    },
    dynamicTips() {
      const key = this.domainKey
      const lvl = this.level
      const tips = {
        animo: {
          bajo: [
            'Establece una rutina de sueño y comidas regulares.',
            'Practica una caminata corta diaria (10–15 min).',
            'Conecta con alguien de confianza hoy mismo.'
          ],
          medio: [
            'Planifica una actividad gratificante a la semana.',
            'Practica respiraciones profundas 5 minutos al día.',
            'Registra 3 cosas que agradeces cada noche.'
          ],
          alto: [
            'Mantén tus hábitos: descanso, actividad y conexión social.',
            'Consolida horarios estables y pausas activas.',
            'Comparte tus avances con alguien de apoyo.'
          ]
        },
        ansiedad: {
          bajo: [
            'Prueba la técnica 4-7-8 de respiración antes de dormir.',
            'Reduce cafeína por la tarde.',
            'Organiza microtareas en bloques de 25 minutos.'
          ],
          medio: [
            'Practica relajación muscular progresiva 1–2 veces al día.',
            'Expónte gradualmente a situaciones evitadas con pasos pequeños.',
            'Escribe tus preocupaciones y evalúa evidencia a favor/en contra.'
          ],
          alto: [
            'Sigue usando técnicas que te funcionan; mantén una rutina calmante.',
            'Integra pausas de respiración a mitad de jornada.',
            'Considera apoyo profesional si interfiere en tu día a día.'
          ]
        },
        bienestar_fisico: {
          bajo: [
            'Evita pantallas 60 minutos antes de dormir.',
            'Hidrátate y realiza pausas activas breves.',
            'Camina 15 minutos al sol si es posible.'
          ],
          medio: [
            'Establece una hora fija para acostarte y levantarte (+/- 30m).',
            'Añade 2 sesiones cortas de actividad física por semana.',
            'Prepara snacks saludables accesibles.'
          ],
          alto: [
            'Mantén tu higiene del sueño y rutina de movimiento.',
            'Planifica entrenamientos ligeros regulares.',
            'Ajusta tu entorno para favorecer el descanso (luz, ruido, temperatura).'
          ]
        },
        impacto: {
          bajo: [
            'Divide tareas grandes en pasos muy pequeños.',
            'Usa la técnica de 2 minutos para comenzar.',
            'Agenda recordatorios y bloques de foco.'
          ],
          medio: [
            'Prioriza 1–3 tareas clave al día.',
            'Revisa y simplifica compromisos no esenciales.',
            'Negocia apoyos temporales con tu entorno.'
          ],
          alto: [
            'Mantén sistemas que te funcionan (listas, bloques, apoyos).',
            'Revisa límites y coordina apoyos con personas cercanas.',
            'Considera orientación profesional si la interferencia persiste.'
          ]
        }
      }
      return tips[key]?.[lvl] || []
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
        options: { responsive: true, cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: true } } }
      })
    },
    async loadScript(src) {
      return new Promise((resolve, reject) => {
        try {
          const existing = document.querySelector(`script[src="${src}"]`)
          if (existing) { resolve(true); return }
          const s = document.createElement('script')
          s.src = src
          s.async = true
          s.onload = () => resolve(true)
          s.onerror = () => reject(new Error('No se pudo cargar: ' + src))
          document.head.appendChild(s)
        } catch (e) { reject(e) }
      })
    },
    async ensurePdfLibs() {
      if (!window.html2canvas) {
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')
      }
      if (!window.jspdf?.jsPDF) {
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
      }
    },
    async elementToImage(el) {
      const node = (typeof el === 'string') ? this.$el?.querySelector?.(el) : el
      if (!node) return null
      const canvas = await window.html2canvas(node, { scale: 2, backgroundColor: '#ffffff', useCORS: true, windowWidth: document.documentElement.scrollWidth })
      return canvas.toDataURL('image/jpeg', 0.92)
    },
    async downloadPdfDomain() {
      try {
        await this.ensurePdfLibs()
        const { jsPDF } = window.jspdf || {}
        if (!jsPDF || !window.html2canvas) {
          window.print && window.print();
          return
        }
        const pdf = new jsPDF('p', 'mm', 'a4')
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const pxToMm = (px) => px * 0.2645833333

        const addSection = async (selector, marginTopMm = 8) => {
          const imgData = await this.elementToImage(selector)
          if (!imgData) return
          const img = new Image()
          await new Promise((res) => { img.onload = res; img.src = imgData })
          const imgWmm = pageWidth - 16
          const scale = imgWmm / pxToMm(img.width)
          const imgHmm = pxToMm(img.height) * scale
          let y = marginTopMm
          if (imgHmm > pageHeight - 16) {
            let remaining = imgHmm
            while (remaining > 0) {
              const sliceHmm = Math.min(remaining, pageHeight - 16)
              pdf.addImage(imgData, 'JPEG', 8, 8, imgWmm, sliceHmm, undefined, 'FAST')
              remaining -= sliceHmm
              if (remaining > 0) pdf.addPage()
            }
          } else {
            pdf.addImage(imgData, 'JPEG', 8, y, imgWmm, imgHmm)
          }
        }

        // Captura recortada: portada y card principal
        await addSection('#domain-hero')
        await addSection('#domain-content-card')

        const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')
        pdf.save(`MiAutoZen-Dominio-${this.domainKey}-${ts}.pdf`)
      } catch (e) {
        console.error(e)
        window.print && window.print()
      }
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
  <section class="mx-auto max-w-7xl">
    <div class="relative overflow-hidden  bg-gradient-to-br from-amber-50 via-rose-50 to-emerald-50 shadow-sm">
      <div id="domain-hero" class="relative px-6 sm:px-10 py-10 sm:py-14">
        <h1 class="text-4xl md:text-6xl font-black tracking-tight">
          <span
            class="bg-gradient-to-r from-amber-600 via-rose-500 to-emerald-600 bg-clip-text text-transparent">Diagnóstico
            por dominio</span>
        </h1>
        <p class="mt-3 max-w-2xl text-base md:text-lg text-gray-700">Bienestar en {{ domainLabel.toLowerCase() }} según
          tu formulario de 15 preguntas.</p>
        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <div class="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-amber-200 p-5">
            <p class="text-xs font-medium text-amber-700">Bienestar en {{ domainLabel }}</p>
            <p class="mt-1 text-3xl md:text-4xl font-extrabold text-amber-800">{{ percent }}%</p>
          </div>
          <div class="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-rose-200 p-5">
            <p class="text-xs font-medium text-rose-700">Puntuación total</p>
            <p class="mt-1 text-3xl md:text-4xl font-extrabold text-rose-800">{{ result?.puntuacion || result?.total }}
              pts</p>
          </div>
          <div class="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-emerald-200 p-5">
            <p class="text-xs font-medium text-emerald-700">Fecha</p>
            <p class="mt-1 text-lg md:text-xl font-semibold text-emerald-800">{{ result?.creadoEn?.toDate ? new
              Date(result.creadoEn.toDate()).toLocaleString('es-ES') : '—' }}</p>
          </div>
        </div>
        <div class="mt-6">
          <div class="flex items-center gap-3 flex-wrap">
            <router-link :to="{ name: 'results' }"
              class="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Ver
              todos mis resultados</router-link>
            <button type="button" @click="downloadPdfDomain"
              class="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 shadow">
              Descargar informe (PDF)
            </button>
          </div>
        </div>
      </div>
      <div class="px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl sm:text-3xl font-bold leading-tight">
          <span class="bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">Diagnóstico por
            dominio</span>
        </h1>
        <p class="mt-1 text-sm text-gray-600">{{ domainLabel }} • 15 preguntas</p>
      </div>

      <div class="mt-4 grid gap-4 md:grid-cols-2 px-4 sm:px-6 lg:px-8">
        <!-- Interpretaciones a la izquierda -->
        <div class="rounded-xl border border-gray-200 bg-white/80 p-5 text-sm text-gray-700">
          <p class="font-semibold text-gray-900">Interpretación</p>
          <p class="mt-1">Un valor mayor indica mejor bienestar en este dominio.</p>
          <ul class="mt-2 space-y-1">
            <li class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-emerald-500"></span><span>67–100%: sólido</span></li>
            <li class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-purple-500"></span><span>34–66%: medio</span></li>
            <li class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-rose-500"></span><span>0–33%: vulnerable</span></li>
          </ul>
        </div>
        <!-- Recomendaciones a la derecha -->
        <div class="rounded-xl border border-gray-200 bg-white/80 p-5 text-sm text-gray-700">
          <p class="font-semibold text-gray-900">Recomendaciones</p>
          <ul class="mt-2 list-disc pl-5 space-y-1">
            <li v-for="(tip, i) in dynamicTips" :key="i">{{ tip }}</li>
            <li>
              Explora <router-link to="/ayuda" class="text-purple-700 hover:text-purple-800 font-semibold">Recursos de apoyo</router-link>.
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-4 px-4 sm:px-6 lg:px-8 pb-10">
        <router-link :to="backToSummaryLink()"
          class="inline-flex items-center justify-center rounded-md bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50">
          Volver al resumen general
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Tailwind se encarga del diseño */
</style>
