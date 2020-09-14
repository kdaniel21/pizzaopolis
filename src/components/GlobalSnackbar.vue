<template>
  <div id="global-snackbar">
    <v-snackbar bottom v-model="snackbar.visible" :timeout="snackbar.timeout">
      {{ snackbar.text }}

      <!-- CLOSE BUTTON -->
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="closeSnackbar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'GlobalSnackbar',
  computed: {
    ...mapState(['snackbar'])
  },
  methods: {
    ...mapMutations(['closeSnackbar'])
  }
};
</script>
