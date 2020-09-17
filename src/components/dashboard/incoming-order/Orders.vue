<template>
  <v-data-iterator
    id="orders"
    :items="incomingOrders"
    :items-per-page="itemsPerPage"
    hide-default-footer
    no-data-text="There are no incoming orders"
  >
    <!-- CONTENT -->
    <template v-slot:default>
      <v-row class="fill-height">
        <v-col
          v-for="order in incomingOrders"
          :key="order.id"
          :cols="12 / itemsPerRow"
          class="py-2"
        >
          <card :order="order" />
        </v-col>
      </v-row>
    </template>

    <!-- FOOTER -->
    <template v-slot:footer v-if="numberOfPages > 1">
      <v-row class="justify-end">
        <v-btn fab color="secondary"
          ><v-icon>keyboard_arrow_left</v-icon></v-btn
        >
        <v-btn class="mx-3" fab color="secondary"
          ><v-icon>keyboard_arrow_right</v-icon></v-btn
        >
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Card from './Card';

export default {
  name: 'Orders',
  components: {
    Card
  },
  data() {
    return {
      rowsPerPage: null
    };
  },
  computed: {
    ...mapState('dashboard/incomingOrders', ['incomingOrders']),
    numberOfPages() {
      return Math.ceil(this.incomingOrders.length / this.itemsPerPage);
    },
    itemsPerPage() {
      return Math.ceil(this.rowsPerPage / this.itemsPerRow);
    },
    itemsPerRow() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 1;
        case 'sm':
          return 2;
        case 'md':
          return 3;
        case 'lg':
          return 4;
        case 'xl':
          return 6;
      }
      return 0;
    }
  },
  methods: {
    ...mapActions('dashboard/incomingOrders', ['getIncomingOrders']),
    calcRowsPerPage() {
      let container = document.querySelector('#container');
      let minItemHeight = 170;

      if (!container) return (this.rowsPerPage = 4);

      let containerHeight = +container.clientHeight;

      this.rowsPerPage = Math.floor(containerHeight / minItemHeight);
    }
  },
  created() {
    this.calcRowsPerPage();
    window.addEventListener('resize', () => this.calcRowsPerPage());

    // Get orders
    this.getIncomingOrders();
  }
};
</script>
