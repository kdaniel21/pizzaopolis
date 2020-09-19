<template>
  <div id="order-step-summary">
    <h5 class="text-h5">Order Summary</h5>
    <v-row>
      <v-col cols="12" sm="6">
        <order-list-summary />
      </v-col>
      <v-col cols="12" sm="6">
        <order-shipping-summary />
      </v-col>
    </v-row>

    <stripe-checkout
      ref="sessionRef"
      :pk="stripePublicKey"
      :session-id="sessionId"
    >
      <template slot="checkout-button">
        <order-step-continue-btn :text="'Pay'" @click="createOrder" />
      </template>
    </stripe-checkout>
  </div>
</template>

<script>
import axios from 'axios';
import { StripeCheckout } from 'vue-stripe-checkout';
import OrderListSummary from '../order-summary/OrderListSummary';
import OrderShippingSummary from '../order-summary/OrderShippingSummary';
import OrderStepContinueBtn from './OrderStepContinueBtn';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'OrderStepSummary',
  components: {
    StripeCheckout,
    OrderListSummary,
    OrderShippingSummary,
    OrderStepContinueBtn
  },
  data() {
    return {
      stripePublicKey: process.env.VUE_APP_STRIPE_PUBLIC_KEY,
      sessionId: null
    };
  },
  computed: {
    ...mapGetters('order', ['completeOrder'])
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    async createOrder() {
      try {
        const res = await axios.post('/orders', this.completeOrder);
        this.sessionId = res.data.sessionId;
        this.$refs.sessionRef.redirectToCheckout();
      } catch (err) {
        this.showSnackbar({ text: 'Something went wrong! Please try again.' });
        console.log(err);
      }
    }
  }
};
</script>
