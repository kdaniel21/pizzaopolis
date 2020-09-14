<template>
  <v-app id="dashboard-layout">
    <sidebar :isOpen="sidebarOpen" @openOrClose="e => (sidebarOpen = e)" />

    <v-app-bar app color="primary" v-if="isSmallerThanLg">
      <v-app-bar-nav-icon
        @click="sidebarOpen = !sidebarOpen"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <!-- SNACKBAR -->
    <global-snackbar />
  </v-app>
</template>

<script>
import Sidebar from '@/components/dashboard/Sidebar';
import GlobalSnackbar from '@/components/GlobalSnackbar';

export default {
  name: 'DashboardLayout',
  components: {
    Sidebar,
    GlobalSnackbar
  },
  data() {
    return {
      sidebarOpen: null
    };
  },
  computed: {
    isSmallerThanLg() {
      return !this.$vuetify.breakpoint.lg;
    }
  }
};
</script>
