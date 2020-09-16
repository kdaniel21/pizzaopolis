<template>
  <v-edit-dialog
    id="select-edit-dialog"
    :return-value="val => $emit('input', val)"
    @save="$emit('save')"
    @close="$emit('save')"
  >
    <!-- DISPLAY CHIPS -->
    <v-chip-group v-if="value">
      <v-chip v-for="chip in displayedChips" :key="chip.name">{{
        chip.name || chip
      }}</v-chip>
    </v-chip-group>
    <span v-else>{{ defaultText }}</span>

    <!-- SELECT INPUT -->
    <template #input>
      <v-select
        :value="value"
        @input="val => $emit('input', val)"
        :items="options"
        item-text="name"
        return-object
        label="Select"
        chips
        :multiple="multiple ? true : false"
      >
        <!-- POTENTIAL SLOT FOR SPECIFIC USE CASES -->
        <template #append-item>
          <slot name="append-item"></slot>
        </template>

        <!-- APPEARANCE OF THE ITEM -->
        <template #item="data">
          <slot name="item" :data="data"></slot>
        </template>
      </v-select>
    </template>
  </v-edit-dialog>
</template>

<script>
export default {
  name: 'SelectEditDialog',
  props: ['value', 'options', 'multiple', 'defaultText'],
  computed: {
    displayedChips() {
      if (Array.isArray(this.value)) return this.value;

      return [{ name: this.value }];
    }
  },
  methods: {
    test() {
      console.log('hello world');
    }
  }
};
</script>
