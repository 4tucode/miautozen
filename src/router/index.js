import { createRouter, createWebHistory } from 'vue-router';
import { useToast } from 'vue-toastification';

import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Inicio',
      description: 'MiAutoZen: evalúa, mejora y sigue tu bienestar automotriz con resultados claros y recursos prácticos.',
      robots: 'index, follow'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guest: true, title: 'Iniciar sesión', description: 'Accede a tu cuenta de MiAutoZen.', robots: 'noindex, nofollow' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { guest: true, title: 'Crear cuenta', description: 'Crea tu cuenta para empezar a usar MiAutoZen.', robots: 'noindex, nofollow' }
  },
  {
    path: '/assessment/:slug',
    name: 'assessment',
    component: () => import('@/views/AssessmentView.vue'),
    meta: { auth: true, title: 'Evaluación', description: 'Completa tu evaluación personalizada.', robots: 'noindex, nofollow' }
  },
  {
    path: '/assessment/summary',
    name: 'assessment-summary',
    component: () => import('@/views/summaryView.vue'),
    meta: { auth: true, title: 'Resumen de evaluación', description: 'Resumen de tus resultados.', robots: 'noindex, nofollow' }
  },
  {
    path: '/assessment/domain/:domain',
    name: 'domain-assessment',
    component: () => import('@/views/DomainAssessmentView.vue'),
    meta: { auth: true, title: 'Evaluación por dominio', description: 'Evalúa un dominio específico.', robots: 'noindex, nofollow' }
  },
  {
    path: '/assessment/domain/:domain/summary',
    name: 'domain-summary',
    component: () => import('@/views/DomainSummaryView.vue'),
    meta: { auth: true, title: 'Resumen por dominio', description: 'Resumen por dominio.', robots: 'noindex, nofollow' }
  },
  {
    path: '/results',
    name: 'results',
    component: () => import('@/views/ResultsView.vue'),
    meta: { auth: true, title: 'Resultados', description: 'Resultados detallados de tu evaluación.', robots: 'noindex, nofollow' }
  },
  {
    path: '/ayuda',
    name: 'help',
    component: () => import('@/views/HelpView.vue'),
    meta: { title: 'Ayuda', description: 'Encuentra respuestas y guía para usar MiAutoZen.', robots: 'index, follow' }
  },
  {
    path: '/recursos',
    name: 'resources',
    component: () => import('@/views/ResourcesView.vue'),
    meta: { title: 'Recursos', description: 'Recursos útiles para mejorar tu experiencia con MiAutoZen.', robots: 'index, follow' }
  },
  {
    path: '/sobre',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'Sobre MiAutoZen', description: 'Conoce el propósito y al creador de MiAutoZen.', robots: 'index, follow' }
  },
  {
    path: '/contacto',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Contacto', description: 'Ponte en contacto con el equipo de MiAutoZen.', robots: 'index, follow' }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function upsertMetaTagByName(name, content) {
  if (!content && content !== '') return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertMetaTagByProperty(property, content) {
  if (!content && content !== '') return;
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(url) {
  if (!url) return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

router.afterEach((to) => {
  const siteName = 'MiAutoZen';
  const title = to.meta?.title ? `${to.meta.title} | ${siteName}` : siteName;
  const description = to.meta?.description || 'MiAutoZen: evalúa, mejora y sigue tu bienestar automotriz.';
  const robots = to.meta?.robots || (to.meta?.auth ? 'noindex, nofollow' : 'index, follow');
  const absoluteUrl = `${window.location.origin}${to.fullPath}`;

  document.title = title;
  upsertMetaTagByName('description', description);
  upsertMetaTagByName('robots', robots);
  upsertCanonical(absoluteUrl);

  // Open Graph / Twitter
  upsertMetaTagByProperty('og:type', 'website');
  upsertMetaTagByProperty('og:title', title);
  upsertMetaTagByProperty('og:description', description);
  upsertMetaTagByProperty('og:url', absoluteUrl);
  upsertMetaTagByName('twitter:card', 'summary');
  upsertMetaTagByName('twitter:title', title);
  upsertMetaTagByName('twitter:description', description);
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
    return next();
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
