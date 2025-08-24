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

    <!-- Contenido principal -->
    <section class="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header con navegación -->
      <header class="mb-8">
        <nav class="mb-6">
          <router-link 
            to="/" 
            class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Volver al inicio
          </router-link>
        </nav>

        <!-- Título principal -->
        <div class="text-center mb-8">
          <h1 class="text-4xl sm:text-5xl font-bold leading-tight">
            <span class="bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">
              Términos y Condiciones
            </span>
          </h1>
          <p class="mt-3 text-lg text-gray-600">Última versión: v1.0</p>
        </div>

        <!-- Badge de estado -->
        <div class="flex justify-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200">
            <div class="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            <span class="text-sm font-medium text-emerald-700">Documento legal actualizado</span>
          </div>
        </div>
      </header>

      <!-- Contenido de términos -->
      <div class="space-y-8">
        <!-- Sección 1: Identidad -->
        <div class="group">
          <div class="bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center">
                <span class="text-purple-600 font-bold text-lg">1</span>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 mb-3">Identidad del responsable</h2>
                <p class="text-gray-700 leading-relaxed">
                  Responsable: <strong class="text-gray-900">[Nombre/Razón Social]</strong> · 
                  NIF: <strong class="text-gray-900">[NIF]</strong> · 
                  Dirección: <strong class="text-gray-900">[Dirección completa]</strong> · 
                  Email: <strong class="text-gray-900">[Email de contacto]</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección 2: Objeto del servicio -->
        <div class="group">
          <div class="bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                <span class="text-blue-600 font-bold text-lg">2</span>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 mb-3">Objeto del servicio</h2>
                <p class="text-gray-700 leading-relaxed">
                  La aplicación <strong class="text-purple-600">"MiautoZen"</strong> ofrece autoevaluaciones orientativas de bienestar. 
                  <span class="font-semibold text-amber-700">No es una herramienta sanitaria ni sustituye atención médica o psicológica profesional.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección 3: Registro y cuenta -->
        <div class="group">
          <div class="bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-100 to-emerald-200 flex items-center justify-center">
                <span class="text-emerald-600 font-bold text-lg">3</span>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 mb-3">Registro y cuenta</h2>
                <p class="text-gray-700 leading-relaxed">
                  El usuario se compromete a aportar información veraz y a mantener su contraseña segura. 
                  La cuenta puede ser suspendida ante usos contrarios a estos términos o a la legalidad vigente.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección 4: Licencia de uso -->
        <div class="group">
          <div class="bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-orange-100 to-orange-200 flex items-center justify-center">
                <span class="text-orange-600 font-bold text-lg">4</span>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 mb-3">Licencia de uso</h2>
                <p class="text-gray-700 leading-relaxed">
                  Se concede una licencia no exclusiva, intransferible y revocable de uso personal. 
                  Queda prohibido el uso comercial no autorizado.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección 5: Conducta del usuario -->
        <div class="group">
          <div class="bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-rose-100 to-rose-200 flex items-center justify-center">
                <span class="text-rose-600 font-bold text-lg">5</span>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 mb-3">Conducta del usuario</h2>
                <p class="text-gray-700 leading-relaxed">
                  El usuario se compromete a no realizar actividades ilícitas, difamatorias, que vulneren derechos de terceros 
                  o que afecten a la disponibilidad del servicio.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección 6: Disponibilidad y modificaciones -->
        <div class="group">
          <div class="bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 flex items-center justify-center">
                <span class="text-indigo-600 font-bold text-lg">6</span>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 mb-3">Disponibilidad y modificaciones</h2>
                <p class="text-gray-700 leading-relaxed">
                  Nos reservamos el derecho a modificar, suspender o interrumpir la aplicación, 
                  previo aviso cuando sea razonable.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección 7: Limitación de responsabilidad -->
        <div class="group">
          <div class="bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 flex items-center justify-center">
                <span class="text-amber-600 font-bold text-lg">7</span>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 mb-3">Limitación de responsabilidad</h2>
                <p class="text-gray-700 leading-relaxed">
                  El servicio se ofrece "tal cual". No se garantiza que esté libre de errores. 
                  En ningún caso seremos responsables de daños indirectos o pérdida de datos.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección 8: Propiedad intelectual -->
        <div class="group">
          <div class="bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-teal-100 to-teal-200 flex items-center justify-center">
                <span class="text-teal-600 font-bold text-lg">8</span>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 mb-3">Propiedad intelectual</h2>
                <p class="text-gray-700 leading-relaxed">
                  Todos los contenidos y marcas son propiedad de sus titulares y se usan conforme a la normativa aplicable.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección 9: Contacto -->
        <div class="group">
          <div class="bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-100 to-cyan-200 flex items-center justify-center">
                <span class="text-cyan-600 font-bold text-lg">9</span>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 mb-3">Contacto</h2>
                <p class="text-gray-700 leading-relaxed">
                  Para cualquier cuestión, contacta en <strong class="text-gray-900">[Email de contacto]</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección 10: Aviso clínico (destacada) -->
        <div class="group">
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200/60 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-amber-900 mb-3">Aviso clínico importante</h2>
                <p class="text-amber-800 leading-relaxed font-medium">
                  <strong class="text-amber-900">MiautoZen no sustituye atención médica o psicológica profesional.</strong>
                  <br><br>
                  Esta aplicación está diseñada únicamente como herramienta de autoevaluación orientativa. 
                  Si experimentas síntomas graves o persistentes, consulta con un profesional de la salud.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer con enlaces relacionados -->
      <footer class="mt-12 pt-8 border-t border-gray-200/60">
        <div class="text-center">
          <p class="text-gray-600 mb-4">Documentos relacionados</p>
          <div class="flex flex-wrap justify-center gap-4">
            <router-link 
              to="/privacidad" 
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-gray-200/60 text-sm font-medium text-gray-700 hover:bg-white hover:border-gray-300 transition-all duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              Política de Privacidad
            </router-link>
            <router-link 
              to="/cookies" 
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-gray-200/60 text-sm font-medium text-gray-700 hover:bg-white hover:border-gray-300 transition-all duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
              </svg>
              Política de Cookies
            </router-link>
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>

<script>
export default { name: 'TermsView' };
</script>

<style scoped>
</style>