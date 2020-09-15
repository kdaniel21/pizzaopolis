import axios from 'axios';

export default {
  namespaced: true,

  state: {
    user: null,
    incomingOrders: [],
    coupons: [],
    editedCoupon: null
  },
  getters: {
    isLoggedIn: state => !!state.user && !!Object.keys(state.user).length,
    activeCoupons: state => {
      console.log('triggered');
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
    setUser: (state, user) => {
      state.user = { ...user };
    },
    setIncomingOrders: (state, orders) => {
      // Add helper field to every food + flatten quantity/remove pivot
      orders = orders.map(order => {
        return {
          ...order,
          foods: order.foods.map(food => {
            return {
              ...food,
              ready: false,
              quantity: food.pivot.quantity,
              pivot: undefined
            };
          })
        };
      });

      state.incomingOrders = [...orders];
    },
    toggleFoodReady: (state, { orderId, foodName }) => {
      const { incomingOrders } = state;
      const orderIndex = incomingOrders.findIndex(
        order => order.id === orderId
      );
      const foodIndex = incomingOrders[orderIndex].foods.findIndex(
        food => food.name === foodName
      );

      incomingOrders[orderIndex].foods[foodIndex].ready = !incomingOrders[
        orderIndex
      ].foods[foodIndex].ready;
    },
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
    getUser: async ({ commit }) => {
      try {
        const res = await axios.get('/user');
        commit('setUser', res.data.data);
        // eslint-disable-next-line no-empty
      } catch (err) { }
    },
    logout: ({ commit }) => {
      axios.post('/logout', {}).then(() => {
        commit('setUser', null);
        this.$router.push('/login');
      });
    },
    getIncomingOrders: ({ commit }) => {
      axios.get('/orders').then(res => {
        commit('setIncomingOrders', res.data.data);
      });
    },
    toggleFoodReady: ({ commit }, { orderId, foodName }) => {
      commit('toggleFoodReady', { orderId, foodName });
    },
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
