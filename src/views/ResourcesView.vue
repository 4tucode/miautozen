<script>
import { computed, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

import { setFavorito, listarFavoritosPorUsuario } from '@/services/db';

// Catálogo base de recursos
// id estable para clave de favorito: `${uid}_${id}`
const CATALOGO = [
  {
    id: 'respiracion-box',
    titulo: 'Respiración en caja (4-4-4-4)',
    descripcion: 'Técnica breve para reducir la ansiedad en minutos.',
    categoria: 'Mindfulness',
    url: 'https://www.youtube.com/watch?v=tEmt1Znux58'
  },
  {
    id: 'body-scan',
    titulo: 'Body scan guiado (10 min)',
    descripcion: 'Recorre el cuerpo para relajar tensión acumulada.',
    categoria: 'Mindfulness',
    url: 'https://www.youtube.com/watch?v=ihO02wUzgkc'
  },
  {
    id: 'higiene-suenio',
    titulo: 'Guía práctica de higiene del sueño',
    descripcion: 'Hábitos sencillos para dormir mejor y despertar con energía.',
    categoria: 'Sueño',
    url: 'https://www.sleepfoundation.org/sleep-hygiene'
  },
  {
    id: 'linea-ayuda',
    titulo: 'Líneas de ayuda y apoyo profesional',
    descripcion: 'Directorio de atención inmediata en caso de crisis.',
    categoria: 'Apoyo',
    url: 'https://www.who.int/teams/mental-health-and-substance-use'
  },
];

export default {
  name: 'ResourcesView',
  setup() {
    const store = useStore();
    const toast = useToast();
    const busqueda = ref('');
    const categoria = ref('Todas');
    const favoritosIds = ref(new Set()); // conjunto de recurso.id
    const cargandoFavs = ref(false);
    const actualizandoIds = ref(new Set());
    const categorias = computed(() => ['Todas', ...Array.from(new Set(CATALOGO.map(r => r.categoria)))]);

    const uid = computed(() => store.state.usuario?.uid || null);

    const cargarFavoritos = async () => {
      if (!uid.value) { favoritosIds.value = new Set(); return; }
      cargandoFavs.value = true;
      const favs = await listarFavoritosPorUsuario(uid.value);
      favoritosIds.value = new Set(favs.map(f => f.recursoId));
      cargandoFavs.value = false;
    };

    watch(() => uid.value, () => { cargarFavoritos(); }, { immediate: true });

    const addFavorito = async (recurso) => {
      if (!uid.value) { toast.info('Inicia sesión para guardar favoritos'); return; }
      const key = recurso.id;
      if (favoritosIds.value.has(key)) { toast.info('Este recurso ya está en tus favoritos'); return; }
      const pending = new Set(actualizandoIds.value); pending.add(key); actualizandoIds.value = pending;
      try {
        await setFavorito({ usuarioId: uid.value, recurso });
        const nuevo = new Set(favoritosIds.value); nuevo.add(key); favoritosIds.value = nuevo;
        toast.info('Se añadió el recurso a tus favoritos');
      } catch (e) {
        // Error añadiendo a favoritos
        toast.error('No se pudo añadir a favoritos');
      } finally {
        const p2 = new Set(actualizandoIds.value); p2.delete(key); actualizandoIds.value = p2;
        cargarFavoritos();
      }
    };

    const listadoFiltrado = computed(() => {
      const q = busqueda.value.trim().toLowerCase();
      const cat = categoria.value;
      return CATALOGO.filter(r => {
        const coincideCat = cat === 'Todas' || r.categoria === cat;
        const coincideTexto = !q || r.titulo.toLowerCase().includes(q) || r.descripcion.toLowerCase().includes(q);
        return coincideCat && coincideTexto;
      });
    });

    const iconoCategoria = (cat) => {
      switch (cat) {
        case 'Mindfulness':
          return { emoji: '🧘', color: 'from-emerald-500 to-teal-400 text-emerald-700 bg-emerald-50 ring-emerald-200' };
        case 'Sueño':
          return { emoji: '🌙', color: 'from-indigo-500 to-blue-400 text-indigo-700 bg-indigo-50 ring-indigo-200' };
        case 'Apoyo':
          return { emoji: '🤝', color: 'from-rose-500 to-orange-400 text-rose-700 bg-rose-50 ring-rose-200' };
        default:
          return { emoji: '✨', color: 'from-purple-500 to-fuchsia-400 text-purple-700 bg-purple-50 ring-purple-200' };
      }
    };

    return { busqueda, categoria, categorias, listadoFiltrado, favoritosIds, addFavorito, cargandoFavs, iconoCategoria, actualizandoIds };
  }
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 overflow-x-hidden bg-gradient-to-b from-[#f9aaff] via-[#fcedd0] to-[#ffe6f2]">
    <!-- Hero full-bleed -->
    <div class="-mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden">
      <div class="relative overflow-hidden h-48 sm:h-60 lg:h-72">
        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop" alt="Cabecera Recursos" class="h-full w-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent"></div>
        <div class="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow">Recursos para tu bienestar</h1>
            <p class="mt-1 max-w-2xl text-sm sm:text-base text-white/90">Explora prácticas guiadas, guías y herramientas. Marca tus favoritos para verlos en tu perfil.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Layout con aside fijo de filtros -->
    <div class="mt-6 grid gap-6 md:grid-cols-[320px,1fr] items-start">
      <!-- Aside filtros -->
      <aside class="sticky top-24 h-fit max-h-[70vh] overflow-auto self-start rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm">
        <h2 class="text-sm font-semibold text-gray-900">Buscar</h2>
        <label class="relative mt-2 block">
          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11.25 18a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z"/></svg>
          </span>
          <input v-model="busqueda" type="search" placeholder="Encuentra prácticas, guías..."
                 class="w-full rounded-xl border-0 bg-gray-50 pl-10 pr-4 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-inner ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none" />
        </label>

        <h3 class="mt-5 text-sm font-semibold text-gray-900">Categorías</h3>
        <div class="mt-2 flex flex-wrap gap-2">
          <button
            v-for="c in categorias" :key="c"
            @click="categoria = c"
            class="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset transition-colors"
            :class="[
              categoria === c
                ? 'bg-purple-600 text-white ring-purple-600'
                : 'bg-white text-gray-700 ring-gray-200 hover:bg-gray-50'
            ]"
          >
            <span class="select-none" v-if="c !== 'Todas'">{{ iconoCategoria(c).emoji }}</span>
            <span>{{ c }}</span>
          </button>
        </div>
      </aside>

      <!-- Listado de tarjetas -->
      <div>
        <div class="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          <article v-for="r in listadoFiltrado" :key="r.id" class="group relative rounded-2xl border bg-white p-5 shadow-sm ring-1 ring-transparent hover:shadow-md hover:ring-purple-200 transition-all duration-300 ease-out">
            <!-- Decoración superior -->
            <div class="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-tr opacity-20 blur-2xl group-hover:opacity-30 group-hover:scale-105 transition-transform duration-300"
                 :class="iconoCategoria(r.categoria).color.replace('text','from').replace('bg','to')"></div>

            <div class="flex items-start justify-between gap-4">
              <div class="flex items-start gap-3 min-w-0">
                <div class="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow"
                     :class="iconoCategoria(r.categoria).color.split(' ').slice(0,2).map(c=>c.replace('text-','')).join(' ')">
                  <span class="text-lg select-none group-hover:animate-pulse">{{ iconoCategoria(r.categoria).emoji }}</span>
                </div>
                <div class="min-w-0">
                  <h3 class="text-base font-semibold text-gray-900 group-hover:text-purple-800 transition-colors duration-200">{{ r.titulo }}</h3>
                  <p class="mt-1 text-sm text-gray-600">{{ r.descripcion }}</p>
                  <span class="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset text-purple-700 bg-purple-50 ring-purple-200">
                    {{ r.categoria }}
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <a :href="r.url" target="_blank" rel="noopener" class="group/lnk relative inline-flex items-center gap-2 text-sm font-medium text-purple-700 hover:text-purple-800">
                Abrir recurso
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 transition-transform duration-300 group-hover/lnk:translate-x-1"><path d="M5.25 12a.75.75 0 01.75-.75h9.69L12.22 7.78a.75.75 0 011.06-1.06l4.75 4.75a.75.75 0 010 1.06l-4.75 4.75a.75.75 0 01-1.06-1.06l3.47-3.47H6a.75.75 0 01-.75-.75z"/></svg>
                <span aria-hidden class="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover/lnk:w-full"></span>
              </a>

              <div>
                <button v-if="!favoritosIds.has(r.id)"
                        @click="addFavorito(r)"
                        :disabled="cargandoFavs || actualizandoIds.has(r.id)"
                        class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-700 to-purple-500 px-3 py-1.5 text-xs font-semibold text-white shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-purple-500 whitespace-nowrap transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-4 w-4"><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.62 0-3.04.84-3.812 2.102a4.5 4.5 0 00-3.812-2.102C6.099 3.75 4 5.765 4 8.25c0 6 8 10.5 8 10.5s8-4.5 8-10.5z" /></svg>
                  Añadir a favoritos
                </button>
                <span v-else class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M10.28 3.72a.75.75 0 011.06 0l9 9a.75.75 0 11-1.06 1.06L11 5.56 4.22 12.34a.75.75 0 01-1.06-1.06l7.12-7.56z" clip-rule="evenodd"/></svg>
                  En favoritos
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Eliminado duplicado de listado antiguo (corazones) -->
  </section>
</template>

