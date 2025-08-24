<template>
  <article class="bg-white rounded-xl shadow-md p-4 overflow-hidden h-[320px]">
    <div class="grid grid-cols-1 md:grid-cols-10 gap-4 items-stretch h-full">
      <!-- Imagen (30%) -->
      <div class="md:col-span-3">
        <div class="h-48 md:h-full w-full overflow-hidden rounded-t-xl md:rounded-t-none md:rounded-l-xl md:rounded-r-none">
          <img :src="imageSrc" :alt="title" class="h-full w-full object-cover" />
        </div>
      </div>

      <!-- Contenido (70%) -->
      <div class="md:col-span-7 flex flex-col justify-between h-full">
        <div class="flex-1">
          <h2 class="text-lg font-bold">{{ title }}</h2>
          <p v-if="subtitle" class="text-sm text-gray-600 mt-1">{{ subtitle }}</p>

          <!-- Slot para contenido extra -->
          <div class="mt-3">
            <slot />
          </div>
        </div>

        <div class="mt-3">
          <a
            v-if="buttonHref"
            :href="buttonHref"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center px-4 py-2 rounded-lg text-white shadow-md bg-gradient-to-r from-purple-700 to-purple-500 hover:from-amber-600 hover:to-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            {{ buttonText }}
          </a>
          <button
            v-else
            type="button"
            class="inline-flex items-center justify-center px-4 py-2 rounded-lg text-white shadow-md bg-gradient-to-r from-purple-700 to-purple-500 hover:from-amber-600 hover:to-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "MediaCard",
  props: {
    imageSrc: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    buttonText: { type: String, default: "Acción" },
    buttonHref: { type: String, default: null }
  }
}
</script>

<style scoped>
</style>


