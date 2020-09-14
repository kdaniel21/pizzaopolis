<template>
  <!-- CONTINUE BTN -->
  <div id="order-step-btn" class="mt-3">
    <v-btn
      type="submit"
      color="primary"
      class="float-right"
      @click="$emit('click')"
      :disabled="disabled"
      >{{ text || 'Continue' }}</v-btn
    >
  </div>
</template>

<script>
export default {
  name: 'OrderStepBtn',
  props: ['disabled', 'text']
};
</script>
