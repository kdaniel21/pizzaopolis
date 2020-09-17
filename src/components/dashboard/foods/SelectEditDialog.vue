<template>
  <v-edit-dialog
    id="select-edit-dialog"
    :return-value="val => $emit('input', val)"
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
        :multiple="true"
      >
        <!-- POTENTIAL SLOT FOR SPECIFIC USE CASES -->
        <template #append-item>
          <create-select-item
            :endpoint="endpoint"
            @new-item="$emit('new-item', $event)"
          />
        </template>

        <!-- APPEARANCE OF THE ITEM -->
        <template #item="data">
          <select-item
            :data="data"
            :endpoint="endpoint"
            @delete="$emit('delete', $event)"
          />
        </template>
      </v-select>
    </template>
  </v-edit-dialog>
</template>

<script>
import SelectItem from './SelectItem';
import CreateSelectItem from './CreateSelectItem';

export default {
  name: 'SelectEditDialog',
  props: ['value', 'options', 'multiple', 'defaultText', 'endpoint'],
  components: {
    SelectItem,
    CreateSelectItem
  },
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
