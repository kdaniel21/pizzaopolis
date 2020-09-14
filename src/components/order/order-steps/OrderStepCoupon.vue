<template>
  <div id="order-step-coupon">
    <v-form @submit.prevent="submitCoupon">
      <v-text-field
        v-model="couponInput"
        label="Redeem Your Coupon"
        :rules="couponRules"
      ></v-text-field>

      <!-- CONTINUE BTN -->
      <order-step-continue-btn />
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapState } from 'vuex';
import OrderStepContinueBtn from './OrderStepContinueBtn';

export default {
  name: 'OrderStepCoupon',
  components: {
    OrderStepContinueBtn
  },
  data() {
    return {
      couponInput: null,
      couponRules: [v => /^[\S]+$/.test(v) || 'Please provide a valid coupon']
    };
  },
  computed: {
    ...mapState('order', ['coupon'])
  },
  watch: {
    coupon() {
      this.couponInput = this.coupon.code;
    }
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    ...mapActions('order', ['setCoupon']),
    submitCoupon() {
      if (!this.couponInput) {
        this.setCoupon(null);
        return this.$emit('next-step');
      }

      // Check coupon validity
      axios
        .get(`/coupons/${this.couponInput}`)
        .then(res => {
          // Add coupon to store
          this.setCoupon(res.data);
          this.$emit('next-step');
        })
        .catch(() => {
          this.showSnackbar({ text: 'Invalid coupon code.' });
        });
    }
  }
};
</script>

<style scoped>
/deep/ .v-text-field {
  width: min(100%, 20rem);
}
</style>
