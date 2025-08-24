<template>
  <section class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold">Política de privacidad</h1>
    <p class="mt-2 text-gray-700">Última versión: v1.0</p>

    <article class="prose prose-sm sm:prose lg:prose-lg mt-6">
      <h2>1. Responsable</h2>
      <p>Responsable del tratamiento: <strong>[Nombre/Razón Social]</strong> · NIF: <strong>[NIF]</strong> · Dirección: <strong>[Dirección completa]</strong> · Email DPO (si aplica): <strong>[Email]</strong>.</p>

      <h2>2. Finalidad del tratamiento</h2>
      <p>Gestionar el registro de usuarios, permitir el acceso a la aplicación y mostrar resultados de autoevaluaciones orientativas (no sanitarias).</p>

      <h2>3. Base jurídica</h2>
      <p>Consentimiento del usuario para la creación de cuenta y tratamiento mínimo necesario (art. 6.1.a RGPD).</p>

      <h2>4. Conservación</h2>
      <p>Los datos se conservarán mientras el usuario mantenga su cuenta activa y, en su caso, durante los plazos exigidos por ley.</p>

      <h2>5. Destinatarios y encargados</h2>
      <p>Se emplean servicios de Firebase (Google LLC) como encargado del tratamiento. Puede existir transferencia internacional con Cláusulas Contractuales Tipo y medidas complementarias de Google.</p>

      <h2>6. Derechos ARSOPL</h2>
      <p>El usuario puede ejercer sus derechos de Acceso, Rectificación, Supresión, Oposición, Portabilidad y Limitación enviando solicitud a <strong>[Email de contacto]</strong>.</p>

      <h2>7. Medidas de seguridad</h2>
      <p>Se aplican medidas técnicas y organizativas adecuadas, incluyendo autenticación con verificación de email y reglas de seguridad en Firestore para proteger datos personales.</p>

      <h2>8. Cookies</h2>
      <p>Se utilizan cookies técnicas y, en su caso, analíticas. Consulta la <router-link :to="{ name: 'cookies' }">Política de cookies</router-link>. Configuración de cookies: <em>en desarrollo</em>.</p>

      <h2>9. Contacto</h2>
      <p>Para cuestiones sobre privacidad, escribe a <strong>[Email de contacto]</strong>.</p>
    </article>
  </section>
</template>

<script>
export default { name: 'PrivacyView' };
</script>

<style scoped>
</style>