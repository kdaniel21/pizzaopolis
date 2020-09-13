<template>
  <div id="order-list-summary">
    <v-list>
      <v-subheader><v-icon class="mr-2">fastfood</v-icon> ORDER</v-subheader>
      <!-- LIST OF FOOD OF THE CURRENT ORDER -->
      <v-list-item-group>
        <!-- EMPTY MESSAGE -->
        <v-list-item v-if="!orders.length"
          >Your cart is empty. Choose something tasty!</v-list-item
        >
        <!-- ORDER ITEMS -->
        <order-list-item
          v-for="order in orders"
          :key="order.name"
          :order="order"
        ></order-list-item>

        <!-- COUPON -->
        <order-list-coupon />
      </v-list-item-group>
    </v-list>

    <!-- TOTAL AMOUNT -->
    <order-list-total />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import OrderListItem from './OrderListItem';
import OrderListCoupon from './OrderListCoupon';
import OrderListTotal from './OrderListTotal';

export default {
  name: 'OrderListSummary',
  components: { OrderListItem, OrderListCoupon, OrderListTotal },
  computed: {
    ...mapState('order', ['orders'])
  }
};
</script>
