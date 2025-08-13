<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="mb-6 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
            <svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Ayuda Inmediata Disponible
          </div>
          <h1 class="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Estamos aquí para
            <span class="text-yellow-300">ayudarte</span>
          </h1>
          <p class="mx-auto max-w-2xl text-xl text-blue-100">
            Encuentra recursos de apoyo inmediato, profesionales especializados y herramientas para cuidar tu bienestar mental. No estás solo en esto.
          </p>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <!-- Ayuda Inmediata -->
      <section class="mb-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">🚨 Ayuda Inmediata</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Si estás en crisis o necesitas apoyo urgente, estos recursos están disponibles 24/7</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <!-- Teléfono de la Esperanza -->
          <div class="bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all">
            <div class="flex items-start gap-4">
              <div class="rounded-full bg-red-100 p-3">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
          <div class="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 hover:shadow-xl transition-all">
            <div class="flex items-start gap-4">
              <div class="rounded-full bg-orange-100 p-3">
                <svg class="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
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

          <!-- Chat online -->
          <div class="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all">
            <div class="flex items-start gap-4">
              <div class="rounded-full bg-blue-100 p-3">
                <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-2">Chat Online</h3>
                <p class="text-gray-600 text-sm mb-3">Apoyo inmediato por chat</p>
                <a href="https://www.telefonodelaesperanza.org/chat" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Iniciar chat
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Email de contacto -->
        <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-emerald-100 p-3">
              <svg class="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">¿Prefieres escribir?</h3>
              <p class="text-gray-600 text-sm mb-2">También puedes contactarnos por email para apoyo personalizado</p>
              <a href="mailto:4tucode@gmail.com" class="text-emerald-600 font-medium hover:text-emerald-700">4tucode@gmail.com</a>
            </div>
          </div>
                </div>
      </section>

      <!-- Profesionales Disponibles -->
      <section>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">👥 Profesionales Especializados</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Conecta con psicólogos verificados. Muchos ofrecen primera consulta gratuita</p>
        </div>

        <!-- Sistema de Filtros -->
        <div class="mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
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
        <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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

        <!-- Lista de Profesionales con Animaciones Staggered -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div 
            v-for="(professional, index) in filteredProfessionals" 
            :key="professional.id"
            :style="{ animationDelay: `${index * 100}ms` }"
            class="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
          >
            <div class="relative overflow-hidden">
              <img 
                :src="professional.image" 
                :alt="professional.name" 
                class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div :class="['absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm font-medium transition-transform duration-300 group-hover:scale-110', getBadgeColorClass(professional.badgeColor)]">
                {{ professional.badge }}
              </div>
            </div>
            
            <div class="p-6">
              <div class="mb-4">
                <h3 class="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {{ professional.name }}
                </h3>
                <p class="text-emerald-600 font-medium mb-2">{{ professional.title }}</p>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  {{ professional.location }}
                </div>
              </div>
              
              <div class="mb-4">
                <h4 class="font-semibold text-gray-900 mb-2">Especialidades:</h4>
                <div class="flex flex-wrap gap-1.5 xl:gap-2">
                  <span 
                    v-for="(specialty, idx) in professional.specialties" 
                    :key="specialty"
                    :class="['px-2.5 py-1 rounded-full text-xs xl:text-sm transition-all duration-300 hover:scale-105 cursor-default whitespace-nowrap', getSpecialtyColorClass(professional.specialtyColors[idx])]"
                  >
                    {{ specialty }}
                  </span>
                </div>
              </div>

              <div class="mb-4 space-y-2">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                  Disponible: {{ professional.schedule }}
                </div>
                <div v-if="professional.phone" class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a :href="'tel:' + professional.phone" class="hover:text-blue-600 transition-colors">
                    {{ professional.phone }}
                  </a>
                </div>
                <div v-if="professional.email" class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a :href="'mailto:' + professional.email" class="hover:text-blue-600 transition-colors">
                    {{ professional.email }}
                  </a>
                </div>
                <div class="flex items-center gap-2 text-sm font-medium text-green-600">
                  <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                  </svg>
                  {{ professional.price }}
                </div>
              </div>

              <button 
                @click="handleButtonClick(professional.id)"
                class="w-full inline-flex items-center justify-center rounded-full border px-4 py-2.5 text-sm font-medium text-purple-700 bg-white border-purple-200/60 shadow-sm hover:shadow transition-all duration-200 ease-out"
              >
                {{ professional.buttonText }}
              </button>
            </div>
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

        <!-- Más profesionales -->
        <div class="text-center mt-12">
          <button class="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-gray-700 bg-white border-gray-200/60 shadow-sm hover:shadow transition-all duration-200 ease-out">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Ver Más Profesionales
          </button>
        </div>
  </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpView',
  data() {
    return {
      loading: true,
      professionals: [
        {
          id: 1,
          name: 'Dra. María González',
          title: 'Psicóloga Clínica Colegiada',
          location: 'Valencia, España',
          image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialties: ['Ansiedad', 'Depresión', 'Estrés'],
          specialtyColors: ['blue', 'purple', 'orange'],
          price: 'Primera visita gratis',
          priceRange: 'gratis',
          modalidad: 'presencial',
          schedule: 'Lun-Vie 9:00-18:00',
          phone: '+34 963 123 456',
          badge: '✨ Primera visita gratis',
          badgeColor: 'green',
          buttonText: 'Reservar Consulta Gratuita',
          buttonGradient: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
        },
        {
          id: 2,
          name: 'Dr. Carlos Ruiz',
          title: 'Psicólogo Especialista en Adolescentes',
          location: 'Madrid, España',
          image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialties: ['Adolescentes', 'Autoestima', 'Bullying'],
          specialtyColors: ['green', 'yellow', 'red'],
          price: '50€/sesión',
          priceRange: 'medio',
          modalidad: 'online',
          schedule: 'Lun-Sáb 10:00-20:00',
          email: 'carlos.ruiz@psicologia.es',
          badge: '💬 Consulta online',
          badgeColor: 'blue',
          buttonText: 'Agendar Cita Online',
          buttonGradient: 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
        },
        {
          id: 3,
          name: 'Dra. Ana López',
          title: 'Psicóloga Especialista en Terapia Cognitiva',
          location: 'Barcelona, España',
          image: 'https://images.unsplash.com/photo-1594824475317-d79ffe302f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialties: ['Terapia Cognitiva', 'Pánico', 'Mindfulness'],
          specialtyColors: ['pink', 'indigo', 'teal'],
          price: '80€/sesión',
          priceRange: 'alto',
          modalidad: 'presencial',
          schedule: 'Mar-Vie 9:00-17:00',
          phone: '+34 934 567 890',
          badge: '🏠 Consulta presencial',
          badgeColor: 'purple',
          buttonText: 'Solicitar Información',
          buttonGradient: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
        },
        {
          id: 4,
          name: 'Dr. Javier Moreno',
          title: 'Psicólogo Especialista en Trauma',
          location: 'Sevilla, España',
          image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialties: ['Trauma', 'EMDR', 'Estrés Postraumático'],
          specialtyColors: ['red', 'purple', 'orange'],
          price: '70€/sesión',
          priceRange: 'alto',
          modalidad: 'hibrida',
          schedule: 'Lun-Jue 16:00-21:00',
          phone: '+34 954 123 789',
          badge: '🔄 Online y Presencial',
          badgeColor: 'indigo',
          buttonText: 'Reservar Cita',
          buttonGradient: 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
        },
        {
          id: 5,
          name: 'Dra. Carmen Ruiz',
          title: 'Psicóloga Infantil y de Familia',
          location: 'Bilbao, España',
          image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialties: ['Psicología Infantil', 'Terapia Familiar', 'TDAH'],
          specialtyColors: ['blue', 'green', 'yellow'],
          price: '60€/sesión',
          priceRange: 'medio',
          modalidad: 'presencial',
          schedule: 'Mar-Sáb 9:00-15:00',
          email: 'carmen.ruiz@infantil.es',
          badge: '👶 Especialista Infantil',
          badgeColor: 'pink',
          buttonText: 'Consultar Disponibilidad',
          buttonGradient: 'from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800'
        },
        {
          id: 6,
          name: 'Dr. Miguel Fernández',
          title: 'Psicólogo Especialista en Adicciones',
          location: 'Valencia, España',
          image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          specialties: ['Adicciones', 'Desintoxicación', 'Terapia Grupal'],
          specialtyColors: ['orange', 'red', 'purple'],
          price: 'Primera consulta gratis',
          priceRange: 'gratis',
          modalidad: 'online',
          schedule: 'Lun-Vie 18:00-22:00',
          phone: '+34 963 987 654',
          badge: '🆓 Primera consulta gratis',
          badgeColor: 'emerald',
          buttonText: 'Reservar Consulta Gratuita',
          buttonGradient: 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
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

