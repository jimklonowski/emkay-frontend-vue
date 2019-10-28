<template>
  <section>
    <v-container>
      <v-row>
        <v-breadcrumbs :items="breadcrumbs" />
      </v-row>
      <v-card>
        <v-tabs v-model="tabs" background-color="primary" dark icons-and-text grow>
          <v-tabs-slider />
          <!-- <v-tab class="primary--text" :to="{ name: 'transtor-status' }" v-t="'vehicle_dashboard.order_status'" /> -->
          <v-tab :to="{ name: 'transtor-status' }">
            {{ $t('vehicle_dashboard.transport_status') }}
            <v-icon>departure_board</v-icon>
          </v-tab>
          <v-tab :to="{ name: 'transtor-quote' }">
            {{ $t('vehicle_dashboard.request_quote') }}
            <v-icon >local_atm</v-icon>
          </v-tab>
          <v-tab :to="{ name: 'transtor-order' }">
            {{ $t('vehicle_dashboard.create_order') }}
            <v-icon >local_shipping</v-icon>
          </v-tab>
        </v-tabs>
        <router-view />
      </v-card>
    </v-container>
  </section>
</template>

<script>
export default {
  data: self => ({
    errorMessage: null,
    quote_loading: true,
    loading: false,
    search: '',
    tabs: null,
    title: {
      key1: 'vehicle_dashboard.transport',
      key2: 'vehicle_dashboard.storage',
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
          text: this.$t('vehicle_dashboard.transport_storage'),
          disabled: true
        }
      ]
    }
  }
}
</script>

<style>

</style>