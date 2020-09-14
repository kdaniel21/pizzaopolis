<template>
  <v-list-item id="order-list-item">
    <v-list-item-content>
      <v-list-item-title>{{ order.name }}</v-list-item-title>

      <v-list-item-subtitle class="font-italic">
        {{ order.quantity }}x - {{ order.price.toFixed(2) }}€
      </v-list-item-subtitle>
    </v-list-item-content>
    <!-- REMOVE BTN -->
    <v-list-item-action>
      <v-btn icon @click="removeOrderItem(order)">
        <v-icon>remove_shopping_cart</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'OrderListItem',
  props: ['order'],
  methods: {
    ...mapActions('order', ['removeOrderItem'])
  }
};
</script>
