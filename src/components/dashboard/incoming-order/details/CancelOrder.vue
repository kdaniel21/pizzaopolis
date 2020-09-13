<template>
  <confirmation-dialog
    id="cancel-order"
    :content="content"
    @confirm="cancelOrder"
  />
</template>

<script>
import axios from 'axios';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { mapMutations } from 'vuex';

export default {
  name: 'CancelOrder',
  props: ['orderId'],
  components: { ConfirmationDialog },
  data() {
    return {
      content: {
        icon: 'cancel',
        btnText: 'Cancel Order',
        title: 'Cancel Order',
        text:
          'Are you sure you want to cancel this order? This action is irreversible and the customer will receive an email.'
      }
    };
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    cancelOrder() {
      axios
        .patch(`/orders/${this.orderId}/cancel`, {})
        .then(() => {
          this.showSnackbar({ text: 'Order cancelled successfully!' });
          this.$router.push({ name: 'incoming' });
        })
        .catch(() =>
          this.showSnackbar({
            text: 'Order could not be cancelled! Please try again.'
          })
        );
    }
  }
};
</script>
