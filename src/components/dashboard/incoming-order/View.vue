<template>
  <v-card id="view">
    <v-card-title>Order Nr. {{ order.id }}</v-card-title>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'View',
  data() {
    return {
      order: null
    };
  },
  created() {
    const { id } = this.$route.params;
    axios.get(`/orders/${id}`).then(res => (this.order = res.data.data));
  }
};
</script>
