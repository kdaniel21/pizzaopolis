import localStorageHandler from '@/helpers/localStorageHandler';

export default {
  namespaced: true,

  state: {
    orders: [],
    coupon: null,
    shippingInformation: null,
    billingInformation: null
  },
  getters: {
    // Calculate the amount to be paid
    total: state => {
      const total = state.orders.reduce(
        (prev, curr) => +prev + +curr.currentPrice * +curr.quantity,
        0
      );

      const { coupon } = state;
      if (!coupon) return total;

      // Calculate discount
      let discount =
        coupon.type === 'percent' ? total * (coupon.value / 100) : coupon.value;

      // Apply discount (can't go below 0)
      return total - discount >= 0 ? total - discount : 0;
    },
    completeOrder: state => {
      const food = state.orders.map(order => {
        return { id: order.id, quantity: order.quantity };
      });
      return {
        food,
        coupon: state.coupon ? state.coupon.code : null,
        shippingInformation: state.shippingInformation,
        billingInformation: state.billingInformation
      };
    }
  },
  mutations: {
    recoverState: (state, recoveredState) => {
      Object.assign(state, recoveredState);
    },
    // Add new item to the order
    addOrderItem: (state, orderItem) => {
      const index = state.orders.findIndex(item => item.id === orderItem.id);

      // Add item if new
      if (index === -1) {
        return state.orders.push({
          ...orderItem,
          quantity: 1
        });
      }

      // Increase quantity if already contains
      return state.orders[index].quantity++;
    },
    // Remove item from the order (if quantity > 1 -> reduces by 1)
    removeOrderItem: (state, id) => {
      const index = state.orders.findIndex(item => item.id === id);

      // Reduce quantity
      if (state.orders[index].quantity > 1) {
        return state.orders[index].quantity--;
      }

      // Remove item totally
      return state.orders.splice(index, 1);
    },
    // Set Coupon
    setCoupon: (state, coupon) => {
      state.coupon = coupon;
    },
    setshippingInformation: (state, address) => {
      state.shippingInformation = address;
    },
    setbillingInformation: (state, address) => {
      state.billingInformation = address;
    }
  },
  actions: {
    recoverState: async ({ commit }) => {
      const recoveredState = await localStorageHandler.recoverState(
        'unfinished-order'
      );
      commit('recoverState', recoveredState);
    },
    addOrderItem: ({ commit }, orderItem) => {
      commit('addOrderItem', orderItem);

      // Save to LS
      localStorageHandler.saveOrderItem('unfinished-order', orderItem);
    },
    removeOrderItem: ({ commit }, orderItem) => {
      commit('removeOrderItem', orderItem.id);

      localStorageHandler.removeOrderItem('unfinished-order', orderItem.id);
    },
    setCoupon: ({ commit }, coupon) => {
      commit('setCoupon', coupon);

      // Save only the code the LS -> gets validated by the server anyways
      localStorageHandler.saveItem('unfinished-order', 'coupon', coupon);
    },
    setshippingInformation: ({ commit }, address) => {
      commit('setshippingInformation', address);

      // Save to local storage
      // To the current order that gets deleted after successful
      localStorageHandler.saveItem(
        'unfinished-order',
        'shippingInformation',
        address
      );
      // To addresses to make it easy to retrieve in the future
      localStorageHandler.saveAddress('addresses', address);
    },
    setbillingInformation: ({ commit }, address) => {
      commit('setbillingInformation', address);

      // Save to local storage
      localStorageHandler.saveItem(
        'unfinished-order',
        'billingInformation',
        address
      );
    }
  }
};
