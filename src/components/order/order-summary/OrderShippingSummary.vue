<template>
  <div id="order-shipping-summary" v-if="shippingInformation">
    <v-subheader><v-icon class="mr-2">home</v-icon> YOUR ADDRESS</v-subheader>
    <div class="px-5 text-body-1">
      <!-- FLOOR AND DOOR -->
      <div>
        <span v-if="shippingInformation.floor"
          >Floor {{ shippingInformation.floor }}</span
        >
        <span v-if="shippingInformation.door">
          Door {{ shippingInformation.door }}
        </span>
      </div>
      <!-- STREET AND HOUSE NUMBER -->
      <div>
        {{
          `${shippingInformation.address.street} ${shippingInformation.address.houseNumber} `
        }}
      </div>
      <!-- ZIP AND CITY -->
      <div>
        {{
          `${shippingInformation.address.postalCode} ${shippingInformation.address.city}`
        }}
      </div>
      <!-- COUNTRY -->
      <div>
        {{ `${shippingInformation.address.country}` }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'OrderShippingSummary',
  computed: {
    ...mapState('order', ['shippingInformation'])
  }
};
</script>
