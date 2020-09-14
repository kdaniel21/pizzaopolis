import Vue from 'vue';
import Vuex from 'vuex';
import order from './modules/order';
import dashboard from './modules/dashboard';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Global snackbar
    snackbar: {
      text: null,
      timeout: 4000,
      visible: false,
      btnText: 'OKAY'
    }
  },
  mutations: {
    // Global snackbar
    showSnackbar(state, payload) {
      state.snackbar.text = payload.text;

      if (payload.timeout) {
        state.snackbar.timeout = payload.timeout;
      }

      if (payload.btnText) {
        state.snackbar.btnText = payload.btnText;
      }

      state.snackbar.visible = true;
    },
    closeSnackbar(state) {
      state.snackbar.visible = false;
      state.snackbar.text = null;
      state.snackbar.timeout = 4000;
    }
  },
  actions: {},
  modules: {
    order,
    dashboard
  }
});
