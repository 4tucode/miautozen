<template>
  <footer class="w-full border-t border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div class="mx-auto w-full px-6 py-10">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <!-- Brand -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <img :src="logo" alt="Miautozen" class="h-7 w-7" />
            <span class="text-lg font-bold tracking-[1px] bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">Miautozen</span>
          </div>
          <p class="max-w-xs text-sm text-gray-600">Bienestar emocional a tu alcance con autoevaluaciones claras y recomendaciones prácticas.</p>
        </div>

        <!-- Enlaces -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-900">Legal</h3>
          <ul class="mt-3 space-y-2 text-sm text-gray-700">
            <li><router-link :to="{ name: 'about' }" class="hover:text-gray-900">Sobre</router-link></li>
            <li><router-link :to="{ name: 'terms' }" class="hover:text-gray-900">Términos y condiciones</router-link></li>
            <li><router-link :to="{ name: 'privacy' }" class="hover:text-gray-900">Política de privacidad</router-link></li>
            <li><router-link :to="{ name: 'cookies' }" class="hover:text-gray-900">Política de cookies</router-link></li>
          </ul>
        </div>

        <!-- Recursos -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-900">Recursos</h3>
          <ul class="mt-3 space-y-2 text-sm text-gray-700">
            <li><router-link :to="{ name: 'help' }" class="hover:text-gray-900">Ayuda</router-link></li>
            <li><router-link :to="{ name: 'resources' }" class="hover:text-gray-900">Guías y artículos</router-link></li>
            <li><router-link :to="{ name: 'contact' }" class="hover:text-gray-900">Contacto</router-link></li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-900">Síguenos</h3>
          <div class="mt-3 flex items-center gap-3">
            <a class="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50" href="#" aria-label="X / Twitter">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.487 11.24H16.17l-5.31-6.94-6.075 6.94H1.476l7.73-8.833L1 2.25h6.008l4.79 6.354 6.446-6.354Zm-1.162 18.5h1.833L7.01 3.63H5.048l12.034 17.12Z"/></svg>
            </a>
            <a class="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50" href="#" aria-label="Instagram">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.403a4.92 4.92 0 0 1 1.78 1.153 4.92 4.92 0 0 1 1.153 1.78c.163.457.347 1.257.403 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.427a4.92 4.92 0 0 1-1.153 1.78 4.92 4.92 0 0 1-1.78 1.153c-.457.163-1.257.347-2.427.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.403a4.92 4.92 0 0 1-1.78-1.153 4.92 4.92 0 0 1-1.153-1.78c-.163-.457-.347-1.257-.403-2.427C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.427a4.92 4.92 0 0 1 1.153-1.78 4.92 4.92 0 0 1 1.78-1.153c.457-.163 1.257-.347 2.427-.403C8.416 2.175 8.796 2.163 12 2.163Zm0 1.622c-3.15 0-3.522.012-4.764.069-1.02.047-1.574.217-1.942.36-.49.19-.84.416-1.207.783-.367.366-.593.716-.783 1.206-.143.368-.313.922-.36 1.942-.057 1.242-.069 1.614-.069 4.765s.012 3.522.069 4.764c.047 1.02.217 1.574.36 1.942.19.49.416.84.783 1.207.366.367.716.593 1.206.783.368.143.922.313 1.942.36 1.242.057 1.614.069 4.765.069s3.522-.012 4.764-.069c1.02-.047 1.574-.217 1.942-.36.49-.19.84-.416 1.207-.783.367-.366.593-.716.783-1.206.143-.368.313-.922.36-1.942.057-1.242.069-1.614.069-4.765s-.012-3.522-.069-4.764c-.047-1.02-.217-1.574-.36-1.942-.19-.49-.416-.84-.783-1.207-.366-.367-.716-.593-1.206-.783-.368-.143-.922-.313-1.942-.36-1.242-.057-1.614-.069-4.765-.069Zm0 3.2a5.015 5.015 0 1 1 0 10.03 5.015 5.015 0 0 1 0-10.03Zm0 1.622a3.393 3.393 0 1 0 0 6.786 3.393 3.393 0 0 0 0-6.786Zm5.34-2.466a1.17 1.17 0 1 1 0 2.339 1.17 1.17 0 0 1 0-2.34Z"/></svg>
            </a>
            <a class="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50" href="#" aria-label="LinkedIn">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5ZM.3 8.25H4.7V23.7H.3V8.25Zm7.2 0h4.2v2.103h.06C12.42 9.03 14.28 8 16.68 8c4.32 0 5.12 2.85 5.12 6.56V23.7h-4.404v-5.99c0-1.43-.03-3.27-1.99-3.27-1.99 0-2.29 1.56-2.29 3.17V23.7H7.5V8.25Z"/></svg>
            </a>
            <a class="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50" href="#" aria-label="YouTube">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.004 3.004 0 0 0-2.116-2.127C19.543 3.5 12 3.5 12 3.5s-7.543 0-9.382.559A3.004 3.004 0 0 0 .502 6.186 31.63 31.63 0 0 0 0 12c.002 1.955.147 3.909.502 5.814a3.004 3.004 0 0 0 2.116 2.127C4.457 20.5 12 20.5 12 20.5s7.543 0 9.382-.559a3.004 3.004 0 0 0 2.116-2.127C23.853 15.909 24 13.955 24 12s-.147-3.909-.502-5.814ZM9.75 15.568v-7.14L15.818 12 9.75 15.568Z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
        <p>
          © {{ new Date().getFullYear() }} Miautozen. Hecho con cariño por
          <a href="https://4tucode.com" target="_blank" rel="noopener" class="font-semibold text-gray-800 hover:underline">4tucode</a>.
        </p>
      </div>
    </div>
  </footer>
  
</template>

<script>
import logo from '@/assets/logo.svg'
export default {
  name: 'FooterBar',
  computed: { logo() { return logo } }
}
</script>

<style scoped>
/* Todo el estilo se gestiona con Tailwind */
</style>


