<template>
  <v-row>
    <v-col cols="12" lg="6">
      <vehicle-details :vehicle="vehicle" />
    </v-col>
    <v-col cols="12" lg="6">
      <driver-details :vehicle="vehicle" />
    </v-col>
  </v-row>
</template>

<script>
import DriverDetails from '@/modules/vehicle/views/Dashboard/DriverDetails'
import VehicleDetails from '@/modules/vehicle/views/Dashboard/VehicleDetails'
export default {
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  components: {
    DriverDetails,
    VehicleDetails
  }
}
</script>