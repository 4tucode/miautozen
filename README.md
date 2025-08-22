# Miautozen

Este proyecto es una app Vue 3 con Vue Router 4, Vuex 4 y Firebase.

## Verificación de email y cumplimiento legal

- Registro envía verificación: al crear cuenta se envía un correo de verificación. Tras registrarse se redirige a `/verificar-email`.
- Acceso a rutas protegidas: requiere sesión iniciada y email verificado. Si no está verificado, se redirige a `/verificar-email`.
- Reenvío: desde `/verificar-email` se puede reenviar el email de verificación.
- Consentimiento: en el registro es obligatorio aceptar Términos y Privacidad. Se guarda `tosAcceptedAt` y `tosVersion` en `usuarios/{uid}`.
- Páginas legales: disponibles en `/terminos`, `/privacidad` y `/cookies` con contenido base y placeholders.
- Reglas Firestore: requieren `email_verified` para leer/escribir en colecciones sensibles.

### Pasos de prueba manual

1. Registro → comprobar que llega correo de verificación y redirección a `/verificar-email`.
2. Intentar acceder a ruta protegida sin verificar → redirige y avisa.
3. Verificación con `oobCode` → estado actualizado, acceso permitido.
4. Footer muestra enlaces a Términos/Privacidad/Cookies.
5. Firestore Rules: crear documentos en `resultados` solo funciona con email verificado.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Calidad de código

- Linter: ESLint (Vue 3) con reglas principales activas:
  - no-unused-vars (error), no-undef (error)
  - no-console (warn en prod; permitido console.error)
  - eqeqeq, curly (multi-line), consistent-return
  - import/order (grupos y salto entre grupos)

- Ejecutar lint (sin avisos máximos):
```
npx eslint --ext .js,.vue src --max-warnings=0
```

- Autofix sugerido:
```
npx eslint --ext .js,.vue src --fix
```

- Commits: Convencional Commits (ej.: `chore(lint): ...`, `fix(auth): ...`).

- Pruebas manuales:
  - `npm run serve`
  - Rutas principales: `/` (home), `/login`, `/register`, `/assessment/:slug`, `/results`.
  - Autenticación: verificar redirecciones de guest/auth y flujo de login.
