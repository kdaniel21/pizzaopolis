<template>
  <!-- INVOICE -->
  <v-card id="invoice-card" max-width="350">
    <v-card-title>Invoice</v-card-title>
    <v-card-text>
      <v-list>
        <!-- ORDER ITEMS -->
        <v-list-item v-for="food in transaction.foods" :key="food.name">
          <v-list-item-title>
            {{ food.pivot.quantity }}x {{ food.name }}
          </v-list-item-title>

          <!-- PRICE OF FOOD -->
          <v-list-item-action>
            {{ (food.price * food.pivot.quantity).toFixed(2) }}
          </v-list-item-action>
        </v-list-item>

        <!-- COUPON -->
        <v-list-item
          class="font-italic"
          v-if="transaction.coupon && transaction.discountAmount"
        >
          <v-list-item-title>{{ transaction.coupon.code }}</v-list-item-title>
          <v-list-item-action
            >-{{ transaction.discountAmount.toFixed(2) }}</v-list-item-action
          >
        </v-list-item>
        <!-- SUM -->
        <v-list-item class="font-weight-bold">
          <v-list-item-title>Sum</v-list-item-title>
          <v-list-item-action>{{
            transaction.total.toFixed(2)
          }}</v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'InvoiceCard',
  props: ['transaction']
};
</script>
