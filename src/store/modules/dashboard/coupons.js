import axios from 'axios';

export default {
  namespaced: true,

  state: {
    coupons: [],
    editedCoupon: null
  },
  getters: {
    activeCoupons: state => {
      if (!state.coupons || !state.coupons.length) return [];

      return state.coupons.filter(
        coupon => coupon.valid && coupon.maxTimesUsed > 1
      );
    },
    oldAndOneTimeCoupons: state => {
      if (!state.coupons) return [];

      return state.coupons.filter(
        coupon => !coupon.valid || coupon.maxTimesUsed === 1
      );
    }
  },
  mutations: {
    setCoupons: (state, coupons) => {
      state.coupons = [...coupons];
    },
    startEditCoupon: (state, coupon) => {
      state.editedCoupon = { ...coupon };
    },
    updateCoupon: (state, coupon) => {
      if (!state.coupons || !state.coupons.length) {
        return (state.coupons = [...coupon]);
      }

      const index = state.coupons.findIndex(item => item.id === coupon.id);
      if (index === -1) {
        return state.coupons.push(coupon);
      }

      state.coupons.splice(index, 1, coupon);
    }
  },
  actions: {
    getCoupons: ({ commit }) => {
      axios.get('/coupons').then(res => {
        commit('setCoupons', res.data.data);
      });
    },
    editCoupon: ({ commit }, coupon) => {
      commit('startEditCoupon', coupon);
    },
    updateCoupon: ({ commit }, coupon) => {
      commit('updateCoupon', coupon);
    }
  }
};
