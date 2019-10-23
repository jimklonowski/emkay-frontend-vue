<template>
  <v-container>
    <v-row>
      <component
        :is="section.component"
        v-for="(section, index) in widgets"
        :id="section.id"
        :key="index"
        :vehicle="$route.params.vehicle"
        :class="section.class"
      />
    </v-row>
  </v-container>
</template>

<script>
import VehicleDetails from '@/modules/vehicle/components/VehicleDetails'
import DriverDetails from '@/modules/vehicle/components/DriverDetails'
import FuelHistory from '@/modules/vehicle/components/FuelHistory'

export default {
  name: 'dashboard',
  components: {
    VehicleDetails,
    DriverDetails,
    FuelHistory
  },
  data: () => ({
    vehicle: '',
    items: [
      {
        key: 'vehicle_dashboard.vehicle_details',
        class: 'pa-5 col-lg-6',
        component: VehicleDetails
      },
      {
        key: 'vehicle_dashboard.driver_details',
        class: 'pa-5 col-lg-6',
        component: DriverDetails
      },
      {
        key: 'vehicle_dashboard.driver_details',
        class: 'pa-5 col-12',
        component: FuelHistory
      }      
    ]
  }),
  computed: {
    widgets() {
      // inject an id that vuetify.goTo can use to navigate
      return this.items.map((widget, index) => ({ ...widget, id: `toc${index}` }))
    }
  }
}
</script>

<style>

</style>