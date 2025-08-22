<template>
  <div class="w-full bg-gray-50 border-t border-gray-200">
    <div class="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-700 flex flex-wrap gap-4">
      <router-link :to="{ name: 'terms' }" class="hover:underline">Términos</router-link>
      <span aria-hidden="true">·</span>
      <router-link :to="{ name: 'privacy' }" class="hover:underline">Privacidad</router-link>
      <span aria-hidden="true">·</span>
      <router-link :to="{ name: 'cookies' }" class="hover:underline">Cookies</router-link>
    </div>
  </div>
</template>

<script>
export default { name: 'FooterLegal' };
</script>

<style scoped>
</style>