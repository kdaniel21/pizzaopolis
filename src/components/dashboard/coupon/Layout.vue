<template>
  <div id="layout">
    <v-subheader>Active Coupons</v-subheader>
    <active-coupons />

    <v-subheader>Expired & One-Time Coupons</v-subheader>
    <coupons-table />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// import axios from 'axios';
import ActiveCoupons from './ActiveCoupons';
import CouponsTable from './CouponsTable';

export default {
  name: 'Layout',
  components: { ActiveCoupons, CouponsTable },
  data() {
    return {
      // coupons: null
    };
  },
  // computed: {
  //   activeCoupons() {
  //     if (!this.coupons) return [];

  //     return this.coupons.filter(
  //       coupon => coupon.valid && coupon.maxTimesUsed > 1
  //     );
  //   },
  //   oldAndOneTimeCoupons() {
  //     if (!this.coupons) return [];

  //     return this.coupons.filter(
  //       coupon => !coupon.valid || coupon.maxTimesUsed === 1
  //     );
  //   }
  // },
  methods: {
    // refreshCoupons(editedCoupon) {
    //   const index = this.coupons.findIndex(
    //     coupon => coupon.id === editedCoupon.id
    //   );
    //   if (index === -1) {
    //     // Add new coupon
    //     return this.coupons.push(editedCoupon);
    //   }
    //   this.coupons[index] = { ...editedCoupon };
    // },
    // getCoupons() {
    //   axios.get('/coupons').then(res => (this.coupons = res.data.data));
    // }
    ...mapActions('dashboard', ['getCoupons'])
  },
  created() {
    this.getCoupons();
  }
};
</script>
