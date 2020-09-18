<template>
  <v-dialog id="create-food-dialog" v-model="dialog" max-width="500px">
    <!-- BUTTON -->
    <template #activator="{ on, attrs}">
      <v-btn v-on="on" v-bind="attrs">Create Food</v-btn>
    </template>

    <v-card>
      <v-card-title>Create Food</v-card-title>

      <v-card-text>
        <v-text-field v-model="formData.name" label="Name"></v-text-field>

        <v-row class="px-3 px-sm-0">
          <v-col cols="12" sm="6">
            <v-text-field
              v-model.number="formData.price"
              label="Price"
              type="number"
              step="0.1"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model.number="formData.discountedPrice"
              label="Discounted Price"
              type="number"
              step="0.1"
            ></v-text-field>
          </v-col>
        </v-row>

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

        <v-switch v-model="formData.active" label="Active"></v-switch>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="closeForm">Cancel</v-btn>
        <v-btn
          @click="addItem({ property: 'foods', item: formData }) && closeForm()"
          color="primary"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'CreateFoodDialog',
  data() {
    return {
      dialog: null,
      formData: {}
    };
  },
  methods: {
    ...mapActions('dashboard/foods', ['addItem']),
    closeForm() {
      this.formData = {};
      this.dialog = false;
    }
  }
};
</script>
