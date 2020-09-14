<template>
  <!-- TOTAL AMOUNT -->
  <v-subheader id="order-list-total">
    <v-icon class="mr-2">euro</v-icon> TOTAL: {{ total.toFixed(2) }}€
  </v-subheader>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'OrderListTotal',
  computed: {
    ...mapGetters('order', ['total'])
  }
};
</script>
