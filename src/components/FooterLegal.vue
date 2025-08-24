<template>
  <footer class="relative w-full bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-200/60">
    <!-- Overlay sutil para profundidad -->
    <div class="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-transparent to-blue-50/30 opacity-60"></div>
    
    <!-- Contenido principal -->
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Enlaces principales -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
       
        <!-- Enlaces legales -->
        <nav class="flex flex-wrap items-center justify-center gap-4 sm:gap-6" aria-label="Enlaces legales">
          <a 
            href="#" 
            @click.prevent="scrollToTop('terms')"
            class="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-gray-200/60 text-sm font-medium text-gray-700 hover:bg-white hover:border-purple-200 hover:text-purple-700 transition-all duration-200 hover:shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span class="hidden sm:inline">Términos</span>
            <span class="sm:hidden">Términos</span>
          </a>

          <a 
            href="#" 
            @click.prevent="scrollToTop('privacy')"
            class="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-gray-200/60 text-sm font-medium text-gray-700 hover:bg-white hover:border-blue-200 hover:text-blue-700 transition-all duration-200 hover:shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <span class="hidden sm:inline">Privacidad</span>
            <span class="sm:hidden">Privacidad</span>
          </a>

          <a 
            href="#" 
            @click.prevent="scrollToTop('cookies')"
            class="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-gray-200/60 text-sm font-medium text-gray-700 hover:bg-white hover:border-emerald-200 hover:text-emerald-700 transition-all duration-200 hover:shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
            <span class="hidden sm:inline">Cookies</span>
            <span class="sm:hidden">Cookies</span>
          </a>
        </nav>
      </div>

      
    </div>
  </footer>
</template>

<script>
export default { 
  name: 'FooterLegal',
  methods: {
    scrollToTop(routeName) {
      // Primero navega a la ruta
      this.$router.push({ name: routeName }).then(() => {
        // Después de la navegación, hace scroll suave a la parte superior
        this.$nextTick(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        })
      })
    }
  }
}
</script>

<style scoped>
</style>