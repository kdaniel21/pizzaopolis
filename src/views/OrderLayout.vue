<template>
  <v-app id="order-layout">
    <!-- SIDEBAR -->
    <v-navigation-drawer app width="300" v-model="showDrawer">
      <order-list-summary />

      <order-shipping-summary />
    </v-navigation-drawer>

    <!-- TOOLBAR -->
    <v-app-bar app color="secondary">
      <v-app-bar-nav-icon
        @click.stop="showDrawer = !showDrawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title
        >Please select the foods you want to order!</v-toolbar-title
      >
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <!-- SNACKBAR -->
        <global-snackbar />
        <!-- ROUTER VIEW -->
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import OrderListSummary from '../components/order/order-summary/OrderListSummary';
import OrderShippingSummary from '../components/order/order-summary/OrderShippingSummary';
import GlobalSnackbar from '../components/GlobalSnackbar';

export default {
  name: 'OrderLayout',
  components: {
    OrderListSummary,
    OrderShippingSummary,
    GlobalSnackbar
  },
  data() {
    return {
      showDrawer: null
    };
  }
};
</script>
