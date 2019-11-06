<template>
  <!-- <div v-if="!$route.params.vehicle"> -->
  <vehicle-dashboard-search v-if="!$route.params.vehicle" />
  <!-- </div> -->
  <!-- <div v-else class="d-flex" :style="this.$route.meta.toc ? 'padding-left:300px' : ''"> -->
  <vehicle-dashboard v-else />
  <!-- </div> -->
</template>

<script>
//import BreadcrumbRow from '@/modules/core/components/navigation/BreadcrumbRow'
import VehicleDashboard from '@/modules/vehicle/views/Dashboard'
import VehicleDashboardSearch from '@/modules/vehicle/views/VehicleDashboardSearch'
export default {
  name: 'vehicle-dashboard-wrapper',
  components: {
    //BreadcrumbRow,
    VehicleDashboard,
    VehicleDashboardSearch
  },
  data: () => ({
    vehicle: '',
    loading: false
  })
}
</script>

<style>

</style>