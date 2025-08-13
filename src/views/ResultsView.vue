<script>
import { onBeforeUnmount, ref, watch } from 'vue';
import { listarResultadosPorUsuario } from "@/services/db";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { useStore } from 'vuex';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default {
  setup() {
    const store = useStore();
    const resultados = ref([]);
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
        resultados.value = await listarResultadosPorUsuario(usuario.uid);
        // espera a que el canvas esté en el DOM y tenga tamaño
        requestAnimationFrame(() => {
          buildChart();
          loading.value = false;
        });
      },
      { immediate: true }
    );

    onBeforeUnmount(() => { if (chartInstance) chartInstance.destroy(); });

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

    return { resultados, canvasEl, loading, formatDate, formatTime, dotClass, badgeClass };
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
  </section>
</template>
