import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import { useToast } from 'vue-toastification';

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue'), meta: { guest: true } },
  { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue'), meta: { guest: true } },
  { path: '/assessment/:slug', name: 'assessment', component: () => import('@/views/AssessmentView.vue'), meta: { auth: true } },
  { path:'/assessment/summary', name:'assessment-summary', component: () => import('@/views/summaryView.vue'), meta: { auth: true } },
  { path: '/assessment/domain/:domain', name: 'domain-assessment', component: () => import('@/views/DomainAssessmentView.vue'), meta: { auth: true } },
  { path: '/assessment/domain/:domain/summary', name: 'domain-summary', component: () => import('@/views/DomainSummaryView.vue'), meta: { auth: true } },
  { path: '/results', name: 'results', component: () => import('@/views/ResultsView.vue'), meta: { auth: true } },
  { path: '/ayuda', name: 'help', component: () => import('@/views/HelpView.vue') },
  { path: '/recursos', name: 'resources', component: () => import('@/views/ResourcesView.vue') },
  { path: '/sobre', name: 'about', component: () => import('@/views/AboutView.vue') },
  { path: '/contacto', name: 'contact', component: () => import('@/views/ContactView.vue') },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guard que espera a que termine la carga de usuario
router.beforeEach((to, from, next) => {
  const toast = useToast();
  const proceed = () => {
    const isAuth = store.getters.isAuth;

    if (to.meta?.auth && !isAuth) {
      // guarda a dónde quería ir para volver después del login
      toast.warning('Debes iniciar sesión para continuar');
      return next({ name: 'login', query: { next: to.fullPath } });
    }
    if (to.meta?.guest && isAuth) {
      return next({ name: 'home' });
    }
    next();
  };

  // Si todavía estamos cargando el usuario, espera
  if (store.state.cargandoUsuario) {
    const unwatch = store.watch(
      (s) => s.cargandoUsuario,
      (v) => {
        if (!v) {
          unwatch();
          proceed();
        }
      }
    );
  } else {
    proceed();
  }
});

export default router;
