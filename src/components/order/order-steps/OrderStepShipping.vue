<template>
  <div id="order-step-shipping">
    <v-row>
      <v-col cols="12" sm="6">
        <h5 class="text-h5">Shipping Address</h5>
      </v-col>
      <!-- HISTORY BTN -->
      <v-col cols="12" sm="6">
        <order-step-address-history
          class="float-right"
          @load-address="val => Object.assign(shippingInformationInput, val)"
        />
      </v-col>
    </v-row>
    <!-- NAME & EMAIL & PHONE -->
    <v-text-field
      label="Name"
      prepend-icon="person"
      v-model="shippingInformationInput.name"
      :rules="[rules.required]"
    ></v-text-field>
    <v-text-field
      label="Email"
      prepend-icon="mail"
      v-model="shippingInformationInput.email"
      :rules="[rules.required, rules.email]"
    ></v-text-field>
    <v-text-field
      label="Phone Number"
      prepend-icon="phone"
      v-model="shippingInformationInput.phone"
      :rules="[rules.required, rules.phone]"
    ></v-text-field>

    <!-- PLACE AUTCOMPLETE -->
    <order-step-address-search
      @change="val => (shippingInformationInput.address = val)"
      :value="{
        address: shippingInformationInput.address,
        matchLevel: 'houseNumber',
        label: createLabel(shippingInformationInput.address)
      }"
    />

    <!-- FLOOR & DOOR -->
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Floor"
          prepend-icon="apartment"
          v-model="shippingInformationInput.floor"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Door"
          prepend-icon="meeting_room"
          v-model="shippingInformationInput.door"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- COMMENT -->
    <v-textarea
      label="Comment for Us"
      rows="3"
      prepend-icon="comment"
      v-model="shippingInformationInput.comment"
    ></v-textarea>
  </div>
</template>

<script>
import OrderStepAddressSearch from './OrderStepAddressSearch';
import OrderStepAddressHistory from './OrderStepAddressHistory';
import { mapState } from 'vuex';

export default {
  name: 'OrderStepShipping',
  components: {
    OrderStepAddressSearch,
    OrderStepAddressHistory
  },
  data() {
    return {
      rules: {
        required: v => !!v || 'This field is required!',
        email: v => /.+@.+/.test(v) || 'Your email must be valid!',
        phone: v =>
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(v) ||
          'Please enter a valid phone number!'
      },
      shippingInformationInput: {
        name: null,
        email: null,
        phone: null,
        comment: null,
        address: null,
        floor: null,
        door: null
      }
    };
  },
  computed: {
    ...mapState('order', ['shippingInformation'])
  },
  watch: {
    shippingInformation() {
      this.shippingInformationInput = { ...this.shippingInformation };
    },
    shippingInformationInput: {
      handler(val) {
        this.$emit('change', val);
      },
      deep: true
    }
  },
  methods: {
    createLabel(address) {
      if (!address) return;

      return `${address.street} ${address.houseNumber}, ${address.city}`;
    }
  }
};
</script>
