<template>
<!-- style="top:100px;" clipped left fixed permanent -->
  <!-- <v-navigation-drawer width="300" left clipped fixed style="height:100vh;top:100px;max-height:calc(100% - 100px);"> -->
  <v-navigation-drawer v-model="drawer" width="300" stateless left clipped style="min-width:300px;position:sticky;left:0;top:100px;bottom:100px;height:calc(100vh - 100px);">
    <template #prepend>
      <!-- show vehicle info and actions on top left of vehicle dashboard navigation drawer -->
      <vehicle-card />
      <!-- <v-divider class="mx-5" /> -->
      <v-divider />
    </template>


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
    <template #append>
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <v-btn color="primary" small tile block text depressed :to="{ name: 'vehicle-dashboard-wrapper' }">Back to search</v-btn>
        </v-list-item-content>
      </v-list-item>
    </template>
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
    drawer: true,
    dashboard_items: [
      // {
      //   key: 'vehicle_dashboard.vehicle_and_driver',
      //   to: { name: 'vehicle-dashboard-details' },
      //   icon: 'mdi-car'
      // },
      {
        key: 'vehicle_dashboard.driver',
        to: { name: 'vehicle-dashboard-drivers' },
        icon: 'person'
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
        key: 'vehicle_dashboard.rental',
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
        key: 'vehicle_dashboard.notes',
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