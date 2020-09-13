<template>
  <v-form
    id="order-step-personal-data"
    @submit.prevent="submitAddress"
    v-model="isValid"
  >
    <v-row>
      <!-- SHIPPING INFORMATION -->
      <v-col cols="12" sm="6">
        <order-step-shipping @change="val => (shippingInformation = val)" />
      </v-col>

      <!-- BILLING INFORMATION -->
      <v-col cols="12" sm="6">
        <order-step-billing @change="val => (billingInformation = val)" />
      </v-col>
    </v-row>
    <order-step-continue-btn :disabled="!isValid" />
  </v-form>
</template>

<script>
import OrderStepShipping from './OrderStepShipping';
import OrderStepBilling from './OrderStepBilling';
import OrderStepContinueBtn from './OrderStepContinueBtn';
import { mapActions } from 'vuex';

export default {
  name: 'OrderStepPersonalData',
  components: {
    OrderStepShipping,
    OrderStepBilling,
    OrderStepContinueBtn
  },
  data() {
    return {
      isValid: false,
      shippingInformation: null,
      billingInformation: null
    };
  },
  methods: {
    ...mapActions('order', ['setshippingInformation', 'setbillingInformation']),
    submitAddress() {
      this.setshippingInformation(this.shippingInformation);

      if (this.billingInformation) {
        this.setbillingInformation(this.billingInformation);
      }

      this.$emit('next-step');
    }
  }
};
</script>
