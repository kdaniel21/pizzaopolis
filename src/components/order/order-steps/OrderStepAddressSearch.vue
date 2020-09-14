<template>
  <v-autocomplete
    id="order-step-address-search"
    v-model="selectedLocation"
    :items="locations"
    :loading="!!timer"
    :search-input.sync="searchInput"
    item-text="label"
    :hide-no-data="true"
    item-value="address"
    return-object
    no-filter
    color="primary"
    :rules="[rules.required, rules.houseNumber]"
    prepend-icon="home"
    @change="$emit('change', selectedLocation.address)"
    label="Please add your address"
    :disabled="disabled"
  >
  </v-autocomplete>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrderStepAddressSearch',
  props: ['disabled', 'value'],
  data() {
    return {
      rules: {
        required: v => !!v || 'Please select your address!',
        houseNumber: v =>
          (!!v && !!v.address.houseNumber) || 'You must specify a house number!'
      },
      selectedLocation: null,
      searchInput: null,
      locations: [],
      timer: null
    };
  },
  watch: {
    async searchInput(val) {
      // No need to search again if value was passed in from the prop
      if (!val || (this.value && val === this.value.label)) return;

      this.fetchDebounced(val);
    },
    value(val) {
      if (!val.address || !Object.keys(val.address).length) return;

      this.locations.push(val);
      this.selectedLocation = val;
    }
  },
  methods: {
    // Handle debouncing
    fetchDebounced(val) {
      clearTimeout(this.timer);

      this.timer = setTimeout(async () => {
        await this.fetchAddress(val);
        this.timer = null;
      }, 500);
    },
    // Fetch the data
    async fetchAddress(val) {
      const params = {
        query: val,
        maxResults: 5,
        apikey: process.env.VUE_APP_HERE_DEV_API_KEY
      };
      const apiUrl =
        'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json';

      try {
        axios.defaults.withCredentials = false;
        const res = await axios.get(apiUrl, {
          params,
          withCredentials: false,
          headers: {}
        });

        this.locations = res.data.suggestions;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
