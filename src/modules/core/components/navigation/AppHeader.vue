<template>
  <header>
    <!-- <system-bar /> -->
    <v-system-bar
      app
      lights-out
      dark
      color="primary darken-1"
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
      style="background-image: linear-gradient(120deg,#4f286c,#8ec5fc)!important;"
      :dark="!$vuetify.theme.dark"
    >
      <v-app-bar-nav-icon />
      <v-toolbar-title class="title" style="min-width:100px;">EMKAY</v-toolbar-title>
      <v-spacer />
      <v-tabs v-model="navigationTabs" background-color="transparent" right>
        <v-tabs-slider />
        <v-tab :to="{ name: 'home' }">
          <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-home</v-icon>
          <span v-show="$vuetify.breakpoint.lgAndUp">
            {{ $t('navigation.home') }}
          </span>
        </v-tab>

        <v-tab to="/fleet">
          <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-car-multiple</v-icon>
          <span v-show="$vuetify.breakpoint.lgAndUp">
            {{ $t('navigation.fleet_dashboard') }}
          </span>
        </v-tab>
        
        <v-tab :to="{ name: 'vehicle-dashboard-wrapper' }">
          <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-car-cruise-control</v-icon>
          <span v-show="$vuetify.breakpoint.lgAndUp">
            {{ $t('navigation.vehicle_dashboard') }}
          </span>
        </v-tab>

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
            <v-tab v-on="on" readonly>
              <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-steering</v-icon>
              <span v-show="$vuetify.breakpoint.lgAndUp">
                {{ $t('navigation.ordering') }}
                <v-icon>mdi-chevron-down</v-icon>
              </span>
            </v-tab>
          </template>
          <v-card>
            <!-- <v-card-title class="subtitle-2 font-weight-light">Ordering</v-card-title>
            <v-divider /> -->
            <v-card-text class="pa-0">
              <v-tabs
                v-model="orderingTabs"
                centered
                height="32"
              >
                <v-tab v-for="(category, key) in ordering_categories" :key="`tab${key}`" class="overline" tag="span">
                  {{ $t(category.key) }}
                </v-tab>
              </v-tabs>
              <v-divider />
              <v-tabs-items v-model="orderingTabs">
                <v-tab-item v-for="(category, key) in ordering_categories" :key="`tab-item${key}`">
                  <v-card-text>
                    <v-list dense nav subheader class="d-flex flex-column align-start">
                      <v-btn x-small text v-for="(item, name, key) in category.items" :key="key" :to="category.to">
                        <v-icon x-small class="mr-2">mdi-source-commit</v-icon>
                        {{ $t(item.key) }}
                      </v-btn>
                    </v-list>
                  </v-card-text>
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
            <v-divider />
            <v-card-actions class="pa-0 flex-row">
              <v-tooltip open-delay="200" bottom>
                <template #activator="{ on }">
                  <v-btn large tile text width="50%" v-on="on">
                    <v-badge  color="warning" overlap>
                      <template #badge>
                        <span>2</span>
                      </template>
                      <v-icon large>mdi-timer-sand</v-icon>
                    </v-badge>
                  </v-btn>
                </template>
                <span class="overline">Driver Orders Awaiting Approval</span>
              </v-tooltip>
              <v-btn large tile text width="50%">
                Action
              </v-btn>
              
              
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-tab>
          <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-dashboard</v-icon>
          <span v-show="$vuetify.breakpoint.lgAndUp">
            {{ $t('navigation.reporting') }}
          </span>
          <v-icon>mdi-chevron-down</v-icon>
        </v-tab>

        <v-tab>
          <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-toolbox</v-icon>
          <span v-show="$vuetify.breakpoint.lgAndUp">
            {{ $t('navigation.fleet_management') }}
          </span>
          <v-icon>mdi-chevron-down</v-icon>
        </v-tab>
      </v-tabs>
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
  watch: {
    orderingMenu: function(val) {
      if(!val) {
        this.orderingTabs = 0
      }
    }
  },
  data: () => ({
    navigationTabs: null,
    orderingMenu: false,
    orderingTabs: 0,
    ordering_categories: [
      {
        key: 'navigation.orders',
        icon: 'mdi-timeline-text',
        items: [
          { key: 'navigation.place_factory_orders', to: '/todo' },
          { key: 'navigation.place_stock_orders', to: '/todo' },
          { key: 'navigation.view_order_requests', to: '/todo' }
        ]
      },
      {
        key: 'navigation.driver_orders',
        icon: 'mdi-cash-register',
        items: [
          { key: 'navigation.manage_driver_order_settings', to: '/todo' },
          { key: 'navigation.allow_drivers_to_order', to: '/todo' },
          { key: 'navigation.approve_driver_orders', to: '/todo' }
        ]
      },
      {
        key: 'navigation.selectors',
        icon: 'mdi-chart-timeline',
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