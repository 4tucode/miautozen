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
      domainCurrent: 0,
      interpretSections: [
        { id: 'intro', label: 'Introducción' },
        { id: 'puntuacion', label: 'Puntuación' },
        { id: 'dominios', label: 'Dominios' },
        { id: 'impacto', label: 'Impacto' },
        { id: 'nota', label: 'Nota' }
      ],
      activeSection: 'intro',
      interpretObserver: null
      , explainOpen: false
      , explainDomain: null
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
      
      // Verificar que el resultado tenga datos válidos
      if (!r || !r.id || Object.keys(r).length === 0) {
        return out
      }
      
      // Obtener domainScores del resultado o calcular desde respuestas
      let ds = r.domainScores
      
      if (!ds || Object.keys(ds).length === 0) {
        // Calcular desde answers/respuestas del formulario
        const answers = Array.isArray(r.answers) ? r.answers : []
        
        const tmp = {}
        answers.forEach(a => {
          if (!a || !a.domain || a.value === null || a.value === undefined) return
          const k = a.domain
          const v = Number(a.value || 0)
          if (Number.isNaN(v)) return
          tmp[k] = (tmp[k] || 0) + v
        })
        ds = tmp
      }
      
      // Si aún no hay domainScores, calcular desde respuestas antiguas
      if (!ds || Object.keys(ds).length === 0) {
        const respuestas = Array.isArray(r.respuestas) ? r.respuestas : []
        
        const tmp = {}
        respuestas.forEach(r => {
          if (!r || !r.dominio || r.valor === null || r.valor === undefined) return
          const k = r.dominio
          const v = Number(r.valor || 0)
          if (Number.isNaN(v)) return
          tmp[k] = (tmp[k] || 0) + v
        })
        ds = tmp
      }

      // Agrupar por dominios principales
      const values = {
        animo: Number(ds?.animo || 0) + Number(ds?.anhedonia || 0),
        ansiedad: Number(ds?.ansiedad || 0) + Number(ds?.ansiedad_control || 0) + Number(ds?.ansiedad_tension || 0),
        bienestar_fisico: Number(ds?.bienestar_fisico || 0) + Number(ds?.sueno || 0) + Number(ds?.energia || 0),
        impacto: Number(ds?.impacto || 0)
      }
      
      // Calcular porcentajes de bienestar (100% = bienestar máximo)
      // IMPORTANTE: ansiedad, impacto Y ÁNIMO son inversos (0% = bien, 100% = mal)
      // Solo bienestar físico es directo (0% = mal, 100% = bien)
      const positiveOrientation = new Set(['bienestar_fisico']) // Solo bienestar físico es positivo
      
      ;['animo', 'ansiedad', 'bienestar_fisico', 'impacto'].forEach(key => {
        const max = maxByKey[key]
        const raw = Math.max(0, Math.min(max, Number(values[key] || 0)))
        
        const isPositive = positiveOrientation.has(key)
        let wellbeingPercent
        
        if (isPositive) {
          // Solo bienestar físico: 100% = bienestar máximo, 0% = síntomas máximos
          // Fórmula: (max - raw) / max * 100
          // Ejemplo: si raw=0 (sin síntomas), wellbeingPercent=100% (bienestar máximo)
          wellbeingPercent = Math.round(((max - raw) / max) * 100)
        } else {
          // Ánimo, ansiedad e impacto: 0% = bienestar máximo (sin síntomas), 100% = síntomas máximos
          // Fórmula: (max - raw) / max * 100
          // Ejemplo: si raw=0 (sin síntomas), wellbeingPercent=100% (bienestar máximo)
          // Ejemplo: si raw=max (síntomas máximos), wellbeingPercent=0% (sin bienestar)
          wellbeingPercent = Math.round(((max - raw) / max) * 100)
        }
        
        out.push({
          key,
          label: labelByKey[key],
          value: raw,
          max,
          percent: wellbeingPercent, // Porcentaje de bienestar para mostrar
          wellbeingPercent, // Para colores/emoji
          baselineWellbeingPercent: wellbeingPercent,
          orientation: isPositive ? 'positive' : 'negative'
        })
      })

      // Aplicar overrides desde formularios de dominio si existen
      const overrides = r?.overrides || {}
      const withOverrides = out.map(c => {
        const override = overrides?.[c.key]
        if (override && typeof override.wellbeingPercent === 'number') {
          // Para dominios negativos (ánimo, ansiedad, impacto), invertir el porcentaje
          // porque 0% síntomas = 100% bienestar, 100% síntomas = 0% bienestar
          // Para dominios positivos (solo bienestar físico), usar directamente el porcentaje
          const isPositive = positiveOrientation.has(c.key)
          let finalWellbeingPercent
          
          if (isPositive) {
            // Solo bienestar físico: usar directamente el porcentaje del formulario de dominio
            // Si el dominio profundo dice 33% bienestar, mostrar 33%
            finalWellbeingPercent = override.wellbeingPercent
          } else {
            // Ánimo, ansiedad e impacto: invertir el porcentaje
            // Si el dominio profundo dice 33% bienestar, significa 33% síntomas
            // Por lo tanto, el bienestar real es 100% - 33% = 67%
            finalWellbeingPercent = 100 - override.wellbeingPercent
          }
          
          return { 
            ...c, 
            percent: finalWellbeingPercent, 
            wellbeingPercent: finalWellbeingPercent, 
            deepWellbeingPercent: override.wellbeingPercent, // porcentaje original del dominio profundo
            deepTotal: Number(override.total || 0), 
            deepResultId: override.resultId || null, 
            finalWellbeingPercent: finalWellbeingPercent, 
            overriddenByDeep: true, 
            overrideSource: 'parent' 
          }
        }
        return c
      })

      const withFinal = withOverrides.map(c => ({
        ...c,
        finalWellbeingPercent: c.finalWellbeingPercent || c.baselineWellbeingPercent
      }))

      return withFinal.sort((a, b) => Number(a.wellbeingPercent || 0) - Number(b.wellbeingPercent || 0))
    },
    globalWellbeingPercent() {
      const items = this.catBreakdown
      if (!items.length) return 0
      const sum = items.reduce((acc, c) => acc + Number(c.wellbeingPercent || 0), 0)
      return Math.round(sum / items.length)
    },
    generalTotal() {
      const r = this.resultado || {}
      // Verificar que el resultado tenga datos válidos
      if (!r || !r.id || Object.keys(r).length === 0) {
        return 0
      }
      // El formulario general tiene máximo 21 puntos (7 ítems x 0–3)
      const raw = Number(r?.puntuacion || r?.total || 0)
      const clamped = Math.max(0, Math.min(21, raw))
      
      return clamped
    }
  },
  methods: {
    formatDateTime(ts) {
      try {
        let d = null
        if (!ts) return '—'
        if (typeof ts?.toDate === 'function') {
          d = ts.toDate()
        } else if (typeof ts === 'object' && typeof ts?.seconds === 'number') {
          d = new Date(ts.seconds * 1000)
        } else if (typeof ts === 'string' || typeof ts === 'number' || ts instanceof Date) {
          d = new Date(ts)
        }
        if (!d || Number.isNaN(d.getTime())) return '—'
        return new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(d)
      } catch (e) {
        return '—'
      }
    },
    slideBg(kind) {
      try {
        if (kind === 'intro') return require('@/assets/fondo.jpg')
        if (kind === 'total') return require('@/assets/zen3.png')
        if (kind === 'domains') return require('@/assets/zen2.png')
        if (kind === 'impact') return require('@/assets/zen1.png')
        if (kind === 'note') return require('@/assets/fondo.jpg')
      } catch (e) {
        // no-op
      }
      return require('@/assets/fondo.jpg')
    },
    slideRing(kind) {
      if (kind === 'intro') return 'ring-amber-200'
      if (kind === 'total') return 'ring-emerald-200'
      if (kind === 'domains') return 'ring-purple-200'
      if (kind === 'impact') return 'ring-rose-200'
      return 'ring-amber-200'
    },
    slideIllustration(kind) {
      try {
        if (kind === 'intro') return require('@/assets/int1 (1).png')
        if (kind === 'total') return require('@/assets/int1 (2).png')
        return require('@/assets/int1 (3).png')
      } catch (e) {
        // no-op
      }
      return require('@/assets/int1 (1).png')
    },
    domainBgClass(key) {
      if (key === 'animo') return 'from-amber-200/70 to-rose-200/60'
      if (key === 'ansiedad') return 'from-rose-200/70 to-purple-200/60'
      if (key === 'bienestar_fisico') return 'from-emerald-200/70 to-teal-200/60'
      return 'from-purple-200/70 to-amber-200/60'
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
    badgeClass(domain) {
      const p = Number(domain?.percent || 0)
      const isPositive = domain?.orientation === 'positive'
      const isAnimo = domain?.key === 'animo'
      
      // LÓGICA CORREGIDA:
      // Para ÁNIMO: 0% = malestar máximo (rojo), 100% = bienestar máximo (verde)
      // Para dominios negativos (ansiedad, impacto): 0% = bienestar máximo (verde), 100% = malestar máximo (rojo)
      // Para dominios positivos (bienestar físico): 0% = malestar máximo (rojo), 100% = bienestar máximo (verde)
      
      if (isAnimo) {
        // Ánimo: lógica específica - 0% = rojo, 50% = morado, 100% = verde
        if (p <= 20) return 'text-rose-700 bg-rose-50 border border-rose-200'
        if (p <= 50) return 'text-purple-700 bg-purple-50 border border-purple-200'
        return 'text-emerald-700 bg-emerald-50 border border-emerald-200'
      } else if (isPositive) {
        // Solo bienestar físico: umbrales estándar
        if (p >= 67) return 'text-emerald-700 bg-emerald-50 border border-emerald-200'
        if (p >= 34) return 'text-purple-700 bg-purple-50 border border-purple-200'
        return 'text-rose-700 bg-rose-50 border border-rose-200'
      } else {
        // Ansiedad e impacto: umbrales invertidos
        // 0-20% = verde (bienestar máximo, sin síntomas)
        // 21-40% = morado (estado medio)
        // 41%+ = rojo (malestar alto, muchos síntomas)
        if (p <= 20) return 'text-emerald-700 bg-emerald-50 border border-emerald-200'
        if (p <= 40) return 'text-purple-700 bg-purple-50 border border-purple-200'
        return 'text-rose-700 bg-rose-50 border border-rose-200'
      }
    },
    emojiForPercent(domain) {
      const p = Number(domain?.percent || 0)
      const isPositive = domain?.orientation === 'positive'
      const isAnimo = domain?.key === 'animo'
      
      // LÓGICA CORREGIDA:
      // Para ÁNIMO: 0% = malestar máximo (☹️), 100% = bienestar máximo (😊)
      // Para dominios negativos (ansiedad, impacto): 0% = bienestar máximo (😊), 100% = malestar máximo (☹️)
      // Para dominios positivos (bienestar físico): 0% = malestar máximo (☹️), 100% = bienestar máximo (😊)
      
      if (isAnimo) {
        // Ánimo: lógica específica - 0% = ☹️, 50% = 😐, 100% = 😊
        if (p <= 20) return '☹️' // Malestar máximo = triste
        if (p <= 50) return '😐' // Estado medio = neutral
        return '😊' // Bienestar máximo = feliz
      } else if (isPositive) {
        // Solo bienestar físico: umbrales estándar
        if (p >= 67) return '😊'
        if (p >= 34) return '😐'
        return '☹️'
      } else {
        // Ansiedad e impacto: umbrales invertidos
        // 0-20% = 😊 (bienestar máximo, sin síntomas)
        // 21-40% = 😐 (estado medio)
        // 41%+ = ☹️ (malestar alto, muchos síntomas)
        if (p <= 20) return '😊'
        if (p <= 40) return '😐'
        return '☹️'
      }
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
      
      // LÓGICA CORREGIDA:
      // Para ÁNIMO: 0% = malestar máximo, 100% = bienestar máximo
      // Para dominios negativos (ansiedad, impacto): 0% = bienestar máximo, 100% = malestar máximo
      // Para dominios positivos (bienestar físico): 0% = malestar máximo, 100% = bienestar máximo
      
      if (c.key === 'animo') {
        // Ánimo: lógica específica - 0% = malestar, 100% = bienestar
        let nivel = 'bajo', detalle = 'estado de ánimo bajo', sugerencia = 'considera buscar apoyo'
        if (p > 66) { nivel = 'alto'; detalle = 'muy buen estado de ánimo'; sugerencia = 'sigue cuidando tu bienestar emocional' }
        else if (p > 33) { nivel = 'moderado'; detalle = 'estado de ánimo aceptable'; sugerencia = 'consolida hábitos que mejoren tu ánimo' }
        return `Tienes un ${p}% en ${c.label} (${nivel}): ${detalle}; ${sugerencia}.`
      } else if (c.orientation === 'positive') {
        // Solo bienestar físico: lógica estándar
        let nivel = 'bajo', detalle = 'podría mejorar', sugerencia = 'pequeños hábitos pueden ayudar'
        if (p > 66) { nivel = 'alto'; detalle = 'muy buen estado'; sugerencia = 'sigue cuidando tus rutinas' }
        else if (p > 33) { nivel = 'moderado'; detalle = 'estado aceptable'; sugerencia = 'consolida tus hábitos saludables' }
        return `Tienes un ${p}% en ${c.label} (${nivel}): ${detalle}; ${sugerencia}.`
      } else {
        // Ansiedad e impacto: lógica invertida
        let nivel = 'bajo', detalle = 'señales leves', sugerencia = 'estás cerca de tu bienestar'
        if (p > 66) { nivel = 'alto'; detalle = 'señales elevadas'; sugerencia = 'considera buscar apoyo si persiste' }
        else if (p > 33) { nivel = 'moderado'; detalle = 'señales moderadas'; sugerencia = 'cuidar hábitos y rutinas puede ayudar' }
        return `Tienes un ${p}% en ${c.label} (${nivel}): ${detalle} de ${domainDesc}; ${sugerencia}.`
      }
    },
    isDomainRed(c) {
      // Usar el porcentaje de bienestar calculado (percent), no wellbeingPercent
      const p = Number(c?.percent || 0)
      const isPositive = c?.orientation === 'positive'
      const isAnimo = c?.key === 'animo'
      
      // LÓGICA CORREGIDA:
      // Para ÁNIMO: 0% = vulnerable (rojo), 100% = buen estado (no rojo)
      // Para dominios negativos (ansiedad, impacto): 0% = bienestar máximo (no rojo), 100% = malestar máximo (rojo)
      // Para dominios positivos (bienestar físico): 0% = malestar máximo (rojo), 100% = bienestar máximo (no rojo)
      
      if (isAnimo) {
        // Ánimo: lógica específica - 0-20% = rojo (vulnerable), 21%+ = no rojo
        return p <= 20
      } else if (isPositive) {
        // Solo bienestar físico: umbral estándar
        return p < 34
      } else {
        // Ansiedad e impacto: umbral invertido
        // 0-20% = verde (no rojo), 21-40% = morado (no rojo), 41%+ = rojo
        return p > 40
      }
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
      const fromResultId = this.resultado?.id || ''
      return { name: 'domain-assessment', params: { domain: c?.key }, query: (fromResultId ? { fromResultId } : {}) }
    },
    scrollToSection(id) {
      try {
        const el = this.$el?.querySelector?.('#' + id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          this.activeSection = id
        }
      } catch (e) {
        // no-op
      }
    }
    , async loadScript(src) {
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
    }
    , async ensurePdfLibs() {
      if (!window.html2canvas) {
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')
      }
      if (!window.jspdf?.jsPDF) {
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
      }
    }
    , async elementToImage(el) {
      const node = (typeof el === 'string') ? this.$el?.querySelector?.(el) : el
      if (!node) return null
      // Forzamos layout estable y fondo blanco
      const prev = node.style.backgroundColor
      node.style.backgroundColor = '#ffffff'
      const canvas = await window.html2canvas(node, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        windowWidth: node.scrollWidth || document.documentElement.scrollWidth,
        windowHeight: node.scrollHeight || document.documentElement.scrollHeight,
        scrollX: 0,
        scrollY: -window.scrollY
      })
      node.style.backgroundColor = prev
      return canvas.toDataURL('image/jpeg', 0.95)
    }
    , async downloadPdf() {
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

        const addSection = async (selector, marginTopMm = 8) => {
          const imgData = await this.elementToImage(selector)
          if (!imgData) return
          const img = new Image()
          await new Promise((res) => { img.onload = res; img.src = imgData })
          const pxToMm = (px) => px * 0.2645833333
          const imgWmm = pageWidth - 16
          const scale = imgWmm / pxToMm(img.width)
          const imgHmm = pxToMm(img.height) * scale
          let y = marginTopMm
          // Si se desborda, nueva página
          if (y + imgHmm > pageHeight - 10) { pdf.addPage(); y = marginTopMm }
          pdf.addImage(imgData, 'JPEG', 8, y, imgWmm, imgHmm)
        }

        // Captura del contenedor principal en trozos para mayor fidelidad
        const container = this.$el?.querySelector?.('#summary-pdf')
        if (container) {
          const totalHeight = container.scrollHeight
          let offsetY = 0
          while (offsetY < totalHeight) {
            const slice = await this.elementToImage(container)
            pdf.addImage(slice, 'JPEG', 8, 8, pageWidth - 16, (pageWidth - 16) * (container.scrollHeight / container.scrollWidth))
            offsetY += totalHeight
            if (offsetY < totalHeight) pdf.addPage()
          }
        } else {
          // Fallback a secciones
          await addSection('.relative:has(> h1)')
          await addSection('#dominios')
          await addSection('#nota')
        }

        // Fallback: si no se encontró nada, exporta todo el contenedor
        if (pdf.getNumberOfPages() === 1 && pdf.internal.getCurrentPageInfo().pageNumber === 1) {
          const all = await this.elementToImage('section.mx-auto.max-w-7xl')
          if (all) {
            pdf.addImage(all, 'JPEG', 8, 8, pageWidth - 16, (pageWidth - 16) * 0.5625)
          }
        }

        const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')
        pdf.save(`MiAutoZen-Resumen-${ts}.pdf`)
      } catch (e) {
        console.error(e)
        window.print && window.print()
      }
    }
    , openExplain(c) {
      this.explainDomain = c
      this.explainOpen = true
    }
    , closeExplain() {
      this.explainOpen = false
      this.explainDomain = null
    }
  },
  async created() {
    try {
      
      // Verificar estado de autenticación
      const uid = this.$store.state.usuario?.uid
      
      if (!uid) {
        this.$router.push({ name: 'login', query: { next: this.$route.fullPath } })
        return
      }
      
      // Verificar query parameters
      const resultId = this.$route.query.resultId
      
      if (resultId) {
        const fetched = await obtenerResultadoPorId(resultId)
        this.resultado = fetched?.usuarioId === uid ? fetched : null
      }
      
      // Si no hay resultId válido, tomar el más reciente
      if (!this.resultado) {
        const todos = await listarResultadosPorUsuario(uid)
        
        const generales = (todos || []).filter(r => !String(r.formId || '').startsWith('domain_'))
        
        this.resultado = generales?.[0] || null
      }
      
      // No considerar resultados profundos antiguos en este resumen
      this.deepByDomain = {}
      if (!this.resultado) {
        this.error = 'No se encontró el resultado recién guardado.'
      }
      
    } catch (e) {
      this.error = 'No se pudo cargar el resumen.'
      console.error('Error en created:', e)
    } finally {
      this.cargando = false
    }
  }
  , mounted() {
    // escuchar scroll del carrusel de dominios
    try {
      const el = this.$el?.querySelector?.('.domains-strip')
      el && el.addEventListener && el.addEventListener('scroll', this.onDomainsScroll, { passive: true })
    } catch (e) {
      // no-op
    }
    // observar secciones de interpretación para marcar pestaña activa
    try {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting && en.target?.id) {
            this.activeSection = en.target.id
          }
        })
      }, { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0.4 })
      this.interpretSections.forEach(s => {
        const node = this.$el?.querySelector?.('#' + s.id)
        node && obs.observe(node)
      })
      this.interpretObserver = obs
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
    try {
      this.interpretObserver && this.interpretObserver.disconnect()
    } catch (e) {
      // no-op
    }
  }
}
</script>

<template>
  <section id="summary-pdf" class="mx-auto max-w-7xl">
    <!-- Hero visual -->
    <div class="relative overflow-hidden  bg-gradient-to-br from-amber-50 via-rose-50 to-emerald-50 shadow-sm">
      <img src="@/assets/fondo.jpg" alt="" class="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div class="absolute inset-0 bg-gradient-to-t from-white/70 via-white/40 to-transparent"></div>
      <div class="relative px-6 sm:px-10 py-10 sm:py-14">
        <h1 class="text-4xl md:text-6xl font-black tracking-tight">
          <span class="bg-gradient-to-r from-amber-600 via-rose-500 to-emerald-600 bg-clip-text text-transparent">Tu
            resumen de Bienestar</span>
        </h1>
        <p class="mt-3 max-w-2xl text-base md:text-lg text-gray-700">Una vista clara y serena de cómo estás. Usa esta
          guía para cuidarte con amabilidad.</p>
        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <div class="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-amber-200 p-5">
            <p class="text-xs font-medium text-amber-700">Tu bienestar está al</p>
            <p class="mt-1 text-3xl md:text-4xl font-extrabold text-amber-800">{{ globalWellbeingPercent }}%</p>
          </div>
          <div class="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-rose-200 p-5">
            <p class="text-xs font-medium text-rose-700">Puntuación</p>
            <p class="mt-1 text-3xl md:text-4xl font-extrabold text-rose-800">{{ generalTotal }} pts</p>
          </div>
          <div class="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-emerald-200 p-5">
            <p class="text-xs font-medium text-emerald-700">Fecha</p>
            <p class="mt-1 text-lg md:text-xl font-semibold text-emerald-800">{{ formatDateTime(resultado?.creadoEn) }}</p>
          </div>
        </div>
        <div class="mt-6">
          <div class="flex items-center gap-3 flex-wrap">
            <router-link :to="{ name: 'results' }"
              class="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Ver
              todos mis resultados</router-link>
            <button type="button" @click="downloadPdf"
              class="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 shadow">
              Descargar informe (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Dominios visuales -->
    <section class="px-4 py-4 pb-20 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-rose-50 to-emerald-50">
        <div class="flex items-center justify-between gap-4 py-2 md:py-3">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Tus dominios</h2>
          <div class="hidden sm:flex items-center gap-2">
            <div class="p-[1.5px] rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-rose-500 hover:to-amber-500 transition-colors shadow-[0_2px_10px_rgba(0,0,0,.06)]">
              <button
                class="inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-2xl bg-white text-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-rose-300"
                @click="scrollDomains(-1)" aria-label="Desplazar a la izquierda" title="Anterior">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                  <path d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            </div>
            <div class="p-[1.5px] rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-rose-500 hover:to-amber-500 transition-colors shadow-[0_2px_10px_rgba(0,0,0,.06)]">
              <button
                class="inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-2xl bg-white text-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-rose-300"
                @click="scrollDomains(1)" aria-label="Desplazar a la derecha" title="Siguiente">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                  <path d="M8.25 4.5L15.75 12l-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-4 overflow-x-auto domains-strip scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] px-1 sm:px-2"
          style="scrollbar-width: none;">
          <div class="flex gap-5 min-w-full">
            <article v-for="(c, index) in catBreakdown" :key="c.key"
              class="group relative w-[92%] sm:w-[520px] shrink-0 overflow-hidden rounded-3xl p-0 shadow-sm bg-gradient-to-br"
              :class="domainBgClass(c.key)">
              <!-- Portada -->
              <div class="relative h-40 sm:h-56">
                <img :src="domainImage(c.key)" alt="" class="absolute inset-0 h-full w-full object-cover opacity-60" />
                <div class="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent"></div>
                <!-- Indicador de posición -->
                <div class="absolute top-3 right-3">
                  <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/80 text-xs font-bold text-gray-700">
                    {{ index + 1 }}/{{ catBreakdown.length }}
                  </span>
                </div>
                <div class="relative h-full w-full p-5 flex items-end justify-between">
                  <div class="min-w-0">
                    <h3 class="text-2xl font-extrabold text-gray-900 tracking-tight">{{ c.label }}</h3>
                    <p class="mt-1 text-sm text-gray-700 max-w-md">{{ explanationFor(c) }}</p>
                  </div>
                  <div class="text-right">
                    <span
                      class="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-sm font-bold bg-white/80 ring-1 ring-inset cursor-help"
                      :class="badgeClass(c)"
                      :title="`${c.label}: ${c.percent}% de bienestar${c.orientation === 'negative' ? ' (menos síntomas = más bienestar)' : ' (más síntomas = menos bienestar)'}`">
                      <span class="select-none">{{ domainEmoji(c.key) }}</span>
                      <span>{{ c.percent }}%</span>
                    </span>
                                         <!-- Indicador de estado con tooltip -->
                     <div class="mt-1 flex items-center justify-end gap-1">
                       <span class="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium"
                             :class="{
                               'bg-emerald-100 text-emerald-800': (c.key === 'animo' && c.percent > 50) || (c.orientation === 'positive' && c.percent >= 67) || (c.orientation === 'negative' && c.percent <= 20),
                               'bg-purple-100 text-purple-800': (c.key === 'animo' && c.percent > 20 && c.percent <= 50) || (c.orientation === 'positive' && c.percent >= 34 && c.percent < 67) || (c.orientation === 'negative' && c.percent > 20 && c.percent <= 40),
                               'bg-rose-100 text-rose-800': (c.key === 'animo' && c.percent <= 20) || (c.orientation === 'positive' && c.percent < 34) || (c.orientation === 'negative' && c.percent > 40)
                             }"
                                                          :title="`Estado: ${((c.key === 'animo' && c.percent > 50) || (c.orientation === 'positive' && c.percent >= 67) || (c.orientation === 'negative' && c.percent <= 20)) ? 'Excelente' : ((c.key === 'animo' && c.percent > 20) || (c.orientation === 'positive' && c.percent >= 34) || (c.orientation === 'negative' && c.percent <= 40)) ? 'Aceptable' : 'Necesita atención'}`">
                          {{ ((c.key === 'animo' && c.percent > 50) || (c.orientation === 'positive' && c.percent >= 67) || (c.orientation === 'negative' && c.percent <= 20)) ? '😊 Excelente' : ((c.key === 'animo' && c.percent > 20) || (c.orientation === 'positive' && c.percent >= 34) || (c.orientation === 'negative' && c.percent <= 20)) ? '😐 Aceptable' : '☹️ Atención' }}
                       </span>
                     </div>
                    <div v-if="c.overriddenByDeep" class="mt-1 text-[11px] text-gray-600">
                      <span>General: {{ c.baselineWellbeingPercent }}% · Saber más: {{ c.deepWellbeingPercent }}%</span>
                    </div>
                    <!-- Comparación visual de evolución -->
                    <div v-if="c.overriddenByDeep" class="mt-2 p-2 bg-white/60 rounded-lg border border-gray-200">
                      <div class="flex items-center justify-between text-xs mb-1">
                        <span class="font-medium text-gray-600">Evolución</span>
                        <span class="font-bold" :class="{
                          'text-emerald-600': c.percent > c.baselineWellbeingPercent,
                          'text-rose-600': c.percent < c.baselineWellbeingPercent,
                          'text-gray-600': c.percent === c.baselineWellbeingPercent
                        }">
                          {{ c.percent > c.baselineWellbeingPercent ? '↗️ Mejoró' : 
                             c.percent < c.baselineWellbeingPercent ? '↘️ Empeoró' : '→ Sin cambios' }}
                        </span>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="flex-1">
                          <div class="text-[10px] text-gray-500 mb-1">General</div>
                          <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="h-full rounded-full bg-gray-400 transition-all duration-300"
                                 :style="{ width: c.baselineWellbeingPercent + '%' }">
                            </div>
                          </div>
                        </div>
                        <div class="text-gray-400">→</div>
                                                 <div class="flex-1">
                           <div class="text-[10px] text-gray-500 mb-1">Saber más</div>
                           <div class="w-full bg-gray-200 rounded-full h-2">
                             <div class="h-full rounded-full transition-all duration-300"
                                  :class="{
                                    'bg-emerald-500': (c.key === 'animo' && c.percent > 50) || (c.orientation === 'positive' && c.percent >= 67) || (c.orientation === 'negative' && c.percent <= 20),
                                    'bg-purple-500': (c.key === 'animo' && c.percent > 20 && c.percent <= 50) || (c.orientation === 'positive' && c.percent >= 34 && c.percent < 67) || (c.orientation === 'negative' && c.percent > 20 && c.percent <= 40),
                                    'bg-rose-500': (c.key === 'animo' && c.percent <= 20) || (c.orientation === 'positive' && c.percent < 34) || (c.orientation === 'negative' && c.percent > 40)
                                  }"
                                  :style="{ width: c.percent + '%' }">
                             </div>
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Cuerpo -->
              <div class="p-5">
                <!-- Barra de progreso visual -->
                <div class="mb-4">
                  <div class="flex items-center justify-between text-sm mb-2">
                    <span class="font-medium text-gray-700">Bienestar</span>
                                         <span class="font-bold" :class="{
                       'text-emerald-600': (c.key === 'animo' && c.percent > 50) || (c.orientation === 'positive' && c.percent >= 67) || (c.orientation === 'negative' && c.percent <= 20),
                       'text-purple-600': (c.key === 'animo' && c.percent > 20 && c.percent <= 50) || (c.orientation === 'positive' && c.percent >= 34 && c.percent < 67) || (c.orientation === 'negative' && c.percent > 20 && c.percent <= 40),
                       'text-rose-600': (c.key === 'animo' && c.percent <= 20) || (c.orientation === 'positive' && c.percent < 34) || (c.orientation === 'negative' && c.percent > 40)
                     }">{{ c.percent }}%</span>
                  </div>
                  <h2 class="text-sm font-medium text-gray-700">{{c.percent }} {{c.key}} {{c.orientation}} foty</h2>
                  <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                         <div class="h-full rounded-full transition-all duration-500 ease-out"
                          :class="{
                            'bg-emerald-500': (c.key === 'animo' && c.percent > 50) || (c.orientation === 'positive' && c.percent >= 67) || (c.orientation === 'negative' && c.percent <= 20),
                            'bg-purple-500': (c.key === 'animo' && c.percent > 20 && c.percent <= 50) || (c.orientation === 'positive' && c.percent >= 34 && c.percent < 67) || (c.orientation === 'negative' && c.percent > 20 && c.percent <= 40),
                            'bg-rose-500': (c.key === 'animo' && c.percent <= 20) || (c.orientation === 'positive' && c.percent < 34) || (c.orientation === 'negative' && c.percent > 40)
                          }"
                          :style="{ width: c.percent + '%' }">
                    </div>
                  </div>
                                     <!-- Indicadores de umbral -->
                   <div class="flex justify-between text-xs text-gray-500 mt-1">
                     <span>0%</span>
                     <span v-if="c.key === 'animo'">20%</span>
                     <span v-else-if="c.orientation === 'negative'">20%</span>
                     <span v-else>34%</span>
                     <span v-if="c.key === 'animo'">50%</span>
                     <span v-else-if="c.orientation === 'negative'">40%</span>
                     <span v-else>67%</span>
                     <span>100%</span>
                   </div>
                </div>
                
                <div class="mt-4">
                  <div class="flex items-center gap-2 flex-wrap">
                    <!-- Botón de explicación rápida -->
                    <button @click="openExplain(c)" 
                            class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-100 transition-colors"
                            :title="`Explicar cómo se calcula el ${c.percent}% de bienestar en ${c.label}`">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                        <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z"/>
                      </svg>
                      Explicar
                    </button>
                    
                    <template v-if="isDomainRed(c)">
                      <span class="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-700 ring-1 ring-inset ring-rose-200">Dominio vulnerable</span>
                      <router-link v-if="c.deepWellbeingPercent === undefined" :to="domainActionTarget(c)"
                        class="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-700 ring-1 ring-inset ring-rose-200 hover:bg-rose-50">
                        {{ domainLearnMoreCta(c) }}
                      </router-link>
                    </template>
                    <template v-else>
                      <span class="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">Dominio en buen estado</span>
                    </template>
                    <router-link v-if="c.deepResultId" :to="{ name: 'domain-summary', params: { domain: c.key }, query: { resultId: c.deepResultId, fromResultId: resultado?.id || undefined } }"
                      class="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
                      Ver diagnóstico
                    </router-link>
                  </div>
                </div>
              </div>
            </article>
          </div>

        </div>
        
        <!-- Puntos indicadores del carrusel -->
        <div class="mt-6 flex justify-center">
          <div class="flex items-center gap-2">
            <button v-for="(c, index) in catBreakdown" :key="index"
                    @click="goDomain(index)"
                    class="w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    :class="{
                      'bg-amber-500 scale-110': domainCurrent === index,
                      'bg-gray-300 hover:bg-gray-400': domainCurrent !== index
                    }"
                    :aria-label="`Ir al dominio ${c.label} (${index + 1} de ${catBreakdown.length})`"
                    :title="`Ver ${c.label}`">
            </button>
          </div>
        </div>
      </section>

      <!-- Modal explicación porcentajes -->
      <div v-if="explainOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40" @click="closeExplain"></div>
        <div class="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-lg md:text-xl font-bold text-gray-900">Cómo interpretamos estos porcentajes</h3>
            <button type="button" @click="closeExplain" class="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100" aria-label="Cerrar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12l-5.775 5.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 1 0-1.414-1.414L12 10.586 6.225 4.811Z"/></svg>
            </button>
          </div>
          <div class="mt-4 space-y-2 text-sm text-gray-800">
            <div>
              <span class="font-semibold">Dominio:</span>
              <span>{{ explainDomain?.label }}</span>
            </div>
            <div>
              <span class="font-semibold">General:</span>
              <span>{{ explainDomain?.baselineWellbeingPercent }}% bienestar</span>
            </div>
            <div v-if="explainDomain?.deepWellbeingPercent !== undefined">
              <span class="font-semibold">Tras saber más:</span>
              <span>{{ explainDomain?.deepWellbeingPercent }}% bienestar</span>
            </div>
            <div class="pt-2 text-xs text-gray-600">
              Fórmula bienestar general =
              <template v-if="explainDomain?.key==='animo'">100 − ( (ánimo + anhedonia) / 6 × 100 )</template>
              <template v-else-if="explainDomain?.key==='ansiedad'">100 − ( (ansiedad + ansiedad_control + ansiedad_tension) / 6 × 100 )</template>
              <template v-else-if="explainDomain?.key==='bienestar_fisico'">100 − ( (bienestar_fisico + sueño + energía) / 6 × 100 )</template>
              <template v-else>100 − ( (impacto) / 3 × 100 )</template>
            </div>
            <div v-if="explainDomain?.deepWellbeingPercent !== undefined" class="text-xs text-gray-600">
              Fórmula bienestar “Saber más” = 100 − ( total_dom / 45 × 100 )
              <span v-if="typeof explainDomain?.deepTotal==='number'"> (total_dom = {{ explainDomain?.deepTotal }})</span>
            </div>
            <div>
              <span class="font-semibold">Situación actual:</span>
              <span>
                <template v-if="Number(explainDomain?.finalWellbeingPercent) >= 67">buen estado</template>
                <template v-else-if="Number(explainDomain?.finalWellbeingPercent) >= 34">estado medio</template>
                <template v-else>vulnerable</template>
                ({{ explainDomain?.orientation === 'negative' ? (100 - Number(explainDomain?.finalWellbeingPercent)) + '% señales' : Number(explainDomain?.finalWellbeingPercent) + '% bienestar' }})
              </span>
            </div>
          </div>
          <div class="mt-5 flex justify-end">
            <button type="button" @click="closeExplain" class="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset ring-gray-200 hover:bg-gray-50">Cerrar</button>
          </div>
        </div>
      </div>

    <!-- Estados de carga/errores -->
    <p v-if="cargando" class="mt-8 h-40 w-full animate-pulse rounded-2xl bg-gray-200/70"></p>
    <p v-else-if="error" class="mt-8 text-sm font-medium text-red-600">{{ error }}</p>

    
    <div v-else-if="resultado" class=" space-y-12">
      <!-- Interpretación sin carrusel: todo visible -->
      <section>
        <!--<h2 class="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          <span class="bg-gradient-to-r from-amber-600 via-rose-500 to-emerald-600 bg-clip-text text-transparent">Cómo interpretar tus resultados</span>
        </h2>-->

        <!-- Portada full width (intro) 
        <div id="intro" class="-mx-4 sm:-mx-6 lg:-mx-8">
          <div class="relative h-64 md:h-80 lg:h-96 overflow-hidden">
            <img src="@/assets/fondo.jpg" alt="Portada bienestar" class="absolute inset-0 h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
            <div class="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div class="max-w-3xl">
                <h3 class="text-3xl md:text-5xl font-extrabold tracking-tight text-white">Tu bienestar, en una mirada
                </h3>
                <div class="mt-4">
                  <div class="  px-4 py-3 text-white text-sm md:text-base font-light">
                    <span class="text-xl">7 preguntas (0–3 por pregunta, puntuación 0–21) <br> Una guía amable para conocerte mejor y cuidar tus hábitos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>-->
        
        <div class="relative overflow-hidden ring-1 ring-gray-200">
          <!-- Fondo zen -->
          <div class="absolute inset-0">
            <div class="h-full w-full bg-gradient-to-br from-amber-50 via-rose-50 to-emerald-50"></div>
            <div class="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl">
            </div>
            <div
              class="pointer-events-none absolute -bottom-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-rose-200/40 blur-3xl">
            </div>
            <div
              class="pointer-events-none absolute -top-10 -right-16 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl">
            </div>
          </div>
          <div class="relative p-6 md:p-10 space-y-6">
            <!-- Puntuación card -->
            <div id="puntuacion" class="rounded-2xl bg-white/95 ring-1 ring-gray-200 shadow-sm p-6 md:p-7">
              <h3 class="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">¿Cómo entender tu puntuación?</h3>
              <p class="mt-3 text-lg md:text-xl text-gray-800">Usa el rango para orientarte. Si
                la puntuación es alta, prioriza pedir ayuda profesional.</p>
              <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div class="rounded-xl bg-emerald-50 ring-1 ring-emerald-200 p-4 text-center">
                  <div class="text-3xl">😊</div>
                  <div class="mt-1 text-base md:text-lg font-semibold text-emerald-900">0–4</div>
                  <p class="text-sm text-emerald-800/80">Muy baja</p>
                </div>
                <div class="rounded-xl bg-emerald-100 ring-1 ring-emerald-300 p-4 text-center">
                  <div class="text-3xl">🙂</div>
                  <div class="mt-1 text-base md:text-lg font-semibold text-emerald-900">5–9</div>
                  <p class="text-sm text-emerald-900/80">Leve</p>
                </div>
                <div class="rounded-xl bg-amber-100 ring-1 ring-amber-300 p-4 text-center">
                  <div class="text-3xl">😐</div>
                  <div class="mt-1 text-base md:text-lg font-semibold text-amber-900">10–14</div>
                  <p class="text-sm text-amber-900/80">Moderada</p>
                </div>
                <div class="rounded-xl bg-rose-100 ring-1 ring-rose-300 p-4 text-center">
                  <div class="text-3xl">☹️</div>
                  <div class="mt-1 text-base md:text-lg font-semibold text-rose-900">15–21</div>
                  <p class="text-sm text-rose-900/80">Alta</p>
                </div>
              </div>
            </div>
            <!-- Dominios card -->
            <div id="dominios" class="rounded-2xl bg-white/95 ring-1 ring-gray-200 shadow-sm p-6 md:p-7">
              <h3 class="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">¿Qué mide cada dominio?</h3>
              <div class="mt-4 grid gap-5 sm:grid-cols-2 md:gap-6">
                <div class="rounded-3xl ring-1 ring-amber-100 bg-amber-50/90 p-5 md:p-6">
                  <div class="flex items-center gap-3">
                    <span
                      class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-200 text-amber-800 text-3xl">🙂</span>
                    <h4 class="text-2xl md:text-3xl font-extrabold text-gray-900">Ánimo</h4>
                  </div>
                  <p class="mt-3 text-lg md:text-xl text-gray-800">Estado de ánimo bajo y pérdida de interés.</p>
                </div>
                <div class="rounded-3xl ring-1 ring-rose-100 bg-rose-50/90 p-5 md:p-6">
                  <div class="flex items-center gap-3">
                    <span
                      class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-200 text-rose-800 text-3xl">⚡</span>
                    <h4 class="text-2xl md:text-3xl font-extrabold text-gray-900">Ansiedad</h4>
                  </div>
                  <p class="mt-3 text-lg md:text-xl text-gray-800">Preocupación constante, tensión o nerviosismo.</p>
                </div>
                <div class="rounded-3xl ring-1 ring-emerald-100 bg-emerald-50/90 p-5 md:p-6">
                  <div class="flex items-center gap-3">
                    <span
                      class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-200 text-emerald-800 text-3xl">🌙</span>
                    <h4 class="text-2xl md:text-3xl font-extrabold text-gray-900">Bienestar físico</h4>
                  </div>
                  <p class="mt-3 text-lg md:text-xl text-gray-800">Sueño y energía: descanso, cansancio o fatiga.</p>
                </div>
                <div class="rounded-3xl ring-1 ring-purple-100 bg-purple-50/90 p-5 md:p-6">
                  <div class="flex items-center gap-3">
                    <span
                      class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-200 text-purple-800 text-3xl">🎯</span>
                    <h4 class="text-2xl md:text-3xl font-extrabold text-gray-900">Impacto</h4>
                  </div>
                  <p class="mt-3 text-lg md:text-xl text-gray-800">Cómo afecta a estudios/trabajo, familia y tareas.</p>
                </div>
              </div>
            </div>

            <!-- Nota card -->
            <div id="nota" class="rounded-2xl bg-white/95 ring-1 ring-gray-200 shadow-sm p-6 md:p-7">
              <h3 class="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">Recuerda</h3>
              <p class="mt-3 text-lg md:text-xl text-gray-800">Este resultado es orientativo, no un diagnóstico. Revisa
                recursos y considera hablar con un profesional si lo ves necesario. Explora <router-link to="/ayuda"
                  class="font-semibold text-rose-700 hover:text-rose-800">Recursos de apoyo</router-link>.</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>

    <div v-else class="mt-8 text-sm text-gray-700">
      <p>No hay datos para mostrar.</p>
      <router-link :to="{ name: 'results' }" class="font-semibold text-rose-700 hover:text-rose-800">Ir a Mis
        resultados</router-link>
    </div>
  </section>
</template>

<style scoped>
/* Estilos mínimos, Tailwind se encarga del diseño */
/* Transición fade-in hacia la derecha */
.fade-right-enter-active,
.fade-right-leave-active {
  transition: all 220ms ease;
}

.fade-right-enter-from {
  opacity: 0;
  transform: translateX(8px);
}

.fade-right-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
