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
        @save="updateItem(item, 'name')"
      />
    </template>

    <template #item.price="{ item }">
      <text-edit-dialog
        v-model.number="item.price"
        :number="true"
        @save="updateItem(item, 'price')"
      />
    </template>

    <template #item.discountedPrice="{ item }">
      <text-edit-dialog
        v-model.number="item.discountedPrice"
        :number="true"
        default-text="No discount price"
        @save="updateItem(item, 'discountedPrice')"
      />
    </template>

    <template #item.category="{ item }">
      <select-edit-dialog
        v-model="item.category"
        :options="['option1', 'option2']"
        default-text="No category"
      >
        <template #append-item>
          <create-select-item
            @new-item="categories.push($event)"
            endpoint="/categories"
          />
        </template>
      </select-edit-dialog>
    </template>

    <template #item.ingredients="{ item }">
      <select-edit-dialog
        v-model="item.ingredients"
        :options="ingredients"
        default-text="No Ingredients"
        :multiple="true"
        @save="updateItem(item, 'ingredients')"
      >
        <!-- CREATE INGREDIENT TEXT FIELD -->
        <template #append-item>
          <create-select-item
            @new-item="ingredients.push($event)"
            endpoint="/ingredients"
          />
        </template>

        <!-- CUSTOM LIST APPEARANCE -->
        <template #item="data">
          <ingredient-item :data="data.data" @delete="deleteIngredient" />
        </template>
      </select-edit-dialog>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import TextEditDialog from './TextEditDialog';
import SelectEditDialog from './SelectEditDialog';
import CreateSelectItem from './CreateSelectItem';
import IngredientItem from './IngredientItem';

export default {
  name: 'FoodsTable',
  components: {
    TextEditDialog,
    SelectEditDialog,
    CreateSelectItem,
    IngredientItem
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
    deleteIngredient(id) {
      const index = this.ingredients.findIndex(
        ingredient => ingredient.id === id
      );

      if (index !== -1) {
        this.ingredients.splice(index, 1);
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
  }
};
</script>
