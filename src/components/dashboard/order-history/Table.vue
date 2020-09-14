<template>
  <v-data-table
    id="table"
    :headers="headers"
    :items="orders"
    :loading="!orders"
    loading-text="Loading... Please wait"
    @click:row="
      val => $router.push({ name: 'order-detail', params: { id: val.id } })
    "
    class="elevation-1"
  >
    <!-- CUSTOM FIELD FOR THE PRICE BECAUSE OF PRICING -->
    <template v-slot:item.total="{ item }">
      <span>{{ `${item.total.toFixed(2)}€` }}</span>
    </template>

    <!-- CUSTOM FIELD FOR THE DATE -->
    <template v-slot:item.createdAt="{ item }">
      <span>{{ new Date(item.createdAt).toLocaleString('hu-HU') }}</span>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Table',
  data() {
    return {
      headers: [
        { text: 'Order ID', value: 'id' },
        { text: 'Status', value: 'status' },
        { text: 'Name', value: 'name' },
        { text: 'Total', value: 'total' },
        { text: 'Date', value: 'createdAt' }
      ],
      orders: [],
      stopLoading: false
    };
  },
  created() {
    // setTimeout(() => {
    axios.get('/orders').then(res => (this.orders = res.data.data));
    // }, 4000);
  }
};
</script>
