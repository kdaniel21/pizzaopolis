<template>
  <div id="card">
    <v-card class="fill-height">
      <v-card-title @click="viewOrder" style="cursor: pointer">
        {{ order.id }}
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-list>
          <v-list-item
            v-for="orderItem in order.foods"
            :key="orderItem.name"
            @click="
              toggleFoodReady({ orderId: order.id, foodName: orderItem.name })
            "
          >
            <!-- LINE THROUGH THE READY ITEMS -->
            <v-list-item-title
              :class="orderItem.ready ? 'text-decoration-line-through' : ''"
            >
              <span class="font-italic">{{ orderItem.quantity }}x</span>
              {{ orderItem.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions class="justify-end">
        <deliver-button />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import DeliverButton from './DeliverButton';

export default {
  name: 'Card',
  components: { DeliverButton },
  props: ['order'],
  methods: {
    ...mapActions('dashboard/incomingOrders', ['toggleFoodReady']),
    viewOrder() {
      this.$router.push({
        name: 'order-detail',
        params: { id: this.order.id }
      });
    }
  }
};
</script>
