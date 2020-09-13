<template>
  <div id="coupons-table">
    <!-- TABLE -->
    <v-data-table
      :headers="headers"
      :items="oldAndOneTimeCoupons"
      :items-per-page="5"
      class="elevation-1"
      @click:row="val => editCoupon(val)"
    >
      <!-- NEW COUPON BUTTON -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <coupon-edit />
        </v-toolbar>
      </template>

      <!-- VALIDITY CHECKBOX -->
      <template v-slot:item.valid="{ item }">
        <v-simple-checkbox v-model="item.valid" disabled></v-simple-checkbox>
      </template>

      <!-- VALUE FORMATTING -->
      <template v-slot:item.value="{ item }">
        <span>{{ item.value }}{{ item.type === 'amount' ? 'EUR' : '%' }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CouponEdit from './CouponEdit';

export default {
  name: 'CouponsTable',
  components: {
    CouponEdit
  },
  data() {
    return {
      headers: [
        { text: 'Code', value: 'code' },
        { text: 'Valid', value: 'valid' },
        { text: 'Value', value: 'value' },
        { text: 'Total Usage', value: 'timesUsed' }
      ]
    };
  },
  computed: {
    ...mapGetters('dashboard', ['oldAndOneTimeCoupons'])
  },
  watch: {
    oldAndOneTimeCoupons(val) {
      console.log('changed');
      console.log(val);
    }
  },
  methods: {
    ...mapActions('dashboard', ['editCoupon'])
  }
};
</script>
