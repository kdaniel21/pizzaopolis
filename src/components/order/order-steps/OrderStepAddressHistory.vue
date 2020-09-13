<template>
  <div id="order-step-address-history">
    <v-bottom-sheet v-model="sheet">
      <!-- OPEN BTN -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">Select Address</v-btn>
      </template>
      <!-- BOTTOM SHEET -->
      <v-sheet>
        <v-list>
          <!-- NO ADDRESS MESSAGE -->
          <v-list-item v-if="!addresses.length">
            You haven't entered any address yet. Please add one!
          </v-list-item>
          <!-- ADDRESS LIST -->
          <v-list-item v-for="address in addresses" :key="address.id">
            <v-list-item-content
              @click="$emit('load-address', address) && closeSheet()"
            >
              <!-- ADDRESS NAME -->
              <v-list-item-title>{{
                createShortLabel(address)
              }}</v-list-item-title>
            </v-list-item-content>
            <!-- REMOVE BTN -->
            <v-list-item-action>
              <v-btn icon @click="deleteAddress(address.id)"
                ><v-icon>delete</v-icon></v-btn
              >
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import localStorageHandler from '@/helpers/localStorageHandler';
import handleAddress from '@/mixins/handleAddress';

export default {
  name: 'OrderStepAddressHistory',
  mixins: [handleAddress],
  data() {
    return {
      sheet: false,
      addresses: []
    };
  },
  async created() {
    await this.loadAddresses();
  },
  methods: {
    async loadAddresses() {
      this.addresses = await localStorageHandler.recoverState('addresses');
    },
    async deleteAddress(id) {
      localStorageHandler.removeAddress('addresses', id);
      await this.loadAddresses();
    },
    closeSheet() {
      this.sheet = false;
    }
  }
};
</script>
