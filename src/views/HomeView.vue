<template>
  <div class="relative isolate overflow-hidden w-full">
    <!-- Hero -->
    <section class="relative w-full">
      <!-- Ilustración zen (imagen de stock libre o svg abstracto) -->
      <div class="absolute inset-0 -z-10">
        <img :src="require('@/assets/fondo.jpg')" alt="Persona de espaldas meditando en sala blanca" class="h-full w-full object-cover" />
        <div class="absolute inset-0 bg-white/70"></div>
      </div>

      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid min-h-[calc(100vh-64px-260px)] grid-cols-1 items-center gap-10 py-10 sm:py-12 md:grid-cols-2">
          <div class="text-center md:text-left">
            <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Encuentra tu equilibrio
            </h1>
            <p class="mt-4 text-lg text-gray-700">
              Te ayudamos a comprender cómo te sientes mediante autoevaluaciones sencillas, anónimas y sin juicios.
              Explora tus resultados con claridad y recibe recomendaciones que te acercan a tu bienestar.
            </p>

            <div class="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-start">
              <button
                class="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium text-purple-700 bg-white border-purple-200/60 shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="cargando || !puedeEmpezar"
                @click="empezarDiagnostico">
                <span>{{ cargando ? 'Cargando…' : 'Empezar diagnóstico' }}</span>
                
              </button>

              <router-link
                :to="{ name: 'results' }"
                class="inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-gray-200/60 shadow-sm hover:shadow transition-all">
                Ver mis resultados
              </router-link>
            </div>

            <p v-if="!cargando && !puedeEmpezar" class="mt-3 text-sm text-gray-600">
              En este momento no hay autoevaluaciones disponibles.
            </p>
          </div>

          
        </div>
      </div>
    </section>

    <!-- Características -->
    <section class="relative overflow-hidden mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="absolute inset-0 -z-10 bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50"></div>
      <div class="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-300 via-amber-200 to-orange-200 opacity-40 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-200 via-amber-200 to-rose-200 opacity-40 blur-3xl"></div>
      <div class="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="flex items-center gap-3">
            <span class="inline-block h-2.5 w-2.5 rounded-full bg-[#BE51D4]"></span>
            <h3 class="text-lg font-semibold text-gray-900">Anónimo y seguro</h3>
          </div>
          <p class="mt-2 text-gray-600">Tus datos están protegidos y solo tú decides con quién compartirlos.</p>
        </div>
        <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="flex items-center gap-3">
            <span class="inline-block h-2.5 w-2.5 rounded-full bg-[#529E26]"></span>
            <h3 class="text-lg font-semibold text-gray-900">Basado en evidencia</h3>
          </div>
          <p class="mt-2 text-gray-600">Preguntas y resultados inspirados en prácticas validadas y guías clínicas.</p>
        </div>
        <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="flex items-center gap-3">
            <span class="inline-block h-2.5 w-2.5 rounded-full bg-[#BE51D4]"></span>
            <h3 class="text-lg font-semibold text-gray-900">Recomendaciones prácticas</h3>
          </div>
          <p class="mt-2 text-gray-600">Sugerencias simples para tu día a día que apoyan tu bienestar emocional.</p>
        </div>
      </div>
    </section>

    <!-- Testimonios -->
    <section class="relative overflow-hidden py-12">
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-amber-50 via-rose-50 to-emerald-50"></div>
      <div class="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-amber-300 via-rose-300 to-emerald-200 opacity-30 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-gradient-to-tr from-rose-200 via-amber-200 to-emerald-200 opacity-30 blur-3xl"></div>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-center text-2xl font-bold text-gray-900">Lo que dicen nuestros usuarios</h2>
        <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <figure class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <blockquote class="text-gray-700">“Rápido y claro. Me ayudó a entender cómo me sentía sin juzgarme.”</blockquote>
            <figcaption class="mt-3 text-sm text-gray-500">— Ana</figcaption>
          </figure>
          <figure class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <blockquote class="text-gray-700">“Las recomendaciones fueron sencillas y útiles para mi rutina.”</blockquote>
            <figcaption class="mt-3 text-sm text-gray-500">— Luis</figcaption>
          </figure>
          <figure class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <blockquote class="text-gray-700">“Me dio un punto de partida para hablar con mi terapeuta.”</blockquote>
            <figcaption class="mt-3 text-sm text-gray-500">— Marta</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section class="relative overflow-hidden py-14">
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-[#BE51D4] to-[#529E26] opacity-10"></div>
      <div class="mx-auto max-w-4xl px-4 text-center">
        <h3 class="text-2xl font-bold text-gray-900">Da el siguiente paso</h3>
        <p class="mt-2 text-gray-700">Comienza tu autoevaluación ahora y descubre recomendaciones personalizadas.</p>
        <button
          class="mt-5 inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium text-purple-700 bg-white border-purple-200/60 shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="cargando || !puedeEmpezar"
          @click="empezarDiagnostico">
          Empezar ahora
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { listarAutoevaluaciones } from "@/services/db";

export default {
  data() {
    return {
      autoevaluaciones: [],
      cargando: true,
    };
  },
  computed: {
    puedeEmpezar() {
      return this.autoevaluaciones.length > 0;
    },
    // Escoge la destacada si existe; en su defecto, la primera
    autoevaluacionPorDefecto() {
      const destacada = this.autoevaluaciones.find(a => a.destacada === true);
      return destacada || this.autoevaluaciones[0] || null;
    },
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },
  async created() {
    this.autoevaluaciones = await listarAutoevaluaciones();
    this.cargando = false;
  },
  methods: {
    empezarDiagnostico() {
      const slug = "uKOyWktkSesEW3sUaL3r"; // único formulario
      if (!this.isAuth) {
        // Si no está autenticado → Login con redirect
        this.$router.push({ name: "login", query: { next: `/assessment/${slug}` } });
        return;
      }
      // Si está autenticado → directo al formulario
      this.$router.push({ name: "assessment", params: { slug } });
    }
  }
};
</script>

<style scoped>
/* Estilos adicionales mínimos: todo el layout usa Tailwind */
</style>
