<template>
  <header class="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 sticky top-0 z-40">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Left: Logo -->
        <div class="flex items-center gap-3">
          <router-link :to="{ name: 'home' }" class="flex items-center gap-2">
            <img :src="logo" alt="Miautozen" class="h-8 w-8" />
            <span class="font-bold tracking-[1px] bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">Miautozen</span>
          </router-link>
        </div>

        <!-- Center: Links desktop -->
        <div class="hidden md:flex items-center gap-6">
          <router-link class="text-gray-700 hover:text-gray-900" :class="menuItemClass" :to="{ name: 'home' }">Inicio</router-link>
          <router-link class="text-gray-700 hover:text-gray-900" :class="menuItemClass" :to="{ name: 'assessment', params: { slug: defaultSlug } }">Autoevaluación</router-link>
          <router-link class="text-gray-700 hover:text-gray-900" :class="menuItemClass" :to="{ name: 'help' }">Ayuda</router-link>
          <router-link class="text-gray-700 hover:text-gray-900" :class="menuItemClass" :to="{ name: 'resources' }">Recursos</router-link>
          <router-link class="text-gray-700 hover:text-gray-900" :class="menuItemClass" :to="{ name: 'about' }">Sobre</router-link>
          <router-link class="text-gray-700 hover:text-gray-900" :class="menuItemClass" :to="{ name: 'contact' }">Contacto</router-link>
        </div>

        <!-- Right: Auth -->
        <div class="hidden md:flex items-center gap-3">
          <template v-if="$store.getters.isAuth">
            <router-link class="text-gray-700 hover:text-gray-900" :to="{ name: 'results' }">Mis resultados</router-link>
            <button @click="logout" class="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">Salir</button>
          </template>
          <template v-else>
            <router-link class="text-gray-700 hover:text-gray-900 transition-transform duration-200 ease-out hover:-translate-y-0.5" :to="{ name: 'login' }">Entrar</router-link>
            <router-link class="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md" :to="{ name: 'register' }">Crear cuenta</router-link>
          </template>
        </div>

        <!-- Mobile button -->
        <button @click="open = !open" class="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100">
          <span class="sr-only">Abrir menú</span>
          <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div v-show="open" class="md:hidden border-t border-gray-200">
      <div class="space-y-1 px-4 py-3">
        <router-link class="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" :class="menuItemClass" :to="{ name: 'home' }" @click="open=false">Inicio</router-link>
        <router-link class="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" :class="menuItemClass" :to="{ name: 'assessment', params: { slug: defaultSlug } }" @click="open=false">Autoevaluación</router-link>
        <router-link class="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" :class="menuItemClass" :to="{ name: 'help' }" @click="open=false">Ayuda</router-link>
        <router-link class="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" :class="menuItemClass" :to="{ name: 'resources' }" @click="open=false">Recursos</router-link>
        <router-link class="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" :class="menuItemClass" :to="{ name: 'about' }" @click="open=false">Sobre</router-link>
        <router-link class="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" :class="menuItemClass" :to="{ name: 'contact' }" @click="open=false">Contacto</router-link>

        <template v-if="$store.getters.isAuth">
          <router-link class="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" :to="{ name: 'results' }" @click="open=false">Mis resultados</router-link>
          <button @click="logout" class="mt-2 w-full rounded-md bg-blue-600 px-3 py-2 text-left font-semibold text-white">Salir</button>
        </template>
        <template v-else>
          <router-link class="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" :to="{ name: 'login' }" @click="open=false">Entrar</router-link>
          <router-link class="mt-2 block rounded-md bg-blue-600 px-3 py-2 font-semibold text-white" :to="{ name: 'register' }" @click="open=false">Crear cuenta</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import logo from '@/assets/logo.svg'

export default {
  data() {
    return {
      open: false,
      defaultSlug: 'uKOyWktkSesEW3sUaL3r'
    }
  },
  computed: {
    logo() { return logo },
    menuItemClass() { return 'animate-menu-in' }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('signOut')
      this.$router.push({ name: 'home' })
      this.open = false
    }
  }
}
</script>

<style scoped>
@keyframes menuIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-menu-in {
  animation: menuIn 400ms ease-out both;
}

/* stagger básico para los enlaces del menú en desktop */
.md\\:flex > .animate-menu-in:nth-child(1) { animation-delay: 40ms; }
.md\\:flex > .animate-menu-in:nth-child(2) { animation-delay: 80ms; }
.md\\:flex > .animate-menu-in:nth-child(3) { animation-delay: 120ms; }
.md\\:flex > .animate-menu-in:nth-child(4) { animation-delay: 160ms; }
.md\\:flex > .animate-menu-in:nth-child(5) { animation-delay: 200ms; }
.md\\:flex > .animate-menu-in:nth-child(6) { animation-delay: 240ms; }

/* y en móvil dentro del contenedor del menú */
.space-y-1 > .animate-menu-in:nth-child(1) { animation-delay: 40ms; }
.space-y-1 > .animate-menu-in:nth-child(2) { animation-delay: 80ms; }
.space-y-1 > .animate-menu-in:nth-child(3) { animation-delay: 120ms; }
.space-y-1 > .animate-menu-in:nth-child(4) { animation-delay: 160ms; }
.space-y-1 > .animate-menu-in:nth-child(5) { animation-delay: 200ms; }
.space-y-1 > .animate-menu-in:nth-child(6) { animation-delay: 240ms; }
</style>
