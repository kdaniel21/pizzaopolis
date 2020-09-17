<template>
  <v-navigation-drawer id="sidebar" app color="primary" v-model="sidebarOpen">
    <v-list>
      <!-- PROFILE -->
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.position }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- DIVIDER -->
      <v-divider></v-divider>

      <!-- MENU -->
      <v-list-item
        v-for="menuItem in menuItems"
        :key="menuItem.name"
        :to="{ name: menuItem.routeName }"
      >
        <v-list-item-icon>
          <v-icon>{{ menuItem.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- LOGOUT BUTTON -->
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logout">Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Sidebar',
  props: ['isOpen'],
  data() {
    return {
      menuItems: [
        { name: 'Incoming Orders', icon: 'inbox', routeName: 'incoming' },
        { name: 'Order History', icon: 'history', routeName: 'orders-history' },
        { name: 'Menu', icon: 'menu_book', routeName: 'menu' },
        { name: 'Coupons', icon: 'card_giftcard', routeName: 'coupons' }
      ]
    };
  },
  computed: {
    ...mapState('dashboard/auth', ['user']),
    sidebarOpen: {
      get() {
        return this.isOpen;
      },
      set(val) {
        this.$emit('openOrClose', val);
      }
    }
  },
  methods: {
    ...mapActions('dashboard/auth', ['logout'])
  }
};
</script>
