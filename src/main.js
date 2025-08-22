import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import './assets/tailwind.css';
import router from './router';
import store from './store';

// Espera a conocer el estado de auth ANTES de montar la app
store.dispatch('initAuth').then(() => {
  createApp(App)
    .use(store)
    .use(router)
    .use(Toast, {
      position: 'top-right',
      timeout: 3500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,
      rtl: false,
      maxToasts: 4,
      newestOnTop: true,
    })
    .mount('#app');
});
