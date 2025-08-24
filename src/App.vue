<template>
  <div>
    <NavBar />
    <main class="min-h-[calc(100vh-64px-260px)]"> <!-- 64px aprox header, 260px footer -->
      <div v-if="$store.getters.isAuth && !$store.getters.isVerified" class="bg-yellow-50 border-b border-yellow-200">
        <div class="mx-auto max-w-7xl px-4 py-2 text-sm text-yellow-900" role="status" aria-live="polite">
          Tu cuenta aún no está verificada. Revisa tu correo o
          <router-link :to="{ name: 'verify-email' }" class="underline font-medium">verifica aquí</router-link>.
        </div>
      </div>
      <router-view />
    </main>
    <FooterLegal />
    <FooterBar />
  </div>
</template>

<script>
import FooterBar from "@/components/FooterBar.vue";
import FooterLegal from "@/components/FooterLegal.vue";
import NavBar from "@/components/NavBar.vue";
export default { components: { NavBar, FooterBar, FooterLegal } };
</script>

<style>
/* Layout controlado por cada vista y Tailwind */
</style>
