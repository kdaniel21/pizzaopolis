<template>
  <v-dialog id="confirmation-dialog" max-width="500" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">
        <v-icon v-if="content.icon">{{ content.icon }}</v-icon>
        {{ content.btnText }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">{{ content.title }}</v-card-title>
      <v-card-text>{{ content.text }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('cancel') && closeDialog()">
          {{ content.cancelBtnText || 'Cancel' }}
        </v-btn>
        <v-btn text color="red" @click="$emit('confirm') && closeDialog()">
          {{ content.cancelBtnText || 'Confirm' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmationDialog',
  props: ['content'],
  data() {
    return {
      dialog: null
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>
