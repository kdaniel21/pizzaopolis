<template>
  <v-list-item id="create-select-item">
    <v-list-item-content>
      <v-text-field label="Create New" v-model="name"></v-text-field>
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
  name: 'CreateSelectItem',
  props: ['endpoint'],
  data() {
    return {
      name: null
    };
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    createItem() {
      axios
        .post(this.endpoint, { name: this.name })
        .then(res => {
          this.$emit('new-item', res.data.data);
          this.name = null;
        })
        .catch(() => this.showSnackbar({ text: 'Could not create!' }));
    }
  }
};
</script>
