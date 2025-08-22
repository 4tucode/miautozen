<template>
  <section class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold">Verificación de email</h1>
    <p class="mt-2 text-gray-700">Confirma tu dirección de correo para activar tu cuenta.</p>

    <div class="mt-6 rounded-lg border bg-white/80 p-6">
      <div v-if="status==='verifying'" role="status" aria-live="polite" class="text-sm text-gray-700">Verificando…</div>
      <div v-else-if="status==='verified'" role="status" aria-live="polite" class="text-sm text-green-700">
        ¡Tu email ha sido verificado correctamente! Ya puedes acceder a todas las funciones.
      </div>
      <div v-else-if="status==='error'" role="status" aria-live="polite" class="text-sm text-red-700">
        No se pudo verificar el email. El enlace puede haber expirado o ser inválido.
      </div>
      <div v-else role="status" aria-live="polite" class="text-sm text-gray-700">
        Revisa tu correo y sigue el enlace de verificación que te enviamos.
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <button @click="resend" :disabled="sending" aria-live="polite" class="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium text-purple-700 bg-white border-purple-200/60 shadow-sm hover:shadow disabled:opacity-60">
          {{ sending ? 'Enviando…' : 'Reenviar verificación' }}
        </button>
        <router-link :to="nextResolved || { name: 'home' }" class="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium text-gray-700 bg-white border-gray-200 shadow-sm hover:shadow">
          Ir al inicio
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { useToast } from 'vue-toastification';

import { applyActionCode, reload, sendEmailVerification } from 'firebase/auth';

import { auth } from '@/firebase';

export default {
  name: 'VerificationView',
  data() {
    return {
      status: 'idle', // idle | verifying | verified | error
      sending: false,
    };
  },
  computed: {
    nextResolved() {
      const next = this.$route.query.next;
      if (!next) return null;
      try { return this.$router.resolve(next).route; } catch (e) { return null; }
    }
  },
  async mounted() {
    const oobCode = this.$route.query.oobCode;
    const mode = this.$route.query.mode;
    if (mode === 'verifyEmail' && oobCode) {
      this.status = 'verifying';
      try {
        await applyActionCode(auth, oobCode);
        if (auth.currentUser) {
          try { await reload(auth.currentUser); } catch (e) { void e; }
        }
        this.status = 'verified';
        const toast = useToast();
        toast.success('Email verificado. ¡Gracias!');
        if (this.nextResolved) {
          setTimeout(() => this.$router.replace(this.nextResolved), 800);
        }
      } catch (e) {
        this.status = 'error';
        const toast = useToast();
        toast.error('No se pudo verificar el email. Pide un nuevo enlace.');
      }
    }
  },
  methods: {
    async resend() {
      this.sending = true;
      const toast = useToast();
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('Debes iniciar sesión para reenviar verificación');
        await sendEmailVerification(user);
        toast.info('Hemos reenviado el email de verificación.');
      } catch (e) {
        toast.error('No se pudo reenviar el email de verificación.');
      }
      this.sending = false;
    }
  }
};
</script>

<style scoped>
</style>