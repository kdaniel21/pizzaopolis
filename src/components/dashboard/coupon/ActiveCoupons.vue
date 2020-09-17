<template>
  <v-data-iterator
    id="active-coupons"
    :items="activeCoupons"
    :items-per-page.sync="itemsPerPage"
    v-if="activeCoupons && activeCoupons.length"
  >
    <template v-slot:default="props">
      <v-row>
        <v-col
          v-for="item in props.items"
          :key="item.code"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card @click="editCoupon(item)">
            <v-card-title>{{ item.code }}</v-card-title>
            <v-divider></v-divider>

            <v-list dense>
              <!-- VALUE -->
              <v-list-item>
                <v-list-item-content>Value</v-list-item-content>
                <v-list-item-action class="align-end">
                  {{ item.value }}
                  {{ item.type === 'amount' ? 'EUR' : '%' }}</v-list-item-action
                >
              </v-list-item>

              <!-- REGULAR LIST ITEMS -->
              <v-list-item v-for="listItem in listItems" :key="listItem.value">
                <v-list-item-content>{{ listItem.text }}</v-list-item-content>
                <v-list-item-action v-if="listItem.date">
                  {{
                    new Date(item[listItem.value]).toLocaleDateString('hu-HU')
                  }}
                </v-list-item-action>
                <v-list-item-action v-else>
                  {{ item[listItem.value] }}
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'coupons',
  data() {
    return {
      itemsPerPage: 3,
      listItems: [
        { text: 'Max Usage', value: 'maxTimesUsed' },
        { text: 'Total Usage', value: 'timesUsed' },
        { text: 'Expires', value: 'expiresAt', date: true },
        { text: 'Created At', value: 'createdAt', date: true }
      ]
    };
  },
  computed: {
    ...mapGetters('dashboard/coupons', ['activeCoupons'])
  },
  watch: {
    activeCoupons(val) {
      console.log('rendering', val);
    }
  },
  methods: {
    ...mapActions('dashboard/coupons', ['editCoupon'])
  }
};
</script>
