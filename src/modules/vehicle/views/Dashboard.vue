<template>
  <section :style="this.$route.meta.toc && $vuetify.breakpoint.mdAndUp ? 'padding-right:200px' : ''">
    <v-container>
      <v-row>
        <v-breadcrumbs :items="breadcrumbs" />
      </v-row>
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
    <v-navigation-drawer
      right
      floating
      clipped
      fixed
      permanent
      width="200"
      color="transparent"
      class="overflow-hidden align-center hidden-sm-and-down"
      style="top:148px;"
    >
      <table-of-contents :toc-items="widgets" />
    </v-navigation-drawer>
  </section>
</template>

<script>
import TableOfContents from '@/modules/core/components/TableOfContents'
import VehicleDetails from '@/modules/vehicle/components/VehicleDetails'
import DriverDetails from '@/modules/vehicle/components/DriverDetails'
import FuelHistory from '@/modules/vehicle/components/datatables/FuelHistory'
import MaintenanceHistory from '@/modules/vehicle/components/datatables/MaintenanceHistory'
import InvoiceHistory from '@/modules/vehicle/components/datatables/InvoiceHistory'
import LicensingHistory from '@/modules/vehicle/components/datatables/LicensingHistory'
import AccidentHistory from '@/modules/vehicle/components/datatables/AccidentHistory'
import RentalHistory from '@/modules/vehicle/components/datatables/RentalHistory'
import TollHistory from '@/modules/vehicle/components/datatables/TollHistory'
import ViolationHistory from '@/modules/vehicle/components/datatables/ViolationHistory'
import OdometerHistory from '@/modules/vehicle/components/datatables/OdometerHistory'
import DriverHistory from '@/modules/vehicle/components/datatables/DriverHistory'
import VehicleNotes from '@/modules/vehicle/components/datatables/VehicleNotes'

export default {
  name: 'dashboard',
  components: {
    TableOfContents,
    VehicleDetails,
    DriverDetails,
    FuelHistory,
    MaintenanceHistory,
    InvoiceHistory,
    LicensingHistory,
    AccidentHistory,
    RentalHistory,
    TollHistory,
    ViolationHistory,
    OdometerHistory,
    DriverHistory,
    VehicleNotes
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
        key: 'vehicle_dashboard.fuel_history',
        class: 'pa-5 col-12',
        component: FuelHistory
      },
      {
        key: 'vehicle_dashboard.maintenance_history',
        class: 'pa-5 col-12',
        component: MaintenanceHistory
      },
      {
        key: 'vehicle_dashboard.invoice_history',
        class: 'pa-5 col-12',
        component: InvoiceHistory
      },
      {
        key: 'vehicle_dashboard.licensing_history',
        class: 'pa-5 col-12',
        component: LicensingHistory
      },
      {
        key: 'vehicle_dashboard.accident_history',
        class: 'pa-5 col-12',
        component: AccidentHistory
      },
      {
        key: 'vehicle_dashboard.rental_history',
        class: 'pa-5 col-12',
        component: RentalHistory
      },
      {
        key: 'vehicle_dashboard.toll_history',
        class: 'pa-5 col-12',
        component: TollHistory
      },
      {
        key: 'vehicle_dashboard.violation_history',
        class: 'pa-5 col-lg-6',
        component: ViolationHistory
      },
      {
        key: 'vehicle_dashboard.odometer_history',
        class: 'pa-5 col-lg-6',
        component: OdometerHistory
      },
      {
        key: 'vehicle_dashboard.driver_history',
        class: 'pa-5 col-lg-6',
        component: DriverHistory
      },
      {
        key: 'vehicle_dashboard.vehicle_notes',
        class: 'pa-5 col-lg-6',
        component: VehicleNotes
      }
    ]
  }),
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
        }
      ]
    },
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

</style>