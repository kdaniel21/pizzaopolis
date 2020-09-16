<template>
  <v-list-item v-bind="data.attrs" v-on="data.on">
    <v-list-item-action>
      <v-checkbox
        :input-value="data.attrs.inputValue"
        @change="data.parent.$emit('select', data.item)"
      ></v-checkbox>
    </v-list-item-action>
    <v-list-item-content>{{ data.item.name }}</v-list-item-content>
    <v-list-item-action>
      <v-btn icon @click="deleteIngredient"><v-icon>delete</v-icon></v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: 'IngredientItem',
  props: ['data'],
  methods: {
    ...mapMutations(['showSnackbar']),
    deleteIngredient() {
      const { id } = this.data.item;

      axios
        .delete(`/ingredients/${id}`)
        .then(() => {
          this.showSnackbar({ text: 'Ingredient removed!' });
          this.$emit('delete', id);
        })
        .catch(() => {
          this.showSnackbar({ text: 'Could not delete ingredient!' });
        });
    }
  }
};
</script>
