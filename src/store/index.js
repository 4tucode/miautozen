import { createStore } from "vuex";
import { watchAuth, logout } from "@/services/auth";

export default createStore({
  state: {
    usuario: null,          // { uid, nombre, email, rol }
    cargandoUsuario: true,  // mientras no sepamos el estado real
  },
  getters: {
    isAuth: (s) => !!s.usuario,
    isAdmin: (s) => s.usuario?.rol === "admin",
    perfil: (s) => s.usuario,
  },
  mutations: {
    SET_USUARIO(state, payload) { state.usuario = payload; },
    SET_CARGANDO_USUARIO(state, v) { state.cargandoUsuario = v; },
  },
  actions: {
    // Devuelve una promesa que se resuelve al PRIMER onAuthStateChanged
    initAuth({ commit }) {
      return new Promise((resolve) => {
        let resolved = false;
        // watchAuth devuelve el unsubscribe
        // eslint-disable-next-line no-unused-vars
        const off = watchAuth((data) => {
          commit("SET_USUARIO", data);              // data = { uid, ...perfil } o null
          commit("SET_CARGANDO_USUARIO", false);

          if (!resolved) {
            resolved = true;
            resolve(); // avisamos a main.js para montar la app
          }
          // Mantenemos la suscripción para reaccionar a futuros cambios de sesión.
          // Si prefieres resolver y desuscribirte: descomenta la siguiente línea.
          // off && off();
        });
      });
    },
    async signOut({ commit }) {
      await logout();
      commit("SET_USUARIO", null);
    },
  },
  modules: {},
});
