<template>
  <div id="order-step-select-food">
    <v-list class="menu-list">
      <v-list-item v-for="(menuItem, i) in menu" :key="i">
        <v-list-item-content>
          <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ stringifyToppings(menuItem.ingredients) }}
          </v-list-item-subtitle>
        </v-list-item-content>

        {{ menuItem.price.toFixed(2) }}€
        <v-list-item-action>
          <v-btn icon @click="addItem(menuItem)">
            <v-icon color="secondary">shopping_cart</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <!-- CONTINUE BTN -->
    <order-step-continue-btn
      @click="$emit('next-step')"
      :disabled="!orders.length"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapState } from 'vuex';
import OrderStepContinueBtn from './OrderStepContinueBtn';

export default {
  name: 'OrderStepSelectFood',
  components: {
    OrderStepContinueBtn
  },
  data() {
    return {
      menu: []
    };
  },
  computed: {
    ...mapState('order', ['orders'])
  },
  methods: {
    ...mapActions('order', ['addOrderItem']),
    ...mapMutations(['showSnackbar']),
    stringifyToppings(toppings) {
      if (!toppings.length) return '';

      const stringifiedToppings = toppings.toString().replace(/,/g, ', ');
      return '(' + stringifiedToppings + ')';
    },
    addItem(order) {
      this.addOrderItem(order);
    }
  },
  async created() {
    try {
      const res = await axios.get('/foods');
      this.menu = res.data.data;
    } catch (err) {
      this.showSnackbar({ text: 'Could not load the menu. Please try again!' });
    }
  }
};
</script>

<style scoped>
@media only screen and (min-width: 900px) {
  .menu-list {
    column-count: 2;
  }
}
</style>
