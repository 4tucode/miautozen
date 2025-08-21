<template>
  <div class="min-h-screen bg-gradient-to-b from-[#f9aaff] via-[#fcedd0] to-[#ffe6f2]">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <div v-reveal class="reveal mb-6 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur" style="--reveal-delay: 0ms">
            <svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Ayuda Inmediata Disponible
          </div>
          <h1 v-reveal class="reveal mb-6 text-4xl font-bold tracking-tight sm:text-6xl" style="--reveal-delay: 120ms">
            Estamos aquí para
            <span class="text-yellow-300">ayudarte</span>
          </h1>
          <p v-reveal class="reveal mx-auto max-w-2xl text-xl text-blue-100" style="--reveal-delay: 240ms">
            Encuentra recursos de apoyo inmediato, profesionales especializados y herramientas para cuidar tu bienestar mental. No estás solo en esto.
          </p>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <!-- Ayuda Inmediata -->
      <section class="mb-16">
        <div class="text-center mb-12">
          <h2 v-reveal class="reveal text-3xl font-bold text-gray-900 mb-4" style="--reveal-delay: 0ms">🚨 Ayuda Inmediata</h2>
          <p v-reveal class="reveal text-gray-600 max-w-2xl mx-auto" style="--reveal-delay: 120ms">Si estás en crisis o necesitas apoyo urgente, estos recursos están disponibles 24/7</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <!-- Teléfono de la Esperanza -->
          <div v-reveal class="reveal bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all" style="--reveal-delay: 0ms">
            <div class="flex items-start gap-4">
              <div class="rounded-full bg-red-100 p-3">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" stroke-width="2" />
                  <circle cx="12" cy="12" r="4" stroke-width="2" />
                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" stroke-width="2" stroke-linecap="round" />
                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" stroke-width="2" stroke-linecap="round" />
                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" stroke-width="2" stroke-linecap="round" />
                  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" stroke-width="2" stroke-linecap="round" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-2">Teléfono de la Esperanza</h3>
                <p class="text-gray-600 text-sm mb-3">Apoyo emocional gratuito y confidencial</p>
                <div class="space-y-1">
                  <a href="tel:717003717" class="flex items-center text-red-600 font-medium hover:text-red-700">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    717 003 717
                  </a>
                  <p class="text-xs text-gray-500">24 horas, todos los días</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Emergencias -->
          <div v-reveal class="reveal bg-white rounded-2xl shadow-lg border border-orange-100 p-6 hover:shadow-xl transition-all" style="--reveal-delay: 120ms">
            <div class="flex items-start gap-4">
              <div class="rounded-full bg-orange-100 p-3">
                <svg class="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13a4 4 0 118 0v4H8v-4z" />
                  <rect x="6" y="17" width="12" height="3" rx="1" stroke-width="2" />
                  <line x1="12" y1="3" x2="12" y2="6" stroke-width="2" stroke-linecap="round" />
                  <line x1="4.22" y1="6.22" x2="6.34" y2="8.34" stroke-width="2" stroke-linecap="round" />
                  <line x1="19.78" y1="6.22" x2="17.66" y2="8.34" stroke-width="2" stroke-linecap="round" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-2">Emergencias</h3>
                <p class="text-gray-600 text-sm mb-3">Para situaciones de riesgo vital inmediato</p>
                <div class="space-y-1">
                  <a href="tel:112" class="flex items-center text-orange-600 font-medium hover:text-orange-700">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    112
                  </a>
                  <p class="text-xs text-gray-500">Emergencias generales</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Profesionales Disponibles -->
      <section>
        <div class="text-center mb-12">
          <h2 v-reveal class="reveal text-3xl font-bold text-gray-900 mb-4" style="--reveal-delay: 0ms">👥 Profesionales Especializados</h2>
          <p v-reveal class="reveal text-gray-600 max-w-2xl mx-auto" style="--reveal-delay: 120ms">Conecta con psicólogos verificados. Muchos ofrecen primera consulta gratuita</p>
        </div>

        <!-- Sistema de Filtros -->
        <div v-reveal class="reveal mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6" style="--reveal-delay: 0ms">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              Filtrar Profesionales
            </h3>
            <button 
              @click="showFilters = !showFilters"
              class="md:hidden bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors"
            >
              {{ showFilters ? 'Ocultar' : 'Mostrar' }} Filtros
            </button>
          </div>

          <div :class="['grid gap-4', showFilters || 'hidden md:grid', 'md:grid-cols-4']">
            <!-- Filtro por Especialidad -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
              <select 
                v-model="filters.specialty" 
                class="w-full border border-gray-200 rounded-full px-4 py-2.5 pr-10 text-sm bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-out appearance-none cursor-pointer hover:border-gray-300"
              >
                <option value="">Todas las especialidades</option>
                <option v-for="specialty in allSpecialties" :key="specialty" :value="specialty">
                  {{ specialty }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400 mt-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <!-- Filtro por Precio -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-2">Precio</label>
              <select 
                v-model="filters.price" 
                class="w-full border border-gray-200 rounded-full px-4 py-2.5 pr-10 text-sm bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-out appearance-none cursor-pointer hover:border-gray-300"
              >
                <option value="">Todos los precios</option>
                <option value="gratis">Consulta gratuita</option>
                <option value="medio">Precio medio (50-70€)</option>
                <option value="alto">Precio alto (+70€)</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400 mt-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <!-- Filtro por Modalidad -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-2">Modalidad</label>
              <select 
                v-model="filters.modalidad" 
                class="w-full border border-gray-200 rounded-full px-4 py-2.5 pr-10 text-sm bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-out appearance-none cursor-pointer hover:border-gray-300"
              >
                <option value="">Todas las modalidades</option>
                <option value="presencial">Presencial</option>
                <option value="online">Online</option>
                <option value="hibrida">Híbrida</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400 mt-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <!-- Botón Limpiar Filtros -->
            <div class="flex items-end">
              <button 
                @click="clearFilters"
                class="w-full inline-flex items-center justify-center rounded-full border px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border-gray-200/60 shadow-sm hover:shadow transition-all duration-200 ease-out"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>

          <!-- Contador de resultados -->
          <div class="mt-4 text-sm text-gray-600">
            {{ filteredProfessionals.length }} profesional{{ filteredProfessionals.length !== 1 ? 'es' : '' }} encontrado{{ filteredProfessionals.length !== 1 ? 's' : '' }}
          </div>
        </div>

        <!-- Skeleton Loading mientras cargan los datos -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="n in 6" :key="'skeleton-' + n" class="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
            <div class="h-64 bg-gray-200"></div>
            <div class="p-6 space-y-4">
              <div class="h-6 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              <div class="flex gap-2">
                <div class="h-8 bg-gray-200 rounded-full w-20"></div>
                <div class="h-8 bg-gray-200 rounded-full w-24"></div>
                <div class="h-8 bg-gray-200 rounded-full w-16"></div>
              </div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div class="h-12 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>

        <!-- Lista de Profesionales con MediaCard (30/70) -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(professional, index) in filteredProfessionals"
            :key="professional.id"
            v-reveal
            class="reveal"
            :style="{ '--reveal-delay': `${index * 120}ms` }"
          >
            <MediaCard
              :imageSrc="professional.image"
              :title="professional.name"
              :subtitle="professional.title + ' · ' + professional.location"
              buttonText="Reservar cita en Doctoralia"
              :buttonHref="professional.officialUrl"
            >
            <div class="flex items-center gap-2 mb-2" v-if="professional.badge">
              <span :class="['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white', getBadgeColorClass(professional.badgeColor)]">
                {{ professional.badge }}
              </span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span 
                v-for="(specialty, idx) in professional.specialties" 
                :key="specialty"
                :class="['px-2.5 py-1 rounded-full text-xs transition-all duration-300 cursor-default whitespace-nowrap', getSpecialtyColorClass(professional.specialtyColors[idx])]"
              >
                {{ specialty }}
              </span>
            </div>
            <div class="mt-3 space-y-1 text-sm text-gray-600">
              <div v-if="professional.schedule" class="flex items-center gap-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                Disponible: {{ professional.schedule }}
              </div>
              <div v-if="professional.phone" class="flex items-center gap-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a :href="'tel:' + professional.phone" class="hover:text-blue-600 transition-colors">
                  {{ professional.phone }}
                </a>
              </div>
              <div v-if="professional.email" class="flex items-center gap-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a :href="'mailto:' + professional.email" class="hover:text-blue-600 transition-colors">
                  {{ professional.email }}
                </a>
              </div>
              <div v-if="professional.price" class="flex items-center gap-2 text-green-600 font-medium">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
                {{ professional.price }}
              </div>
            </div>
            </MediaCard>
          </div>
        </div>

        <!-- Mensaje cuando no hay resultados -->
        <div v-if="!loading && filteredProfessionals.length === 0" class="text-center py-12">
          <svg class="mx-auto h-24 w-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.53-.935-6.172-2.607l-.707.707A8.96 8.96 0 006 18h12a8.96 8.96 0 00.879-4.9l-.707-.707z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron profesionales</h3>
          <p class="text-gray-600 mb-4">Intenta cambiar los filtros para encontrar más opciones</p>
          <button 
            @click="clearFilters"
            class="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium text-purple-700 bg-white border-purple-200/60 shadow-sm hover:shadow transition-all duration-200 ease-out"
          >
            Limpiar Filtros
          </button>
        </div>

      
  </section>
    </div>
  </div>
</template>

<script>
import MediaCard from '@/components/MediaCard.vue'
export default {
  name: 'HelpView',
  components: { MediaCard },
  directives: {
    reveal: {
      mounted(el) {
        el.classList.add('reveal');
        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        );
        observer.observe(el);
      }
    }
  },
  data() {
    return {
      loading: true,
      professionals: [
        {
          id: 1,
          name: 'Susana Rodríguez Vargas',
          title: 'Psicóloga Sanitaria',
          location: 'Sevilla, España',
          image: 'https://s3-eu-west-1.amazonaws.com/doctoralia.es/doctor/6a4b06/6a4b061d2ee7c03a7a3c47e9ba497da4_large.jpg',
          specialties: ['Trastornos alimentarios', 'Trastornos emocionales', 'Terapia de pareja'],
          specialtyColors: ['purple', 'blue', 'pink'],
          price: 'Reserva inmediata en Doctoralia',
          priceRange: '',
          modalidad: 'hibrida',
          schedule: 'Consulta online y presencial',
          badge: '💬 Online y presencial',
          badgeColor: 'blue',
          buttonText: 'Reservar cita',
          buttonGradient: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
          officialUrl: 'https://www.doctoralia.es/susana-rodriguez-vargas/psicologo/sevilla#address-id=216584&is-online-only=false&filters%5Bspecializations%5D%5B%5D=60'
        },
        {
          id: 2,
          name: 'Alejandro Paz Fernández',
          title: 'Psicólogo',
          location: 'Sevilla, España',
          image: 'https://s3-eu-west-1.amazonaws.com/doctoralia.es/doctor/b46a06/b46a0697d7bc4a934c1e8c5490dbca9c_large.jpg',
          specialties: ['Ansiedad', 'Depresión', 'Autoestima'],
          specialtyColors: ['emerald', 'indigo', 'yellow'],
          price: 'Reserva en Doctoralia',
          priceRange: '',
          modalidad: 'hibrida',
          schedule: 'Consulta online y presencial',
          badge: '⭐ Perfil destacado',
          badgeColor: 'emerald',
          buttonText: 'Reservar cita',
          buttonGradient: 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800',
          officialUrl: 'https://www.doctoralia.es/alejandro-paz-fernandez-2/psicologo/sevilla#address-id=301854&is-online-only=false&filters%5Bspecializations%5D%5B%5D=60'
        },
        {
          id: 3,
          name: 'María del Mar Chaves Iglesias',
          title: 'Psicóloga',
          location: 'Sevilla, España',
          image: 'https://pixel-p2.s3.eu-central-1.amazonaws.com/doctor/avatar/5c3b006a/5c3b006a-57a3-4ba1-b192-ed420a661d54_large.jpg',
          specialties: ['Adultos', 'Ansiedad', 'Terapia individual'],
          specialtyColors: ['pink', 'blue', 'purple'],
          price: 'Reserva en Doctoralia',
          priceRange: '',
          modalidad: 'hibrida',
          schedule: 'Consulta online y presencial',
          badge: '💬 Online y presencial',
          badgeColor: 'purple',
          buttonText: 'Reservar cita',
          buttonGradient: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
          officialUrl: 'https://www.doctoralia.es/maria-del-mar-chaves-iglesias/psicologo/sevilla#address-id=294814&is-online-only=false&filters%5Bspecializations%5D%5B%5D=60'
        },
        {
          id: 4,
          name: 'Juan Antonio Verdugo',
          title: 'Psicólogo',
          location: 'Sevilla, España',
          image: 'https://s3-eu-west-1.amazonaws.com/doctoralia.es/doctor/e97657/e97657eb3308ca4f258164738a2f06cd_large.jpg',
          specialties: ['Ansiedad', 'Terapia de pareja', 'Estrés'],
          specialtyColors: ['indigo', 'emerald', 'orange'],
          price: 'Reserva en Doctoralia',
          priceRange: '',
          modalidad: 'hibrida',
          schedule: 'Consulta online y presencial',
          badge: '⭐ Perfil destacado',
          badgeColor: 'indigo',
          buttonText: 'Reservar cita',
          buttonGradient: 'from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800',
          officialUrl: 'https://www.doctoralia.es/juan-antonio-verdugo/psicologo/sevilla#address-id=107664&is-online-only=false&filters%5Bgender%5D%5B%5D=male&filters%5Bspecializations%5D%5B%5D=60'
        }
      ],
      filters: {
        specialty: '',
        price: '',
        modalidad: ''
      },
      allSpecialties: [],
      showFilters: false,
      clickedButtons: new Set()
    }
  },
  computed: {
    filteredProfessionals() {
      return this.professionals.filter(prof => {
        let matches = true;
        
        if (this.filters.specialty) {
          matches &= prof.specialties.some(s => 
            s.toLowerCase().includes(this.filters.specialty.toLowerCase())
          );
        }
        
        if (this.filters.price) {
          matches &= prof.priceRange === this.filters.price;
        }
        
        if (this.filters.modalidad) {
          matches &= prof.modalidad === this.filters.modalidad || 
                   (this.filters.modalidad === 'hibrida' && prof.modalidad === 'hibrida');
        }
        
        return matches;
      });
    }
  },
  mounted() {
    // Simular carga de datos
    setTimeout(() => {
      this.loading = false;
    }, 1500);
    
    // Extraer todas las especialidades únicas
    const specialtiesSet = new Set();
    this.professionals.forEach(prof => {
      prof.specialties.forEach(spec => specialtiesSet.add(spec));
    });
    this.allSpecialties = Array.from(specialtiesSet).sort();
  },
  methods: {
    getSpecialtyColorClass(color) {
      const colorMap = {
        blue: 'bg-blue-100 text-blue-800',
        purple: 'bg-purple-100 text-purple-800',
        orange: 'bg-orange-100 text-orange-800',
        green: 'bg-green-100 text-green-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        red: 'bg-red-100 text-red-800',
        pink: 'bg-pink-100 text-pink-800',
        indigo: 'bg-indigo-100 text-indigo-800',
        teal: 'bg-teal-100 text-teal-800'
      };
      return colorMap[color] || 'bg-gray-100 text-gray-800';
    },
    getBadgeColorClass(color) {
      const colorMap = {
        green: 'bg-green-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        indigo: 'bg-indigo-500',
        pink: 'bg-pink-500',
        emerald: 'bg-emerald-500'
      };
      return colorMap[color] || 'bg-gray-500';
    },
    clearFilters() {
      this.filters = {
        specialty: '',
        price: '',
        modalidad: ''
      };
    },
    handleButtonClick(profId) {
      this.clickedButtons.add(profId);
      // Simular feedback visual
      setTimeout(() => {
        this.clickedButtons.delete(profId);
      }, 200);
    }
  }
}
</script>

<style scoped>
/* Animaciones personalizadas */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 700ms ease, transform 700ms ease;
  transition-delay: var(--reveal-delay, 0ms);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out both;
}

.animate-pulse-ring {
  animation: pulse-ring 1s ease-out;
}

.shimmer {
  background: linear-gradient(
    90deg,
    transparent 25%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

/* Mejoras de hover mejoradas */
.card-hover {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Microinteracciones en botones */
.button-microinteraction {
  position: relative;
  overflow: hidden;
}

.button-microinteraction::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: width 0.6s, height 0.6s, top 0.6s, left 0.6s;
  transform: translate(-50%, -50%);
}

.button-microinteraction:active::before {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
}

/* Mejora del focus para accesibilidad */
.focus-ring:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
}

/* Patrón de fondo del hero */
.hero-pattern {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 2%, transparent 0%),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 2%, transparent 0%);
  background-size: 60px 60px;
}

/* Loading skeleton mejorado */
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Estados de focus mejorados para selects */
.enhanced-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

/* Animación de entrada para el contenido */
.stagger-container > * {
  opacity: 0;
  animation: fade-in-up 0.6s ease-out forwards;
}

.stagger-container > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-container > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-container > *:nth-child(3) { animation-delay: 0.3s; }
.stagger-container > *:nth-child(4) { animation-delay: 0.4s; }
.stagger-container > *:nth-child(5) { animation-delay: 0.5s; }
.stagger-container > *:nth-child(6) { animation-delay: 0.6s; }
</style>

