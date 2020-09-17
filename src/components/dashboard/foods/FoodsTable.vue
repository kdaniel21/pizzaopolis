<template>
  <v-data-table
    id="table"
    :headers="headers"
    :items="foods"
    :items-per-page="10"
    class="elevation-1"
    v-if="foods.length"
  >
    <template #item.name="{ item }">
      <text-edit-dialog
        v-model="item.name"
        default-text="Unknown"
        @close="updateItem(item, 'name')"
      />
    </template>

    <template #item.price="{ item }">
      <text-edit-dialog
        v-model.number="item.price"
        :number="true"
        @close="updateItem(item, 'price')"
      />
    </template>

    <template #item.discountedPrice="{ item }">
      <text-edit-dialog
        v-model.number="item.discountedPrice"
        :number="true"
        default-text="No discount price"
        @close="updateItem(item, 'discountedPrice')"
      />
    </template>

    <template #item.category="{ item }">
      <!-- TODO: REACT TO NEW ITEM EVENT -->
      <select-edit-dialog
        v-model="item.categories"
        :options="categories"
        default-text="No category"
        endpoint="/categories"
        @close="updateItem(item, 'categories')"
        @new-item="categories.push($event)"
        @delete="deleteItem($event, 'categories')"
      />
    </template>

    <template #item.ingredients="{ item }">
      <select-edit-dialog
        v-model="item.ingredients"
        :options="ingredients"
        default-text="No Ingredients"
        endpoint="/ingredients"
        :multiple="true"
        @close="updateItem(item, 'ingredients')"
        @new-item="ingredients.push($event)"
        @delete="deleteItem($event, 'ingredients')"
      />
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import TextEditDialog from './TextEditDialog';
import SelectEditDialog from './SelectEditDialog';

export default {
  name: 'FoodsTable',
  components: {
    TextEditDialog,
    SelectEditDialog
  },
  data() {
    return {
      foods: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Discounted Price', value: 'discountedPrice' },
        { text: 'Category', value: 'category' },
        { text: 'Ingredients', value: 'ingredients' }
      ],
      ingredients: [],
      categories: []
    };
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    updateItem(item, property) {
      // Sends only the updated property not the whole object
      axios
        .patch(`/foods/${item.id}`, { [property]: item[property] })
        .then(() => {})
        .catch(err => {
          console.log(err);
          this.showSnackbar({ text: 'Could not be updated!' });
        });
    },
    deleteItem(id, property) {
      const index = this[property].findIndex(item => item.id === id);

      if (index !== -1) {
        this[property].splice(index, 1);
      }
    }
  },
  created() {
    // FETCH FOODS
    axios.get('/foods/all').then(res => {
      this.foods = [...res.data.data];
    });

    // FETCH INGREDIENTS
    axios.get('/ingredients').then(res => {
      this.ingredients = res.data.data;
    });

    // FETCH CATEGORIES
    axios.get('/categories').then(res => {
      this.categories = res.data.data;
    });
  }
};
</script>
