<template>
  <div>
    <NavBar />
    <main class="min-h-[calc(100vh-64px-260px)]"> <!-- 64px aprox header, 260px footer -->
      <router-view />
    </main>
    <FooterBar />
  </div>
</template>

<script>
import FooterBar from "@/components/FooterBar.vue";
import NavBar from "@/components/NavBar.vue";
export default { components: { NavBar, FooterBar } };
</script>

<style>
/* Layout controlado por cada vista y Tailwind */
</style>
