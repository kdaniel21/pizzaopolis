<template>
  <v-card id="shipping-card" width="500">
    <v-card-title>Shipping Information</v-card-title>
    <v-card-text class="text-body 1">
      <v-row>
        <!-- FLOOR AND DOOR -->
        <v-col>
          <div>
            {{ `${shippingInformation.name}` }}
          </div>
          <div>
            {{ `${shippingInformation.phone}` }}
          </div>
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
              `${shippingInformation.street} ${shippingInformation.houseNumber}.`
            }}
          </div>
          <!-- ZIP AND CITY -->
          <div>
            {{
              `${shippingInformation.postalCode} ${shippingInformation.city}`
            }}
          </div>
          <!-- COUNTRY -->
          <div>
            {{ `${shippingInformation.country}` }}
          </div>
        </v-col>
        <v-col v-if="shippingInformation.comment">
          <div>Comment:</div>
          <div>{{ shippingInformation.comment }}</div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import handleAddress from '@/mixins/handleAddress';

export default {
  name: 'ShippingCard',
  mixins: [handleAddress],
  props: ['shippingInformation']
};
</script>
