<template>
  <!-- COUPON -->
  <v-list-item id="order-list-coupon" v-if="coupon">
    <v-list-item-content>
      <!-- COUPON NAME -->
      <v-list-item-title>{{ coupon.code }}</v-list-item-title>
      <v-list-item-subtitle>
        {{ `${coupon.value}${coupon.type === 'percent' ? '%' : '€'}` }}
        Discount
      </v-list-item-subtitle>
    </v-list-item-content>

    <!-- REMOVE COUPON -->
    <v-list-item-action>
      <v-btn icon @click="setCoupon(null)">
        <v-icon>remove_circle</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'OrderListCoupon',
  computed: {
    ...mapState('order', ['coupon'])
  },
  methods: {
    ...mapActions('order', ['setCoupon'])
  }
};
</script>
