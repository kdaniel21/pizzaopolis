<template>
  <v-list-item id="create-ingredient">
    <v-list-item-content>
      <v-text-field
        label="Add Ingredient"
        v-model="ingredientName"
      ></v-text-field>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn text @click="createItem">Create</v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: 'CreateIngredient',
  data() {
    return {
      ingredientName: null
    };
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    createItem() {
      axios
        .post('/ingredients', { name: this.ingredientName })
        .then(res => {
          this.$emit('newIngredient', res.data.data);
          this.ingredientName = null;
        })
        .catch(() =>
          this.showSnackbar({ text: 'Could not create ingredient!' })
        );
    }
  }
};
</script>
