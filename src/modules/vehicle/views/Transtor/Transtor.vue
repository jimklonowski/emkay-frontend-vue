<template>
  <section>
    <v-card class="mb-1" elevation="1" tile>
      <v-tabs v-model="tabs" slider-color="primary lighten-4" :slider-size="5" background-color="primary lighten-1" dark icons-and-text grow>

        <!-- <v-tab class="primary--text" :to="{ name: 'transtor-status' }" v-t="'vehicle_dashboard.order_status'" /> -->
        <v-tab :to="{ name: 'transtor-status' }">
          {{ $t('transtor.transport_status') }}
          <v-icon>departure_board</v-icon>
        </v-tab>
        <v-tab :to="{ name: 'transtor-quote' }">
          {{ $t('transtor.request_quote') }}
          <v-icon >local_atm</v-icon>
        </v-tab>
        <v-tab :to="{ name: 'transtor-order' }">
          {{ $t('vehicle_dashboard.create_order') }}
          <v-icon >local_shipping</v-icon>
        </v-tab>
      </v-tabs>
      <transtor-vehicle />
    </v-card>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </section>
</template>

<script>
import TranstorVehicle from '@/modules/vehicle/components/TranstorVehicle'
export default {
  components: {
    TranstorVehicle
  },
  data: self => ({
    errorMessage: null,
    quote_loading: true,
    loading: false,
    search: '',
    tabs: null,
    title: {
      key1: 'transtor.transport',
      key2: 'transtor.storage',
      subtitle: self.vehicle
    },    
    transport: null
  }),
  created() {
    this.vehicle = this.$route.params.vehicle
    //console.log('do transtor stuff')
    this.quote_loading = false
  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: this.$t('vehicle_dashboard.vehicle_search'),
          disabled: false,
          exact: true,
          to: { name: 'vehicle-dashboard' }
        },
        {
          text: this.$route.params.vehicle,
          disabled: true
        },
        {
          text: this.$t('transtor.transports_and_storage'),
          disabled: true
        }
      ]
    }
  }
}
</script>
