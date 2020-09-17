<template>
  <v-dialog id="coupon-edit" v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">Create Coupon</v-btn>
    </template>

    <v-card>
      <v-card-title>
        {{ formTitle }}
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="editedItem.code" label="Code"></v-text-field>

          <v-row class="px-3 px-sm-0">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="editedItem.value"
                min="0"
                label="Discount"
                type="number"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select :items="couponTypes" :value="couponTypes[0]"></v-select>
            </v-col>
          </v-row>

          <v-row class="px-3 px-sm-0">
            <v-col cols="12" sm="6">
              <v-datetime-picker
                label="Expiration Time"
                v-model="editedItem.expiresAt"
              ></v-datetime-picker>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="editedItem.maxTimesUsed"
                min="0"
                label="Max Usage"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-switch v-model="editedItem.active" label="Active"></v-switch>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" text @click="onSave">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'CouponEdit',
  data() {
    return {
      dialog: false,
      editedItem: {},
      couponTypes: [
        { text: '%', value: 'percent' },
        { text: 'EUR', value: 'amount' }
      ]
    };
  },
  computed: {
    ...mapState('dashboard/coupons', ['editedCoupon']),
    formTitle() {
      return this.editedItem ? 'Edit Coupon' : 'Create Coupon';
    }
  },
  watch: {
    editedCoupon(val) {
      if (val && Object.keys(val).length) {
        this.editedItem = { ...val, expiresAt: new Date(val.expiresAt) };
        this.dialog = true;
      }
    }
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    ...mapActions('dashboard/coupons', ['updateCoupon']),
    onSave() {
      // Select the correct request
      const request = this.editedItem.id
        ? this.saveCoupon()
        : this.createCoupon();

      // Make changes on the server via the API
      request
        .then(res => {
          this.showSnackbar({ text: 'Coupon updated successfully!' });
          // Update the state via store
          this.updateCoupon(res.data.data);
          this.closeDialog();
        })
        .catch(() =>
          this.showSnackbar({ text: 'Coupon could not be updated!' })
        );
    },
    closeDialog() {
      this.dialog = false;
    },
    saveCoupon() {
      return axios.patch(`/coupons/${this.editedItem.id}`, this.editedItem);
    },
    createCoupon() {
      return axios.post('/coupons', this.editedItem);
    }
  }
};
</script>
