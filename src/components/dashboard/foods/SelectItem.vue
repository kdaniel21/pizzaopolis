<template>
  <v-list-item v-bind="data.attrs" v-on="data.on" id="select-item">
    <v-list-item-action>
      <v-checkbox
        :input-value="data.attrs.inputValue"
        @change="data.parent.$emit('select', data.item)"
      ></v-checkbox>
    </v-list-item-action>
    <v-list-item-content>{{ data.item.name }}</v-list-item-content>
    <v-list-item-action>
      <v-btn icon @click="deleteItem"><v-icon>delete</v-icon></v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: 'SelectItem',
  props: ['data', 'endpoint'],
  methods: {
    ...mapMutations(['showSnackbar']),
    deleteItem() {
      const { id } = this.data.item;

      axios
        .delete(`${this.endpoint}/${id}`)
        .then(() => {
          this.showSnackbar({ text: 'Removed!' });
          this.$emit('delete', id);
        })
        .catch(() => {
          this.showSnackbar({ text: 'Could not delete ingredient!' });
        });
    }
  },
  created() {
    console.log(this.data);
  }
};
</script>
