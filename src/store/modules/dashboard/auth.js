import axios from 'axios';
import router from '@/router/index';

export default {
  namespaced: true,

  state: {
    user: null
  },
  getters: {
    isLoggedIn: state => !!state.user && !!Object.keys(state.user).length
  },
  mutations: {
    setUser: (state, user) => {
      state.user = { ...user };
    }
  },
  actions: {
    getUser: async ({ commit }) => {
      try {
        const res = await axios.get('/user');
        commit('setUser', res.data.data);
        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
    logout: ({ commit }) => {
      axios.post('/logout', {}).then(() => {
        commit('setUser', null);
        router.push({ name: 'auth' });
      });
    }
  }
};
