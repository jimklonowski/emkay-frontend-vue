<template>
  <v-navigation-drawer color="transparent" style="min-width:225px;top:150px;" width="225px" clipped left floating fixed permanent>
    <ul class="toc my-12">
      <li v-t="'vehicle_dashboard.dashboard_contents'" class="mb-2 body-1" />
      <li v-for="(item, name) in items" :key="name" class="mb-2">
        <router-link :to="item.to" v-t="item.key" class="toc-item body-2" />
      </li>
    </ul>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'vehicle-dashboard-toc',
  data: () => ({
    items: [
      {
        key: 'vehicle_dashboard.vehicle_and_driver',
        to: { name: 'vehicle-dashboard-details' }
      },
      {
        key: 'vehicle_dashboard.fuel_history',
        to: { name: 'vehicle-dashboard-fuel' }
      },
      {
        key: 'vehicle_dashboard.maintenance_history',
        to: { name: 'vehicle-dashboard-maintenance' }
      },
      {
        key: 'vehicle_dashboard.invoice_history',
        to: { name: 'vehicle-dashboard-invoice' }
      },
      {
        key: 'vehicle_dashboard.licensing_history',
        to: { name: 'vehicle-dashboard-licensing' }
      },
      {
        key: 'vehicle_dashboard.accident_history',
        to: { name: 'vehicle-dashboard-accident' }
      },
      {
        key: 'vehicle_dashboard.rental_history',
        to: { name: 'vehicle-dashboard-rentals' }
      },
      {
        key: 'vehicle_dashboard.toll_history',
        to: { name: 'vehicle-dashboard-tolls' }
      },
      {
        key: 'vehicle_dashboard.violation_history',
        to: { name: 'vehicle-dashboard-violations' }
      },
      {
        key: 'vehicle_dashboard.odometer_history',
        to: { name: 'vehicle-dashboard-odometers' }
      },
      {
        key: 'vehicle_dashboard.driver_history',
        to: { name: 'vehicle-dashboard-drivers' }
      },
      {
        key: 'vehicle_dashboard.vehicle_notes',
        to: { name: 'vehicle-dashboard-notes' }
      }
    ]
  })
}
</script>