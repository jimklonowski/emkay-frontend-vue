<template>
  <div class="d-flex" :style="this.$route.meta.toc ? 'padding-left:300px' : ''">
    <vehicle-dashboard-toc />
    <v-container fluid>
      <breadcrumb-row />
      <!-- <v-row>
        <v-col cols="12">
          <vehicle-info :vehicle="$route.params.vehicle" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <driver-info />
        </v-col>
      </v-row> -->
      <v-scroll-y-transition mode="out-in">
        <router-view />
      </v-scroll-y-transition>
    </v-container>
  </div>
</template>

<script>
//import VehicleInfo from '@/modules/vehicle/components/VehicleInfo'
//import DriverInfo from '@/modules/vehicle/components/DriverInfo'
import BreadcrumbRow from '@/modules/core/components/navigation/BreadcrumbRow'
import VehicleDashboardToc from '@/modules/vehicle/components/VehicleDashboardToc'
export default {
  components: { BreadcrumbRow, VehicleDashboardToc },
  data: () => ({
    vehicle: '' 
  }),
  beforeCreate() {
    //debugger
  }
}
</script>

<style>
.toc {
  list-style-type: none;
}
.toc li a {
  text-decoration: none;
  border-left: 2px solid transparent;
  padding-left: 16px;
  transition: color 0.1s ease-in;
  color: currentColor;
}

.toc-item {
  color: #9E9E9E !important;
  display:block;
}
.toc-item.router-link-active {
  color: #4F286C !important;
  border-left: 2px solid;
}
</style>