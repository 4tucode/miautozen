# miautozen

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

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
