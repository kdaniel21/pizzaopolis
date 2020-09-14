<template>
  <div id="order-step-billing">
    <h5 class="text-h5">Billing Address</h5>
    <!-- SLIDER WHETHER THE INFO IS THE SAME -->
    <v-switch
      label="Use my shipping information"
      v-model="billingInformationInput.sameAsShipping"
      :rules="[rules.sameOrSpecify]"
    ></v-switch>
    <div v-if="!billingInformationInput.sameAsShipping">
      <v-text-field
        label="Name or Company"
        prepend-icon="business"
        v-model="billingInformationInput.name"
        :rules="[rules.required]"
      ></v-text-field>
      <!-- PLACE AUTOCOMPLETE -->
      <order-step-address-search
        @change="val => (this.billingInformationInput.address = val)"
      />
    </div>
  </div>
</template>

<script>
import OrderStepAddressSearch from './OrderStepAddressSearch';
import { mapState } from 'vuex';

export default {
  name: 'OrderStepBilling',
  components: {
    OrderStepAddressSearch
  },
  data() {
    return {
      rules: {
        required: v => !!v || 'This field is required!',
        sameOrSpecify: v =>
          !this.sameAsShipping || !!v || 'This field is required'
      },
      billingInformationInput: {
        sameAsShipping: true,
        name: null,
        address: null
      }
    };
  },
  computed: {
    ...mapState('order', ['billingInformation'])
  },
  watch: {
    billingInformation() {
      this.billingInformationInput = this.billingInformation;
    }
  }
};
</script>
