<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

import { guardarMensajeContacto, enviarCorreoContacto } from '@/services/db'

export default {
  name: 'ContactView',
  setup() {
    const toast = useToast()
    const route = useRoute()
    // Video config (puedes cambiar el ID por una entrevista en español)
    // Video por defecto (español): https://youtu.be/_9agX3gY1jU
    const videoId = ref(route.query.vid || '_9agX3gY1jU') // puedes pasar ?vid=ID
    const startSeconds = ref(Number(route.query.start) || 75) // segundo destacado por defecto; override con ?start=seg
    const playerEl = ref(null)
    let ytPlayer = null
    const ready = ref(false)
    const muted = ref(true)
    const nombre = ref('')
    const email = ref('')
    const motivo = ref('')
    const mensaje = ref('')
    const enviando = ref(false)

    const motivos = [
      'Consulta',
      'Sugerencia',
      'Soporte',
      'Colaboración',
    ]

    const validarEmail = (v) => /.+@.+\..+/.test(v)

    const enviar = async () => {
      if (!nombre.value.trim() || !validarEmail(email.value) || !mensaje.value.trim()) {
        toast.warning('Revisa que el nombre, correo y mensaje sean válidos')
        return false
      }
      try {
        enviando.value = true
        await guardarMensajeContacto({
          nombre: nombre.value.trim(),
          email: email.value.trim(),
          motivo: motivo.value || 'Consulta',
          mensaje: mensaje.value.trim(),
        })
        // Enviar correo con HTML a 4tucode@gmail.com usando la colección 'mail' (Extensión Firebase Trigger Email)
        await enviarCorreoContacto({
          nombre: nombre.value.trim(),
          email: email.value.trim(),
          motivo: motivo.value || 'Consulta',
          mensaje: mensaje.value.trim(),
        })
        toast.success('¡Mensaje enviado! Te responderemos lo antes posible')
        nombre.value = ''
        email.value = ''
        motivo.value = ''
        mensaje.value = ''
        return true
      } catch (e) {
        console.error(e)
        toast.error('No se pudo enviar el mensaje. Inténtalo de nuevo')
        return false
      } finally {
        enviando.value = false
      }
    }

    const loadYouTubeAPI = () => new Promise((resolve) => {
      if (window.YT && window.YT.Player) { resolve(window.YT); return }
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
      const previous = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (previous) previous()
        resolve(window.YT)
      }
    })

    const initPlayer = async () => {
      const YT = await loadYouTubeAPI()
      ytPlayer = new YT.Player(playerEl.value, {
        width: '100%', height: '100%',
        videoId: videoId.value,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 1,
          mute: 1, // autoplay fiable
          controls: 0,
          rel: 0,
          modestbranding: 1,
          start: startSeconds.value,
          loop: 1,
          playlist: videoId.value,
          playsinline: 1
        },
        events: {
          onReady: () => { ready.value = true },
        }
      })
    }

    const activarSonido = () => {
      if (!ytPlayer) return
      try {
        ytPlayer.unMute()
        ytPlayer.setVolume(55)
        ytPlayer.playVideo()
        muted.value = false
      } catch (e) { /* noop */ }
    }

    onMounted(() => { initPlayer() })

    return { nombre, email, motivo, motivos, mensaje, enviando, enviar, playerEl, ready, muted, activarSonido }
  }
}
</script>

<template>
  <section class="mx-auto max-w-7xl pb-16 sm:pb-24 bg-gradient-to-b from-[#f9aaff] via-[#fcedd0] to-[#ffe6f2]">
    <!-- Hero fullwidth -->
    <div class="relative isolate">
      <img
        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1920&auto=format&fit=crop"
        alt="Personas conectando"
        class="h-64 sm:h-80 md:h-[22rem] w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      <div class="absolute inset-0 flex items-end sm:items-center">
        <div class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow">
            Conversemos: tu bienestar importa
          </h1>
          <p class="mt-2 max-w-2xl text-sm sm:text-base text-white/90">
            Escríbenos y te acompañamos en el proceso. Estamos aquí para ayudarte a dar el siguiente paso.
          </p>
        </div>
      </div>
    </div>

    <!-- Contenido -->
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-10">
      <div class="grid gap-6 md:grid-cols-5">
        <!-- Card izquierda con imagen y copy -->
        <div class="md:col-span-2 rounded-2xl overflow-hidden border border-gray-200 bg-white/80 backdrop-blur shadow-sm">
          <div class="relative h-40 sm:h-52 bg-black" role="region" aria-label="Video de presentación">
            <div ref="playerEl" class="absolute inset-0 h-full w-full"></div>
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <button
              v-if="ready && muted"
              @click="activarSonido"
              class="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow hover:bg-white"
            >Activar sonido</button>
          </div>
          <div class="p-5">
            <h2 class="text-lg font-semibold text-gray-900">Estamos a un mensaje</h2>
            <p class="mt-1 text-sm text-gray-700">Cuéntanos qué necesitas. Te responderemos con recursos y una guía clara para seguir avanzando.</p>
            <ul class="mt-3 space-y-2 text-sm text-gray-700">
              <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span> Respuestas cercanas y humanas</li>
              <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 rounded-full bg-purple-500"></span> Recursos adecuados a tu situación</li>
              <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 rounded-full bg-rose-500"></span> Seguimiento si lo necesitas</li>
            </ul>
          </div>
        </div>

        <!-- Formulario -->
        <div class="md:col-span-3 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur shadow-sm p-6">
          <form @submit.prevent="enviar" class="space-y-5">
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="block text-xs font-semibold text-gray-700">Nombre</label>
                <div class="relative mt-1">
                  <input v-model="nombre" type="text" required
                    class="peer w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2.5 shadow-sm outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-300/20 placeholder:text-gray-400"
                    placeholder="Tu nombre"/>
                  <span class="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-gray-300 peer-focus:text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5Z"/></svg>
                  </span>
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700">Correo electrónico</label>
                <div class="relative mt-1">
                  <input v-model="email" type="email" required
                    class="peer w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2.5 shadow-sm outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-300/20 placeholder:text-gray-400" placeholder="tu@email.com"/>
                  <span class="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-gray-300 peer-focus:text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.35l-10 6.25L2 6.35V6Zm0 2.55v9.45a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.55l-10 6.25L2 8.55Z"/></svg>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700">Motivo</label>
              <div class="relative mt-1">
                <select v-model="motivo"
                  class="w-full appearance-none rounded-xl border border-gray-200 bg-white/80 px-3 py-2.5 pr-9 shadow-sm outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-300/20">
                  <option value="">Selecciona un motivo</option>
                  <option v-for="m in motivos" :key="m" :value="m">{{ m }}</option>
                </select>
                <span class="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-gray-300 peer-focus:text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5H7z"/></svg>
                </span>
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700">Mensaje</label>
              <textarea v-model="mensaje" required rows="6"
                class="mt-1 w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2.5 shadow-sm outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-300/20 placeholder:text-gray-400" placeholder="Cuéntanos en qué podemos ayudarte"></textarea>
            </div>

            <div class="flex items-center justify-between">
              <p class="text-xs text-gray-500">Respondemos en menos de 48h laborales.</p>
              <button type="submit" :disabled="enviando"
                class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-800 to-purple-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50">
                <svg v-if="enviando" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="4" class="opacity-20"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-width="4" class="opacity-80"></path></svg>
                <span>{{ enviando ? 'Enviando…' : 'Enviar' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

