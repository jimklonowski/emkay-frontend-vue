<template>
  <div class="d-flex" :style="this.$route.meta.toc ? 'padding-left:300px' : ''">
    <v-container>
      <breadcrumb-row />
      <v-scroll-y-transition mode="out-in">
        <router-view />
      </v-scroll-y-transition>
    </v-container>
    <vehicle-dashboard-toc />
  </div>
</template>

<script>
//import VehicleSearch from '@/modules/vehicle/views/VehicleSearch'
import BreadcrumbRow from '@/modules/core/components/navigation/BreadcrumbRow'
import VehicleDashboardToc from '@/modules/vehicle/components/VehicleDashboardToc'
export default {
  components: { BreadcrumbRow, VehicleDashboardToc },
  data: () => ({
    vehicle: ''
    // items: [
    //   {
    //     key: 'vehicle_dashboard.vehicle_and_driver',
    //     to: { name: 'vehicle-dashboard-details' }
    //   },
    //   {
    //     key: 'vehicle_dashboard.fuel_history',
    //     to: { name: 'vehicle-dashboard-fuel' }
    //   },
    //   {
    //     key: 'vehicle_dashboard.maintenance_history',
    //     to: { name: 'vehicle-dashboard-maintenance' }
    //   },
    //   {
    //     key: 'vehicle_dashboard.invoice_history',
    //     to: { name: 'vehicle-dashboard-invoice' }
    //   },
    //   {
    //     key: 'vehicle_dashboard.licensing_history',
    //     to: { name: 'vehicle-dashboard-licensing' }
    //   },
    //   {
    //     key: 'vehicle_dashboard.accident_history',
    //     to: { name: 'vehicle-dashboard-accident' }
    //   },
    //   {
    //     key: 'vehicle_dashboard.rental_history',
    //     to: { name: 'vehicle-dashboard-rentals' }
    //   },
    //   {
    //     key: 'vehicle_dashboard.toll_history',
    //     to: { name: 'vehicle-dashboard-tolls' }
    //   },
    //   {
    //     key: 'vehicle_dashboard.violation_history',
    //     to: { name: 'vehicle-dashboard-violations' }
    //   },
    //   {
    //     key: 'vehicle_dashboard.odometer_history',
    //     to: { name: 'vehicle-dashboard-odometers' }
    //   },
    //   {
    //     key: 'vehicle_dashboard.driver_history',
    //     to: { name: 'vehicle-dashboard-drivers' }
    //   },
    //   {
    //     key: 'vehicle_dashboard.vehicle_notes',
    //     to: { name: 'vehicle-dashboard-notes' }
    //   }
    // ]
  }),
  beforeCreate() {
    //debugger
  },
  computed: {
    // breadcrumbs() {
    //   let currentPaths = this.$route.path.split("/")
    //   currentPaths.shift() // first path is empty /, so omit it from array
    //   let self = this
    //   let crumbs = []
    //   currentPaths.forEach(function(path, index) {
    //     //console.log(path)
    //     let breadcrumb = self.$route.matched[index].meta.breadcrumb
    //     crumbs.push({
    //       exact: true,
    //       text: breadcrumb.useParam ? self.$route.params.vehicle : self.$t(breadcrumb.key),
    //       to: breadcrumb.path,
    //       disabled: self.$route.name === self.$route.matched[index].name
    //     })
    //   })
    //   //debugger
    //   return crumbs
    // },
    styleObject() {
      return this.$route.meta.toc ? 'padding-right:200px' : ''
    },
    widgets() {
      // inject an id that vuetify.goTo can use to navigate
      return this.items.map((widget, index) => ({ ...widget, id: `toc${index}` }))
    }
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