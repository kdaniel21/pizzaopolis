import axios from 'axios';

// Uses mostly generic functions
// Since both ingredients and categories have the same operations
// To reduce redundant code
// Usually the property argument determines what to modify (foods/categories/ingredients)

export default {
  namespaced: true,
  state: {
    foods: [],
    ingredients: [],
    categories: []
  },
  getters: {},
  mutations: {
    setItem: (state, { property, item }) => {
      state[property] = [...item];
    },
    addItem: (state, { property, item }) => {
      state[property].push({ ...item });
    },
    updateItem: (state, { property, item }) => {
      const index = state[property].findIndex(
        stateItem => stateItem.id === item.id
      );

      if (index !== -1) {
        state[property][index] = { ...item };
      }
    },
    deleteItem: (state, { property, id }) => {
      const index = state[property].findIndex(item => item.id === id);

      if (index !== -1) {
        state[property].splice(index, 1);
      }
    }
  },
  actions: {
    getAll: ({ dispatch }) => {
      const properties = ['foods', 'ingredients', 'categories'];
      properties.forEach(property => dispatch('getItem', property));
    },
    getItem: ({ commit }, property) => {
      axios.get(`/${property}`).then(res => {
        commit('setItem', { property, item: res.data.data });
      });
    },
    updateFood: ({ commit }, { updatedProperty, item }) => {
      axios
        .patch(`/foods/${item.id}`, {
          [updatedProperty]: item[updatedProperty]
        })
        .then(res => {
          commit('updateItem', {
            property: 'foods',
            item: res.data.data
          });
        })
        .catch(err => console.log(err));
    },
    addItem: ({ commit }, { property, item }) => {
      console.log('Added item', item);
      axios.post(`/${property}`, item).then(res => {
        commit('addItem', { property, item: res.data.data });
      });
    },
    updateItem: ({ commit }, { property, item }) => {
      axios.patch(`/${property}/${item.id}`, item).then(res => {
        commit('updateItem', { property, item: res.data.data });
      });
    },
    deleteItem: ({ commit }, { property, id }) => {
      axios.delete(`/${property}/${id}`).then(() => {
        commit('deleteItem', { property, id });
      });
    }
  }
};
