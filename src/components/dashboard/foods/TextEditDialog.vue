<template>
  <v-edit-dialog
    id="text-edit-dialog"
    :return-value="val => $emit('input', val)"
    @save="$emit('save')"
    @close="$emit('save')"
  >
    <!-- SHOWING THE DEFAULT VALUE IF NOTHING WAS PROVIDED -->
    <!-- SHOWING NUMBERS WITH 2 DECIMALS -->
    <span>{{ value ? (number ? value.toFixed(2) : value) : defaultText }}</span>
    <template v-slot:input>
      <!-- AVOIDING MUTATING PROPS DIRECTLY -->
      <v-text-field
        :value="value"
        @input="val => $emit('input', val)"
        label="Edit"
        single-line
        :type="number ? 'number' : 'text'"
        :step="number ? 0.1 : null"
      ></v-text-field>
    </template>
  </v-edit-dialog>
</template>

<script>
export default {
  name: 'TextEditDialog',
  props: ['value', 'number', 'defaultText']
};
</script>
