<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-2 gap-10 items-center min-h-[70vh] py-12">
      <!-- Izquierda: texto inspiracional -->
      <div class="space-y-6">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          <span class="bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">Comienza hoy</span> con un paso
        </h1>
        <p class="text-gray-700 text-lg max-w-prose">
          Crear una cuenta te ayudará a seguir tu progreso y recibir recomendaciones personalizadas para tu bienestar.
        </p>
        <ul class="text-gray-700 space-y-2">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 rounded-full bg-purple-500"></span>
            La constancia pequeña supera la motivación esporádica.
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 rounded-full bg-purple-500"></span>
            Tu bienestar merece un espacio propio.
          </li>
        </ul>
      </div>

      <!-- Derecha: formulario de registro -->
      <div class="md:justify-self-end w-full max-w-md md:w-[28rem]">
        <form @submit.prevent="submit" class="bg-white/80 backdrop-blur rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Crear cuenta</h2>
            <p class="mt-1 text-sm text-gray-600">Únete a Miautozen</p>
          </div>

          <!-- Nombre -->
          <div class="space-y-1">
            <label for="nombre" class="text-sm font-medium text-gray-700">Nombre</label>
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                <!-- Icono usuario -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                  <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-3.866 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7Z"/>
                </svg>
              </span>
              <input id="nombre" v-model="nombre" required class="block w-full rounded-md border border-gray-300 bg-white/70 px-3 py-2 pl-10 text-gray-900 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring-purple-500" placeholder="Tu nombre" />
            </div>
          </div>

          <!-- Email -->
          <div class="mt-4 space-y-1">
            <label for="email" class="text-sm font-medium text-gray-700">Email</label>
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                <!-- Icono email -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                  <path d="M1.5 8.67v8.58a2.25 2.25 0 0 0 2.25 2.25h16.5a2.25 2.25 0 0 0 2.25-2.25V8.67L12 13.5 1.5 8.67Z"/>
                  <path d="M22.5 6.908V6.75A2.25 2.25 0 0 0 20.25 4.5H3.75A2.25 2.25 0 0 0 1.5 6.75v.158L12 11.25l10.5-4.342Z"/>
                </svg>
              </span>
              <input id="email" v-model="email" type="email" required class="block w-full rounded-md border border-gray-300 bg-white/70 px-3 py-2 pl-10 text-gray-900 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring-purple-500" placeholder="tu@email.com" />
            </div>
          </div>

          <!-- Password -->
          <div class="mt-4 space-y-1">
            <label for="password" class="text-sm font-medium text-gray-700">Contraseña</label>
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                <!-- Icono candado -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                  <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3A3.75 3.75 0 0 0 3 13.5v6A3.75 3.75 0 0 0 6.75 23.25h10.5A3.75 3.75 0 0 0 21 19.5v-6a3.75 3.75 0 0 0-3.75-3.75v-3A5.25 5.25 0 0 0 12 1.5Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" />
                </svg>
              </span>
              <input id="password" v-model="password" type="password" required minlength="6" class="block w-full rounded-md border border-gray-300 bg-white/70 px-3 py-2 pl-10 text-gray-900 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring-purple-500" placeholder="Crea una contraseña" />
            </div>
          </div>

          <div class="mt-6">
            <button :disabled="loading" class="w-full inline-flex justify-center rounded-full border px-4 py-2.5 text-sm font-medium text-purple-700 bg-white border-purple-200/60 shadow-sm hover:shadow transition-all duration-200 ease-out disabled:opacity-60 disabled:cursor-not-allowed">
              {{ loading ? 'Creando…' : 'Registrarse' }}
            </button>
            <!-- <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p> -->
            <p class="mt-4 text-sm text-gray-700">¿Ya tienes cuenta? <router-link :to="{ name: 'login' }" class="font-semibold text-purple-700 hover:text-purple-800">Entrar</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { useToast } from 'vue-toastification';

import { register } from "@/services/auth";
export default {
  data() { return { nombre: "", email: "", password: "", loading: false, error: "" } },
  methods: {
    mapAuthError(error) {
      const code = error?.code || '';
      switch (code) {
        case 'auth/email-already-in-use':
          return 'Este email ya está en uso.';
        case 'auth/invalid-email':
          return 'El email no es válido.';
        case 'auth/weak-password':
          return 'La contraseña es demasiado débil (mínimo 6 caracteres).';
        default:
          return 'No se pudo crear la cuenta. Inténtalo de nuevo.';
      }
    },
    async submit() {
      this.loading = true; this.error = "";
      try {
        await register({ nombre: this.nombre, email: this.email, password: this.password });
        const next = this.$route.query.next || { name: "home" };
        this.$router.push(next);
        const toast = useToast();
        toast.success('Cuenta creada con éxito');
      } catch (e) {
        const msg = this.mapAuthError(e);
        this.error = msg;
        const toast = useToast();
        toast.error(msg);
      }
      this.loading = false;
    }
  }
}
</script>

<style scoped>
/* Estilos propios mínimos; Tailwind gestiona el resto */
</style>
