<template>
  <v-navigation-drawer width="300" left absolute permanent>
    <!-- <v-list dense nav>
      <v-list-item two-line>
        <v-list-item-avatar class="caption" color="secondary lighten-2" :size="50">
          <v-icon color="white">mdi-car</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">{{ $route.params.vehicle }}</v-list-item-title>
          <v-list-item-subtitle class="caption">2012 Jeep Compass</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon>mdi-settings</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          
        </v-list-item-content>
      </v-list-item>
    </v-list> -->
    <vehicle-card />
    <v-divider />

    <v-list dense nav>
      <v-list-group :prepend-icon="'mdi-view-dashboard'" class="py-2" :value="true" no-action>
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>{{ $t('vehicle_dashboard.dashboard') }}</v-list-item-title>
          </v-list-item-content>
        </template>
      
        <v-list-item v-for="(item, name) in dashboard_items" :key="name" :to="item.to" dense>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(item.key) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    

      <v-list-item v-for="(item, name) in nav_items" :key="name" :to="item.to" color="primary" dense>
        <v-list-item-icon>
          <v-icon v-text="item.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t(item.key) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import VehicleCard from '@/modules/vehicle/components/VehicleCard'
export default {
  name: 'vehicle-dashboard-toc',
  components: {
    VehicleCard
  },
  data: () => ({
    mini: true,
    dashboard_items: [
      {
        key: 'vehicle_dashboard.vehicle_and_driver',
        to: { name: 'vehicle-dashboard-details' },
        icon: 'mdi-car'
      },
      {
        key: 'vehicle_dashboard.fuel',
        to: { name: 'vehicle-dashboard-fuel' },
        icon: 'mdi-gas-station'
      },
      {
        key: 'vehicle_dashboard.maintenance',
        to: { name: 'vehicle-dashboard-maintenance' },
        icon: 'mdi-maintenance'
      },
      {
        key: 'vehicle_dashboard.invoice',
        to: { name: 'vehicle-dashboard-invoice' },
        icon: 'receipt'
      },
      {
        key: 'vehicle_dashboard.licensing',
        to: { name: 'vehicle-dashboard-licensing' },
        icon: 'picture_in_picture'
      },
      {
        key: 'vehicle_dashboard.accident',
        to: { name: 'vehicle-dashboard-accident' },
        icon: 'error_outline'
      },
      {
        key: 'vehicle_dashboard.rental_history',
        to: { name: 'vehicle-dashboard-rentals' },
        icon: 'emoji_transportation'
      },
      {
        key: 'vehicle_dashboard.toll',
        to: { name: 'vehicle-dashboard-tolls' },
        icon: 'confirmation_number'
      },
      {
        key: 'vehicle_dashboard.violation',
        to: { name: 'vehicle-dashboard-violations' },
        icon: 'warning'
      },
      {
        key: 'vehicle_dashboard.odometer',
        to: { name: 'vehicle-dashboard-odometers' },
        icon: 'av_timer'
      },
      {
        key: 'vehicle_dashboard.driver_history',
        to: { name: 'vehicle-dashboard-drivers' },
        icon: 'person'
      },
      {
        key: 'vehicle_dashboard.vehicle_notes',
        to: { name: 'vehicle-dashboard-notes' },
        icon: 'note'
      }
    ],
    nav_items: [
      {
        key: 'vehicle_dashboard.documents',
        to: { name: 'vehicle-dashboard-documents' },
        icon: 'mdi-file-document'
      },
      {
        key: 'vehicle_dashboard.inspections',
        to: { name: 'vehicle-dashboard-inspections' },
        icon: 'mdi-car-info'
      },
      {
        key: 'vehicle_dashboard.saferoads',
        to: { name: 'vehicle-dashboard-saferoads' },
        icon: 'mdi-chart-areaspline'
      },
      {
        key: 'transtor.transports_and_storage',
        to: { name: 'transtor-status' },
        icon: 'mdi-car-multiple'
      }
    ]
  })
}
</script>