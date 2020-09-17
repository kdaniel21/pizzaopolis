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
  methods: {
    ...mapActions('dashboard/coupons', ['getCoupons'])
  },
  created() {
    this.getCoupons();
  }
};
</script>
