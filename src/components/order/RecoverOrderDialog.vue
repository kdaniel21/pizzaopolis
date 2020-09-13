<template>
  <div id="recover-order-dialog">
    <v-dialog persistent v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Continue Order</v-card-title>
        <v-card-text>
          Looks like you haven't finished your order last time. Do you want to
          continue?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- START A NEW ORDER FROM SCRATCH -->
          <v-btn text @click="removeState()">Start a New</v-btn>
          <!-- RECOVER ORDER -->
          <v-btn text color="primary" @click="recoverState() && closeDialog()"
            >Continue</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import localStorageHandler from '@/helpers/localStorageHandler';
import { mapActions } from 'vuex';

export default {
  name: 'RecoverOrderDialog',
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    ...mapActions('order', ['recoverState']),
    closeDialog() {
      this.dialog = false;
    },
    removeState() {
      localStorageHandler.removeState('unfinished-order');

      this.closeDialog();
    }
  },
  created() {
    // Exit if no previous state
    if (!localStorageHandler.stateExists('unfinished-order')) return;

    // If state is recent -> recover
    if (localStorageHandler.isStateRecent('unfinished-order')) {
      return this.recoverState();
    }

    // Ask user whether it wants to recover it or not
    this.dialog = true;
  }
};
</script>
