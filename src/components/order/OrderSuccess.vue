<template>
  <div id="order-success">
    <div class="text-center">
      <h4 class="text-h4 mb-5">Thank you for your oder!</h4>
      <delivery />
      <h5 class="text-h5 mt-5">
        We are delivering your food as soon as possible!
      </h5>
    </div>
  </div>
</template>

<script>
import localStorageHandler from '@/helpers/localStorageHandler';
import Delivery from '@/assets/images/delivery.svg';

export default {
  name: 'OrderSuccess',
  components: {
    Delivery
  },
  created() {
    // Remove unfinished-order from the local storage
    localStorageHandler.removeState('unfinished-order');
  }
};
</script>

<style scoped>
svg {
  width: 40%;
  height: 100%;
}
</style>
