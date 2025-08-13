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
            <router-link :to="{ name: 'results' }" class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium bg-white shadow-sm hover:shadow transition-all" :class="resultClasses">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975.75.75 0 01-1.21-.883A8.987 8.987 0 0112 14.25c3.04 0 5.74 1.51 7.692 3.842a.75.75 0 11-1.21.883z"/><path d="M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span class="hidden lg:inline">Perfil</span>
            </router-link>
            <button @click="logout" class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium text-rose-700 bg-white border-rose-200/60 shadow-sm hover:shadow transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-5 w-5"><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/></svg>
              <span class="hidden lg:inline">Salir</span>
            </button>
          </template>
          <template v-else>
            <router-link :to="{ name: 'login' }" class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium text-purple-700 bg-white border-purple-200/60 shadow-sm hover:shadow transition-all">
              <span>Entrar</span>
            </router-link>
            <router-link :to="{ name: 'register' }" class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium text-purple-700 bg-white border-purple-200/60 shadow-sm hover:shadow transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-5 w-5"><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0M19.5 8.25h3m-1.5 1.5V6.75"/></svg>
              <span>Crear cuenta</span>
            </router-link>
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
          <router-link class="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" :to="{ name: 'results' }" @click="open=false">
            <span class="inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975.75.75 0 01-1.21-.883A8.987 8.987 0 0112 14.25c3.04 0 5.74 1.51 7.692 3.842a.75.75 0 11-1.21.883z"/><path d="M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Perfil
            </span>
          </router-link>
          <button @click="logout" class="mt-2 w-full inline-flex items-center gap-2 rounded-full border px-3 py-2 text-left font-semibold text-rose-700 bg-white border-rose-200/60 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-5 w-5"><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/></svg>
            Salir
          </button>
        </template>
        <template v-else>
          <router-link class="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" :to="{ name: 'login' }" @click="open=false">Entrar</router-link>
          <router-link class="mt-2 block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" :to="{ name: 'register' }" @click="open=false">
            <span class="inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-5 w-5"><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0M19.5 8.25h3m-1.5 1.5V6.75"/></svg>
              Crear cuenta
            </span>
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import logo from '@/assets/logo.svg'
import { listarResultadosPorUsuario } from '@/services/db'

export default {
  data() {
    return {
      open: false,
      defaultSlug: 'uKOyWktkSesEW3sUaL3r',
      latestScore: null,
    }
  },
  computed: {
    logo() { return logo },
    menuItemClass() { return 'animate-menu-in' },
    resultClasses() {
      const s = Number(this.latestScore || 0)
      if (s <= 7) return 'text-emerald-700 border-emerald-200/60'
      if (s <= 14) return 'text-purple-700 border-purple-200/60'
      return 'text-rose-700 border-rose-200/60'
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('signOut')
      this.$router.push({ name: 'home' })
      this.open = false
    },
    async fetchLatestScore() {
      try {
        if (!this.$store.getters.isAuth) { this.latestScore = null; return }
        const uid = this.$store.state.usuario?.uid
        if (!uid) { this.latestScore = null; return }
        const res = await listarResultadosPorUsuario(uid)
        this.latestScore = res?.[0]?.puntuacion ?? null
      } catch (e) {
        this.latestScore = null
      }
    }
  },
  watch: {
    '$store.state.usuario': {
      handler() { this.fetchLatestScore() },
      immediate: true,
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
