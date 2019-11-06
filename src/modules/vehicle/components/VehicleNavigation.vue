<template>
  <v-app-bar
    app
    tile
    dense
    elevation="2"
    fixed
    style="top:64px;z-index:4;"
    tag="nav"
  >
    <v-tabs color="primary lighten-3">
      <v-tabs-slider color="primary--text text--lighten-2" />
      <v-tab
        v-for="item in items"
        :key="item.text"
        :to="item.to"
        :vehicle="vehicle"
      >
        {{ $t(item.key) }}
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    items: [
      {
        key: 'vehicle_dashboard.dashboard',
        to: { name: 'vehicle-dashboard-details' },
        meta: {
          // allow this route to be taken without a vehicle parameter (shows the search route)
          allowNoParam: true
        }
      },
      {
        key: 'vehicle_dashboard.documents',
        to: { name: 'documents' },
        meta: {}
      },
      {
        key: 'vehicle_dashboard.inspections',
        to: { name: 'inspections' },
        meta: {}
      },
      {
        key: 'vehicle_dashboard.saferoads',
        to: { name: 'saferoads' },
        meta: {}
      },
      {
        key: 'transtor.transports_and_storage',
        to: { name: 'transtor-status' },
        meta: {}
      }
    ]
  })
}
</script>

<style>

</style>