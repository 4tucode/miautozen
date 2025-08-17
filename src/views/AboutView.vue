<template>
  <section class="relative">
    <div class="absolute inset-0 -z-10 thai-pattern"></div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <header class="text-center mb-12">
        <div class="flex items-center justify-center gap-3">
          <span class="inline-block h-1 w-12 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500"></span>
          <h1 class="font-kanit text-3xl sm:text-4xl font-semibold tracking-wide text-gray-900">Sobre Miautozen</h1>
          <span class="inline-block h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500"></span>
        </div>
        <p class="mt-4 text-gray-600 max-w-2xl mx-auto">Un espacio sereno donde la evidencia y la empatía se encuentran para cuidar tu bienestar emocional.</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- Creadora -->
        <article class="lg:col-span-1 bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
          <div class="flex flex-col items-center text-center">
            <img :src="creatorPhoto" alt="Foto de Ana Santoro" class="h-28 w-28 rounded-full ring-4 ring-amber-100 object-cover" />
            <h2 class="font-kanit mt-4 text-2xl font-semibold text-gray-900">Ana Santoro</h2>
            <p class="text-emerald-700 font-medium">Fundadora de Miautozen • Psicóloga Sanitaria</p>
            <p class="text-gray-600 mt-3">
              Psicóloga especializada en ansiedad, estrés académico y burnout. Después de trabajar con estudiantes y
              equipos en organizaciones, creó Miautozen para acercar autoevaluaciones y recursos prácticos que ayuden a
              tomar decisiones informadas y a cultivar hábitos que protegen la salud mental.
            </p>

            <div class="mt-6 flex items-center gap-3">
              <a :href="links.youtube" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium text-amber-800 bg-amber-50 border-amber-200 hover:shadow transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M23.498 6.186a3.004 3.004 0 00-2.116-2.127C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.382.559A3.004 3.004 0 00.502 6.186C0 8.058 0 12 0 12s0 3.942.502 5.814a3.004 3.004 0 002.116 2.127C4.48 20.5 12 20.5 12 20.5s7.52 0 9.382-.559a3.004 3.004 0 002.116-2.127C24 15.942 24 12 24 12s0-3.942-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z"/></svg>
                YouTube
              </a>
              <a :href="links.instagram" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium text-rose-700 bg-rose-50 border-rose-200 hover:shadow transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm12 1a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
                Instagram
              </a>
              <a :href="links.linkedin" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium text-sky-700 bg-sky-50 border-sky-200 hover:shadow transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v15H0V8zm7.5 0h4.8v2.05h.07c.67-1.27 2.3-2.6 4.73-2.6C21.4 7.45 24 9.62 24 14.02V23H19v-8.03c0-1.91-.03-4.37-2.66-4.37-2.66 0-3.07 2.08-3.07 4.23V23H7.5V8z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>

          <dl class="mt-6 divide-y divide-gray-100 text-sm text-gray-700">
            <div class="flex justify-between py-2">
              <dt class="text-gray-500">Ubicación</dt>
              <dd>Madrid, España</dd>
            </div>
            <div class="flex justify-between py-2">
              <dt class="text-gray-500">Especialidad</dt>
              <dd>Ansiedad, estrés académico y burnout</dd>
            </div>
            <div class="flex justify-between py-2">
              <dt class="text-gray-500">Contacto</dt>
              <dd><a href="mailto:hola@miautozen.com" class="text-emerald-700 hover:underline">hola@miautozen.com</a></dd>
            </div>
          </dl>
        </article>

        <!-- Razón de ser -->
        <article class="lg:col-span-2 bg-white/90 backdrop-blur rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
          <h2 class="font-kanit text-2xl font-semibold text-gray-900">Nuestra razón de ser</h2>
          <p class="mt-3 text-gray-700">
            Nacimos para responder, con ciencia y cercanía, a una realidad que estudiantes y profesionales viven cada día:
            el aumento sostenido de problemas de salud mental. Nuestro propósito es ofrecer autoevaluaciones claras,
            recursos prácticos y orientación para que puedas cuidarte mejor.
          </p>

          <ul class="mt-6 space-y-4">
            <li class="flex items-start gap-3">
              <span class="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <p class="text-gray-700">
                En educación superior, hasta el 50% del alumnado presenta problemas de salud mental y el 15% ha tenido
                ideas suicidas. Fuente: <a href="https://www.iesalc.unesco.org/2024/10/09/nuevo-informe-apoyando-la-salud-mental-de-los-estudiantes-de-educacion-superior/" target="_blank" rel="noopener noreferrer" class="text-emerald-700 hover:underline">UNESCO IESALC (2024)</a>.
              </p>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-2 h-2.5 w-2.5 rounded-full bg-amber-500"></span>
              <p class="text-gray-700">
                En España, las bajas laborales por motivos de salud mental han crecido de forma notable desde la
                pandemia, afectando especialmente a sanidad y educación. Fuente: <a href="https://elpais.com/sociedad/2025-05-03/las-bajas-laborales-por-salud-mental-no-paran-de-crecer-sanidad-y-educacion-los-sectores-mas-afectados.html" target="_blank" rel="noopener noreferrer" class="text-emerald-700 hover:underline">El País (2025)</a>.
              </p>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-2 h-2.5 w-2.5 rounded-full bg-purple-500"></span>
              <p class="text-gray-700">
                Casi la mitad del alumnado universitario en España presenta síntomas de depresión y ansiedad. Fuente: <a href="https://elpais.com/extra/formacion/2024-09-08/alertas-por-la-salud-mental-del-alumnado.html" target="_blank" rel="noopener noreferrer" class="text-emerald-700 hover:underline">El País (2024)</a>.
              </p>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-2 h-2.5 w-2.5 rounded-full bg-rose-500"></span>
              <p class="text-gray-700">
                Entre el profesorado, informes regionales han detectado niveles elevados de ansiedad (p. ej., 63% en Murcia). Fuente: <a href="https://cadenaser.com/murcia/2024/11/20/seis-de-cada-diez-profesores-de-la-region-tiene-problemas-de-ansiedad-segun-un-estudio-de-anpe-radio-murcia/" target="_blank" rel="noopener noreferrer" class="text-emerald-700 hover:underline">Cadena SER (2024)</a>.
              </p>
            </li>
          </ul>

          <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
              <p class="font-kanit text-3xl text-amber-700">50%</p>
              <p class="text-sm text-amber-900/80">Alumnado con síntomas</p>
            </div>
            <div class="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <p class="font-kanit text-3xl text-emerald-700">63%</p>
              <p class="text-sm text-emerald-900/80">Docentes con ansiedad (Murcia)</p>
            </div>
            <div class="rounded-xl border border-purple-100 bg-purple-50/60 p-4">
              <p class="font-kanit text-3xl text-purple-700">+72%</p>
              <p class="text-sm text-purple-900/80">Bajas por salud mental</p>
            </div>
          </div>

          <p class="mt-6 text-sm text-gray-600">
            Nuestro estilo visual se inspira en el diseño tailandés moderno: colores cálidos (ámbar, jade), formas
            geométricas sutiles y tipografía elegante para una lectura calmada.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import creatorPhoto from '@/assets/fortu.jpeg'

export default {
  name: 'AboutView',
  data() {
    return {
      creatorPhoto,
      links: {
        youtube: 'https://www.youtube.com/@anasantoro.mente',
        instagram: 'https://www.instagram.com/ana.santoro.mente',
        linkedin: 'https://www.linkedin.com/in/ana-santoro-mente'
      }
    }
  }
}
</script>

<style scoped>
.font-kanit {
  font-family: 'Kanit', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

.thai-pattern {
  background-image:
    radial-gradient(120px 60px at 10% 10%, rgba(251, 191, 36, 0.06), transparent 70%),
    radial-gradient(120px 60px at 90% 20%, rgba(5, 150, 105, 0.06), transparent 70%),
    radial-gradient(120px 60px at 20% 80%, rgba(139, 92, 246, 0.06), transparent 70%),
    linear-gradient(135deg, rgba(251, 191, 36, 0.04), rgba(16, 185, 129, 0.04));
}
</style>

