<template>
  <v-app-bar
    tile
    dense
    height="36"
    absolute
    elevation="2"
    style="position:sticky;top:72px;z-index:4;"
    tag="nav"
  >
    <v-tabs color="primary lighten-3" height="36">
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
        to: { name: 'dashboard' },
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
        key: 'vehicle_dashboard.transport_storage',
        to: { name: 'transtor-status' },
        meta: {}
      }
    ]
  })
}
</script>

<style>

</style>