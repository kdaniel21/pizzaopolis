<template>
  <v-list-item id="create-select-item">
    <v-list-item-content>
      <v-text-field label="Create New" v-model="name"></v-text-field>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn
        text
        @click="addItem({ property: property, item: { name } }) && emptyForm()"
        >Create</v-btn
      >
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CreateSelectItem',
  props: ['property'],
  data() {
    return {
      name: null
    };
  },
  methods: {
    ...mapActions('dashboard/foods', ['addItem']),
    emptyForm() {
      console.log('ran');
      this.name = null;
    }
  }
};
</script>
