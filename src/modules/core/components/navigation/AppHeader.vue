<template>
  <header>
    <!-- <system-bar /> -->
    <v-system-bar
      app
      dark
      color="primary darken-3"
      window
      style="z-index:6;"
    >
      <template v-for="(item, key) in system_bar_items">
        <v-btn v-if="isAuthenticated" :key="key" x-small text depressed rounded>
          <v-icon v-text="item.icon" />
          <span class="system-bar-text">
            {{ $tc(item.key, item.count) }}
          </span>
        </v-btn>
      </template>
      <v-spacer />
      <omni-switch />
    </v-system-bar>
    <v-app-bar
      app
      color="primary"
      :dark="!$vuetify.theme.dark"
    >
      <v-app-bar-nav-icon />
      <v-toolbar-title>EMKAY, Inc</v-toolbar-title>
      <v-spacer />

      <v-btn text :to="{ name: 'home' }">
        <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-home</v-icon>
        <span v-show="$vuetify.breakpoint.lgAndUp">
          {{ $t('navigation.home') }}
        </span>
      </v-btn>

      <v-btn text to="/fleet">
        <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-car-multiple</v-icon>
        <span v-show="$vuetify.breakpoint.lgAndUp">
          {{ $t('navigation.fleet_dashboard') }}
        </span>
      </v-btn>
      
      <v-btn text :to="{ name: 'vehicle-dashboard-wrapper' }">
        <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-car-cruise-control</v-icon>
        <span v-show="$vuetify.breakpoint.lgAndUp">
          {{ $t('navigation.vehicle_dashboard') }}
        </span>
      </v-btn>

      <v-menu
        v-model="orderingMenu"
        :close-on-content-click="false"
        origin="top right"
        transition="scale-transition"
        left
        offset-y
        :nudge-bottom="12"
        bottom
      >
        <template #activator="{ on }">
          <v-btn v-on="on" text>
            <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-steering</v-icon>
            <span v-show="$vuetify.breakpoint.lgAndUp">
              {{ $t('navigation.ordering') }}
              <v-icon>mdi-chevron-down</v-icon>
            </span>
          </v-btn>
        </template>
        <v-card width="800">
          <v-card-title class="subtitle-1 text-center" style="background-image: linear-gradient(120deg,#e0c3fc,#8ec5fc)!important;">Ordering</v-card-title>
          <v-divider />
          <v-card-text class="pa-0">
            <v-row no-gutters>
              <v-col sm="6" lg="4">
                <v-list dense nav subheader class="d-flex flex-column align-start">
                  <v-subheader v-t="ordering_categories[0].key" />
                  <v-btn x-small text v-for="(item, name, key) in ordering_categories[0].items" :key="key" :to="item.to">
                    <v-icon x-small class="mr-2">mdi-source-commit</v-icon>
                    {{ $t(item.key) }}
                  </v-btn>
                </v-list>
              </v-col>
              <v-col sm="6" lg="4">
                <v-list dense nav subheader class="d-flex flex-column align-start">
                  <v-subheader v-t="ordering_categories[1].key" />
                  <v-btn x-small text v-for="(item, name, key) in ordering_categories[1].items" :key="key" :to="item.to">
                    <v-icon x-small class="mr-2">mdi-source-commit-local</v-icon>
                    {{ $t(item.key) }}
                  </v-btn>
                </v-list>
              </v-col>
              <v-col sm="6" lg="4">
                <v-list dense nav subheader class="d-flex flex-column align-start">
                  <v-subheader v-t="ordering_categories[2].key" />
                  <v-btn x-small text v-for="(item, name, key) in ordering_categories[2].items" :key="key" :to="item.to">
                    <v-icon x-small class="mr-2">{{ item.icon }}</v-icon>
                    {{ $t(item.key) }}
                  </v-btn>
                </v-list>
              </v-col>
            </v-row>

            <!-- <div class="d-flex justify-space-around">
              <v-list subheader dense nav class="flex-grow-1">
                <v-subheader v-t="ordering_categories[0].key" />
                <v-btn x-small text v-for="(item, name, key) in ordering_categories[0].items" :key="key" :to="item.to" v-t="item.key" />
              </v-list>
              <v-divider vertical />
              <v-list subheader dense nav class="flex-grow-1">
                <v-subheader v-t="ordering_categories[1].key" />
                <v-btn x-small text v-for="(item, name, key) in ordering_categories[1].items" :key="key" :to="item.to" v-t="item.key" />
              </v-list>
              <v-divider vertical />
              <v-list subheader dense nav class="flex-grow-1">
                <v-subheader v-t="ordering_categories[2].key" />
                <v-btn x-small text v-for="(item, name, key) in ordering_categories[2].items" :key="key" :to="item.to">
                  <v-icon x-small class="mr-2">{{ item.icon }}</v-icon>
                  {{ $t(item.key) }}
                </v-btn>
              </v-list>
            </div> -->
            <!-- <v-row no-gutters>
              <v-col cols="12" sm="4" min-width="250">
                <v-list subheader dense nav>
                  <v-subheader v-t="ordering_categories[0].key" />
                  <v-btn x-small text v-for="(item, name, key) in ordering_categories[0].items" :key="key" :to="item.to" v-t="item.key" />
                </v-list>                
              </v-col>
              <v-col cols="12" sm="4">
                <v-list subheader dense nav>
                  <v-subheader v-t="ordering_categories[1].key" />
                  <v-btn x-small text v-for="(item, name, key) in ordering_categories[1].items" :key="key" :to="item.to" v-t="item.key" />
                </v-list>
              </v-col>
              <v-col cols="12" sm="4">
                <v-list subheader dense nav>
                  <v-subheader v-t="ordering_categories[2].key" />
                  <v-btn x-small text v-for="(item, name, key) in ordering_categories[2].items" :key="key" :to="item.to" v-t="item.key" />
                </v-list>
              </v-col>
            </v-row> -->
          </v-card-text>
        </v-card>
      </v-menu>

      <v-btn text>
        <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-dashboard</v-icon>
        <span v-show="$vuetify.breakpoint.lgAndUp">
          {{ $t('navigation.reporting') }}
        </span>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>

      <v-btn text>
        <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-toolbox</v-icon>
        <span v-show="$vuetify.breakpoint.lgAndUp">
          {{ $t('navigation.fleet_management') }}
        </span>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>

      <!-- <v-btn v-for="(item, key) in items" :key="key" small text>
        {{ $t(item.key) }}
        <v-icon v-if="item.categories">mdi-chevron-down</v-icon>
      </v-btn> -->
      <!-- <template #extension>
        <v-tabs align-with-title background-color="transparent">
          <v-tab>Home</v-tab>
          <v-tab>Fleet Dashboard</v-tab>
          <v-tab>Vehicle Dashboard</v-tab>
          <v-tab>Ordering</v-tab>
          <v-tab>Reporting</v-tab>
          <v-tab>Fleet Management</v-tab>
        </v-tabs>
      </template> -->
    </v-app-bar>
  </header>
</template>

<script>
import OmniSwitch from '@/modules/core/components/navigation/OmniSwitch'
import { mapGetters } from 'vuex'
//import AppBar from '@/modules/core/components/navigation/AppBar'
//import SystemBar from '@/modules/core/components/navigation/SystemBar'

export default {
  components: {
    OmniSwitch
    //AppBar,
    //SystemBar
  },
  data: () => ({
    orderingMenu: false,
    ordering_categories: [
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
          { key: 'navigation.manage_your_selectors', to: '/todo', icon: 'mdi-settings' },
          { key: 'navigation.manage_your_selector_groups', to: '/todo', icon: 'mdi-folder-settings-variant' }
        ]
      }
    ],
    system_bar_items: [
      {
        text: 'Unread Messages',
        key: 'notifications.unread_messages',
        to: { name: 'notifications' },
        icon: 'mdi-email',
        count: 10
      },
      {
        text: 'Critical Alerts',
        key: 'notifications.critical_alerts',
        to: { name: 'notifications' },
        icon: 'mdi-bell',
        count: 3
      },
      {
        text: 'Driver Order Approvals',
        key: 'notifications.driver_order_approvals',
        to: { name: 'notifications' },
        icon: 'mdi-car',
        count: 0
      },
      {
        text: 'Maintenance Approvals',
        key: 'notifications.maintenance_approvals',
        to: { name: 'notifications' },
        icon: 'mdi-alert-circle-check',
        count: 1
      },
      {
        text: 'Fleet Navigator',
        key: 'navigation.fleet_navigator',
        to: { name: 'notifications' },
        icon: 'mdi-widgets'
      }
    ],

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
  }),
  computed: {
    ...mapGetters('auth',['isAuthenticated']),
  }
}
</script>

<style>

</style>