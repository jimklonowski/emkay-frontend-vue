<template>
  <v-card :loading="loading">
    <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
      <toolbar-title v-bind="title" />
      <v-spacer />
      <v-btn large icon tile dark @click.prevent="$emit('close')">
        <v-icon v-text="'close'" />
      </v-btn>
    </v-toolbar>
    <v-divider />
    <v-card-text class="py-0" style="height: calc(600px - 65px);overflow-y:scroll;">
      <v-timeline light align-top>
        <v-timeline-item
          v-for="(date, key) in model.timeline"
          :key="key"
          small
        >
          <v-card>
            <v-card-title v-t="`vehicle_dashboard.${key}`" />
            <v-card-text v-text="date" />
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
    <v-card-actions />
  </v-card>
</template>

<script>
import ToolbarTitle from '@/modules/core/components/ToolbarTitle'
import { isPastDate } from '@/util/helpers'
export default {
  components: { ToolbarTitle },
  props: {
    vehicle: { type: String, default: '' }
  },
  data: self => ({
    loading: false,
    errorMessage: null,
    key: 'vehicle_dashboard.order_status',
    title: {
      key1: 'vehicle_dashboard.order',
      key2: 'vehicle_dashboard.status',
      subtitle: self.vehicle
    },
    model: {
      driver: '',
      vehicle_number: '',
      vehicle_description: '',
      factory_order_number: '',
      serial_number: '',
      ship_to_dealer_info: '',
      priority_code: '',
      comments: '',
      timeline: {
        emkay_ordered_date: '',
        emkay_received_date: '',
        zone_received_date: '',
        dealer_ordered_date: '',
        sent_to_plant: '',
        ship_to_dealer: '',
        production_scheduled: '',
        build_date: '',
        shipped_to_body_co: '',
        at_body_co: '',
        shipped_from_body_co: '',
        back_at_manufacturer: '',
        shipped_to_dealer: '',
        release_to_convoy: '',
        delivery_to_dealer: '',
        delivery_date: ''
      }
    },
  }),
  async created() {
    let url = `/order-status/${this.vehicle}`
    this.loading = true
    this.$http
      .get(url, this.vehicle)
      .then(response => {
        this.model = { ...this.model, ...response.data }
        this.errorMessage = null
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  computed: {
    past(date) {
      return this.isPastDate(date)
    }
  },
  methods: {
    isPastDate
  }
}
</script>

<style>

</style>