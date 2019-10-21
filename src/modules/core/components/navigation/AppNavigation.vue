<template>
  <nav>
    <system-bar />
    <app-bar :items="items" />
  </nav>
</template>

<script>
import AppBar from '@/modules/core/components/navigation/AppBar'
import SystemBar from '@/modules/core/components/navigation/SystemBar'

export default {
  components: {
    AppBar,
    SystemBar
  },
  data: () => ({
    items: [
      {
        key: 'navigation.home',
        icon: 'home',
        to: '/'
      },
      {
        key: 'navigation.fleet_dashboard',
        icon: 'dashboard',
        to: '/fleet'
      },
      {
        key: 'navigation.vehicle_dashboard',
        icon: 'table_chart',
        to: '/vehicle'
      },
      {
        key: 'navigation.ordering',
        icon: 'pages',
        to: '/ordering',
        visible: false,
        categories: [
          {
            key: 'navigation.orders',
            items: [
              { key: 'navigation.place_factory_orders', to: '/todo' },
              { key: 'navigation.place_stock_orders', to: '/todo' },
              { key: 'navigation.view_order_requests', to: '/todo' }
            ]
          },
          {
            key: 'navigation.driver_orders',
            items: [
              { key: 'navigation.manage_driver_order_settings', to: '/todo' },
              { key: 'navigation.allow_drivers_to_order', to: '/todo' },
              { key: 'navigation.approve_driver_orders', to: '/todo' }
            ]
          },
          {
            key: 'navigation.selectors',
            items: [
              { key: 'navigation.manage_your_selectors', to: '/todo' },
              { key: 'navigation.manage_your_selector_groups', to: '/todo' }
            ]
          }
        ]
      },
      {
        key: 'navigation.reporting',
        icon: 'show_chart',
        to: '/reporting',
        visible: false,
        categories: [
          {
            key: 'common.fleet',
            items: [
              { key: 'reporting.inventory', to: '/todo' },
              { key: 'reporting.order_status', to: '/todo' },
              { key: 'reporting.replacement_analysis', to: '/todo' },
              { key: 'reporting.sold_vehicle_analysis', to: '/todo' },
            ]
          },
          {
            key: 'reporting.expenses',
            items: [
              { key: 'reporting.fuel_detail', to: '/todo' },
              { key: 'reporting.expense_summary', to: '/todo' },
              { key: 'reporting.maintenance_detail', to: '/todo' },
              { key: 'reporting.short_term_rental_detail', to: '/todo' },
              { key: 'reporting.toll_detail', to: '/todo' }
            ]
          },
          // {
          //   key: 'navigation.custom',
          //   items: [
          //     { key: 'navigation.vehicle_and_driver', to: '/todo' },
          //     { key: 'navigation.maintenance', to: '/todo' },
          //     { key: 'navigation.fuel', to: '/todo' },
          //     { key: 'navigation.invoice', to: '/todo' },
          //     { key: 'navigation.insurance_claim', to: '/todo' },
          //     { key: 'navigation.violation', to: '/todo' },
              
          //   ]
          // },
          {
            key: 'navigation.invoicing',
            items: [
              { key: 'reporting.invoice_history', to: '/todo' },
              { key: 'reporting.custom_invoicing', to: '/todo' }
            ]
          },
          {
            key: 'navigation.services',
            items: [
              { key: 'reporting.evoucher', to: '/todo' },
              { key: 'reporting.license_renewal', to: '/todo' },
              { key: 'reporting.driver_360_mileage', to: '/todo' },
              { key: 'reporting.accident_claim', to: '/todo' }
            ]
          },
          {
            key: 'navigation.safety_and_telematics',
            items: [
              { key: 'reporting.saferoads_fleet_summary', to: '/todo' },
              { key: 'reporting.saferoads_trip_detail', to: '/todo' },
              { key: 'reporting.engine_faults', to: '/todo' },
              { key: 'reporting.driver_safety', to: '/todo' },
              { key: 'reporting.driver_record', to: '/todo' }
            ]
          }
        ]
      },
      {
        key: 'navigation.fleet_management',
        icon: 'build',
        to: '/fleet-management',
        visible: false,
        categories: [
          {
            key: 'navigation.customization',
            items: [
              { key: 'navigation.manage_your_online_users', to: '/todo' },
              { key: 'navigation.manage_your_fleet_policies', to: '/todo' },
              { key: 'navigation.customize_your_fleet_labels', to: '/todo' },
              { key: 'navigation.manage_your_drivers', to: '/todo' },
              { key: 'navigation.manage_your_driver_fuel_pins', to: '/todo' },
              { key: 'navigation.manage_your_enotifications', to: '/todo' },
              { key: 'navigation.manage_your_cases', to: '/todo' },
              { key: 'navigation.view_your_fuel_auth_profiles', to: '/todo' }
            ]
          },
          {
            key: 'navigation.customization',
            items: [
              { key: 'navigation.approve_your_maintenance_repairs', to: '/todo' },
              { key: 'navigation.approve_your_driver_orders', to: '/todo' },
              { key: 'navigation.request_an_mvr', to: '/todo' },
              { key: 'reporting.upload_your_odometers', to: '/todo' }              
            ]
          },
          {
            key: 'navigation.tools',
            items: [
              { key: 'navigation.locate_preferred_shops', to: '/todo' },
              { key: 'navigation.quote_a_transport', to: '/todo' },
              { key: 'navigation.lcca', to: '/todo' }
            ]
          }
        ]
      }
    ]
  })
}
</script>

<style>

</style>