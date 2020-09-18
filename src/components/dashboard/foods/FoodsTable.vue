<template>
  <v-data-table
    id="table"
    :headers="headers"
    :items="foods"
    :items-per-page="10"
    class="elevation-1"
    v-if="foods.length"
  >
    <!-- CREATE BUTTON -->
    <template #top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <create-food-dialog />
      </v-toolbar>
    </template>

    <template #item.name="{ item }">
      <text-edit-dialog
        v-model="item.name"
        default-text="Unknown"
        property="name"
        :item="item"
      />
    </template>

    <template #item.price="{ item }">
      <text-edit-dialog
        v-model.number="item.price"
        :number="true"
        property="price"
        :item="item"
      />
    </template>

    <template #item.discountedPrice="{ item }">
      <text-edit-dialog
        v-model.number="item.discountedPrice"
        :number="true"
        default-text="No discount price"
        property="discountedPrice"
        :item="item"
      />
    </template>

    <template #item.category="{ item }">
      <select-edit-dialog
        v-model="item.categories"
        :options="categories"
        default-text="No category"
        property="categories"
        :item="item"
      />
    </template>

    <template #item.ingredients="{ item }">
      <select-edit-dialog
        v-model="item.ingredients"
        :options="ingredients"
        default-text="No Ingredients"
        property="ingredients"
        :multiple="true"
        :item="item"
      />
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CreateFoodDialog from './CreateFoodDialog';
import TextEditDialog from './TextEditDialog';
import SelectEditDialog from './SelectEditDialog';

export default {
  name: 'FoodsTable',
  components: {
    CreateFoodDialog,
    TextEditDialog,
    SelectEditDialog
  },
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Discounted Price', value: 'discountedPrice' },
        { text: 'Category', value: 'category' },
        { text: 'Ingredients', value: 'ingredients' }
      ]
    };
  },
  computed: {
    ...mapState('dashboard/foods', ['foods', 'ingredients', 'categories'])
  },
  methods: {
    ...mapActions('dashboard/foods', ['getAll'])
  },
  created() {
    this.getAll();
  }
};
</script>
