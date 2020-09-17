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
      <v-btn icon @click="deleteItem({ property, id: data.item.id })"
        ><v-icon>delete</v-icon></v-btn
      >
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'SelectItem',
  props: ['data', 'property'],
  methods: {
    ...mapMutations(['showSnackbar']),
    ...mapActions('dashboard/foods', ['deleteItem'])
  }
};
</script>
