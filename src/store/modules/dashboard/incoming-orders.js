import axios from 'axios';

export default {
  namespaced: true,
  state: {
    incomingOrders: []
  },
  mutations: {
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
    }
  },
  actions: {
    getIncomingOrders: ({ commit }) => {
      axios.get('/orders').then(res => {
        commit('setIncomingOrders', res.data.data);
      });
    },
    toggleFoodReady: ({ commit }, { orderId, foodName }) => {
      commit('toggleFoodReady', { orderId, foodName });
    }
  }
};
