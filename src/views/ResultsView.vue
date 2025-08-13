<script>
import { onBeforeUnmount, ref, watch } from 'vue';
import { listarResultadosPorUsuario, listarFavoritosPorUsuario, removeFavorito } from "@/services/db";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default {
  setup() {
    const store = useStore();
    const toast = useToast();
    const resultados = ref([]);
    const favoritos = ref([]);
    const canvasEl = ref(null);
    const loading = ref(true);
    let chartInstance = null;


    const buildChart = () => {
      if (!canvasEl.value) return;
      const ctx = canvasEl.value.getContext('2d');
      if (chartInstance) { chartInstance.destroy(); }
      const labels = resultados.value
        .slice()
        .sort((a,b) => (a.creadoEn?.seconds||0) - (b.creadoEn?.seconds||0))
        .map(r => {
          const d = r.creadoEn?.toDate?.() || new Date();
          return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short' }).format(d);
        });
      const dataPoints = resultados.value
        .slice()
        .sort((a,b) => (a.creadoEn?.seconds||0) - (b.creadoEn?.seconds||0))
        .map(r => r.puntuacion || 0);

      // Si no hay datos, limpia cualquier instancia previa y no intentes crear
      if (!labels.length) { chartInstance = null; return; }

      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Puntuación',
            data: dataPoints,
            borderColor: '#7c3aed',
            backgroundColor: 'rgba(124, 58, 237, 0.15)',
            pointBackgroundColor: '#a78bfa',
            pointBorderColor: '#7c3aed',
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
            tension: 0.25,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.parsed.y} puntos`
              }
            }
          },
          scales: {
            x: { ticks: { color: '#374151' }, grid: { display: false } },
            y: { ticks: { color: '#374151' }, grid: { color: '#e5e7eb' } }
          }
        }
      });
    };

    // helpers formato
    const formatDate = (ts) => {
      const d = ts?.toDate?.();
      if (!d) return '—';
      return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
    };
    const formatTime = (ts) => {
      const d = ts?.toDate?.();
      if (!d) return '';
      return new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(d);
    };

    // Cargar cuando el usuario esté disponible
    watch(
      () => store.state.usuario,
      async (usuario) => {
        if (!usuario?.uid) return;
        loading.value = true;
        const [res, favs] = await Promise.all([
          listarResultadosPorUsuario(usuario.uid),
          listarFavoritosPorUsuario(usuario.uid),
        ]);
        resultados.value = res;
        favoritos.value = favs;
        // espera a que el canvas esté en el DOM y tenga tamaño
        requestAnimationFrame(() => {
          buildChart();
          loading.value = false;
        });
      },
      { immediate: true }
    );

    onBeforeUnmount(() => { if (chartInstance) chartInstance.destroy(); });

    const eliminarFavorito = async (fav) => {
      try {
        await removeFavorito({ usuarioId: store.state.usuario?.uid, recursoId: fav.recursoId || fav.recurso?.id });
        favoritos.value = favoritos.value.filter(f => f.id !== fav.id);
        toast.info('Se eliminó el recurso de tus favoritos');
      } catch (e) {
        // Error eliminando favorito
        toast.error('No se pudo eliminar el favorito');
      }
    };

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

    const dotClass = (score) => {
      const s = Number(score || 0);
      if (s <= 7) return 'bg-emerald-500';
      if (s <= 14) return 'bg-purple-500';
      return 'bg-rose-500';
    };

    const badgeClass = (score) => {
      const s = Number(score || 0);
      if (s <= 7) return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
      if (s <= 14) return 'text-purple-700 bg-purple-50 border border-purple-200';
      return 'text-rose-700 bg-rose-50 border border-rose-200';
    };

    return { resultados, favoritos, canvasEl, loading, formatDate, formatTime, dotClass, badgeClass, eliminarFavorito, iconoCategoria };
  }
}
</script>

<template>
  <section class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl sm:text-3xl font-bold">
        <span class="bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">Mis resultados</span>
      </h1>
    </header>

    <div class="mt-6 grid gap-6 md:grid-cols-3">
      <!-- Lista -->
      <div class="md:col-span-1 rounded-xl border border-gray-200 bg-white/80 backdrop-blur p-4 shadow-sm">
        <h2 class="text-sm font-semibold text-gray-900">Historial</h2>
        <ul v-if="resultados.length" class="mt-3 space-y-2 text-sm text-gray-700">
          <li v-for="r in resultados" :key="r.id" class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <span class="font-medium text-gray-900">{{ formatDate(r.creadoEn) }}</span>
              <span class="ml-2 text-xs text-gray-500">{{ formatTime(r.creadoEn) }}</span>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <span class="inline-flex h-2.5 w-2.5 rounded-full" :class="dotClass(r.puntuacion)" :title="`Puntuación: ${r.puntuacion}`"></span>
              <span class="rounded-full px-2 py-0.5 text-xs font-semibold" :class="badgeClass(r.puntuacion)">{{ r.puntuacion }} pts</span>
              <router-link
                :to="{ name: 'assessment-summary', query: { resultId: r.id } }"
                class="inline-flex items-center rounded-md bg-gradient-to-r from-purple-800 to-purple-400 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:opacity-95"
                >Ver resumen</router-link>
            </div>
          </li>
        </ul>
        <p v-else class="text-sm text-gray-600">No hay resultados aún.</p>
      </div>

      <!-- Gráfica -->
      <div class="md:col-span-2 rounded-xl border border-gray-200 bg-white/80 backdrop-blur p-4 shadow-sm">
        <div class="relative h-72">
          <!-- Canvas siempre en el DOM para permitir construir la gráfica a tiempo -->
          <canvas ref="canvasEl" class="h-full w-full"></canvas>
          <!-- Skeleton superpuesto sin afectar el canvas -->
          <div v-if="loading" class="pointer-events-none absolute inset-0 animate-pulse rounded-md bg-gray-200/60"></div>
        </div>
      </div>

    </div>

    <!-- Favoritos -->
    <div class="mt-10">
      <h2 class="text-lg font-semibold text-gray-900">Mis recursos favoritos</h2>
      <div v-if="favoritos.length" class="mt-4 grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]">
        <article v-for="f in favoritos" :key="f.id" class="group relative rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm ring-1 ring-transparent hover:shadow-md hover:ring-purple-200 transition-all">
          <div class="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-tr opacity-20 blur-2xl group-hover:opacity-30 group-hover:scale-105 transition-transform"
               :class="iconoCategoria(f.recurso?.categoria).color.replace('text','from').replace('bg','to')"></div>

          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-3 min-w-0">
              <div class="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow"
                   :class="iconoCategoria(f.recurso?.categoria).color.split(' ').slice(0,2).map(c=>c.replace('text-','')).join(' ')">
                <span class="text-lg select-none group-hover:animate-pulse">{{ iconoCategoria(f.recurso?.categoria).emoji }}</span>
              </div>
              <div class="min-w-0">
                <h3 class="text-base font-semibold text-gray-900 group-hover:text-purple-800 transition-colors">{{ f.recurso?.titulo || 'Recurso' }}</h3>
                <p class="mt-1 text-sm text-gray-600">{{ f.recurso?.descripcion }}</p>
                <span v-if="f.recurso?.categoria" class="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset text-purple-700 bg-purple-50 ring-purple-200">
                  {{ f.recurso.categoria }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-4 flex items-center justify-between">
            <a v-if="f.recurso?.url" :href="f.recurso.url" target="_blank" rel="noopener" class="group/lnk relative inline-flex items-center gap-2 text-sm font-medium text-purple-700 hover:text-purple-800">
              Abrir recurso
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 transition-transform duration-300 group-hover/lnk:translate-x-1"><path d="M5.25 12a.75.75 0 01.75-.75h9.69L12.22 7.78a.75.75 0 011.06-1.06l4.75 4.75a.75.75 0 010 1.06l-4.75 4.75a.75.75 0 01-1.06-1.06l3.47-3.47H6a.75.75 0 01-.75-.75z"/></svg>
              <span aria-hidden class="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover/lnk:w-full"></span>
            </a>
            <button @click="eliminarFavorito(f)" class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-rose-50 hover:text-rose-700 hover:ring-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-4 w-4"><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.62 0-3.04.84-3.812 2.102a4.5 4.5 0 00-3.812-2.102C6.099 3.75 4 5.765 4 8.25c0 6 8 10.5 8 10.5s8-4.5 8-10.5z" /></svg>
              Eliminar de favoritos
            </button>
          </div>
        </article>
      </div>
      <p v-else class="mt-3 text-sm text-gray-600">Todavía no tienes favoritos. Ve a <router-link class="text-purple-700 hover:text-purple-800 font-medium" :to="{ name: 'resources' }">Recursos</router-link> y marca algunos.</p>
    </div>
  </section>
</template>
