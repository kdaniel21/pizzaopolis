<template>
  <div id="detail-overview" v-if="order">
    <v-subheader>Order Nr. {{ order.id }}</v-subheader>
    <v-row class="px-4 mb-4">
      <!-- INVOICE -->
      <invoice-card :transaction="order.transaction" class="mr-4" />

      <!-- SHIPPING -->
      <shipping-card :shippingInformation="order.shippingInformation" />
    </v-row>
    <!-- CANCEL ORDER BUTTON -->
    <cancel-order :orderId="order.id" />
  </div>
</template>

<script>
import axios from 'axios';
import InvoiceCard from './InvoiceCard';
import ShippingCard from './ShippingCard';
import CancelOrder from './CancelOrder';

export default {
  name: 'DetailOverview',
  components: {
    InvoiceCard,
    ShippingCard,
    CancelOrder
  },
  data() {
    return {
      order: null,
      coupon: 10
    };
  },
  computed: {
    total() {
      let total = 0;
      this.order.foods.forEach(food => (total += food.price));
      return total;
    }
  },
  created() {
    const orderId = this.$route.params.id;
    // Fetch from the API
    axios.get(`/orders/${orderId}`).then(res => (this.order = res.data.data));
  }
};
</script>
