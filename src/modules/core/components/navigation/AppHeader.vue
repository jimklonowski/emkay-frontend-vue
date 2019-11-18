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
          <span style="font-family: 'Roboto Condensed', sans-serif;">
            {{ $tc(item.key, item.count) }}
          </span>
        </v-btn>
      </template>
      <v-spacer />
      <omni-switch />
    </v-system-bar>
    <v-app-bar
      app
      style="background-image: linear-gradient(120deg,#8ec5fc,#4f286c)!important;"
      dark
    >
      <v-app-bar-nav-icon />
      <v-btn text class="title" style="min-width:100px;" :to="{ name: 'home' }">EMKAY</v-btn>
      <v-spacer />
      <v-tabs ref="navigationTabs" v-if="isAuthenticated" v-resize="resizeNavigationTabs" v-model="navigationTab" background-color="transparent" right>
        
        <v-tabs-slider class="d-none" />

        <v-tab style="min-width:60px;" v-if="$vuetify.breakpoint.mdAndUp" :title="$t('navigation.home')" :to="{ name: 'home' }">
          <v-icon v-show="$vuetify.breakpoint.md">mdi-home</v-icon>
          <span v-show="$vuetify.breakpoint.lgAndUp">
            {{ $t('navigation.home') }}
          </span>
        </v-tab>

        <v-tab style="min-width:60px;" :title="$t('navigation.fleet_dashboard')" to="/fleet">
          <v-icon v-show="$vuetify.breakpoint.mdAndDown">mdi-car-multiple</v-icon>
          <span v-show="$vuetify.breakpoint.lgAndUp">
            {{ $t('navigation.fleet_dashboard') }}
          </span>
        </v-tab>
        
        <v-tab style="min-width:60px;" :title="$t('navigation.vehicle_dashboard')" :to="{ name: 'vehicle-dashboard-wrapper' }">
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
          :nudge-bottom="8"
          bottom
        >
          <template #activator="{ on }">
            <v-tab v-on="on" :title="$t('navigation.ordering')" style="min-width:60px;">
              <v-icon color="warning lighten-4" v-show="$vuetify.breakpoint.mdAndDown">mdi-steering</v-icon>
              <span v-show="$vuetify.breakpoint.lgAndUp">
                {{ $t('navigation.ordering') }}
                <v-icon>mdi-chevron-down</v-icon>
              </span>
            </v-tab>
          </template>
          <v-card>
            <v-list-item style="background-image:linear-gradient(to top right,#f6d365,#fda085);" two-line>
              <v-list-item-content>
                <v-list-item-title class="title white--text">Ordering</v-list-item-title>
                <v-list-item-subtitle class="caption white--text">Place orders, check order status, etc.</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-tabs
              v-model="orderingTab"
              color="warning"
              slider-size="3"
              slider-color="warning lighten-2"
              grow
              centered
            >
              <v-tab v-for="(category, key) in ordering_categories" :key="`orderingtab${key}`" class="overline">
                {{ $t(category.key) }}
              </v-tab>
            </v-tabs>
            <v-divider />
            <v-tabs-items v-model="orderingTab">
              <v-tab-item v-for="(category, key) in ordering_categories" :key="`orderingtab-item${key}`">
                <v-card-text class="pa-0">
                  <v-list nav tile dense color="secondary">
                    <v-list-item v-for="(item, name, key) in category.items" :key="key" :to="item.to" style="min-height:32px;">
                      <v-icon class="mr-4" size="20">{{ item.icon }}</v-icon>
                      <v-list-item-subtitle class="font-weight-regular">{{ $t(item.key) }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-tab-item>
            </v-tabs-items>
            <v-divider />
            <v-card-actions class="pa-0 flex-row">
              <v-tooltip open-delay="200" bottom>
                <template #activator="{ on }">
                  <v-btn large tile text width="50%" v-on="on">
                    <v-badge color="warning lighten-3">
                      <template #badge>
                        <span>2</span>
                      </template>
                      <v-icon>mdi-timer-sand</v-icon>
                    </v-badge>
                  </v-btn>
                </template>
                <span class="overline">Driver Orders Awaiting Approval</span>
              </v-tooltip>
              <v-btn large tile text width="50%">
                Another Action?
              </v-btn>
              
              
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-menu
          v-model="reportingMenu"
          :close-on-content-click="false"
          origin="top right"
          transition="scale-transition"
          left
          offset-y
          :nudge-bottom="8"
          bottom
        >
          <template #activator="{ on }">
            <v-tab v-on="on" title="Reporting" style="min-width:60px;">
              <v-icon color="warning lighten-4" v-show="$vuetify.breakpoint.mdAndDown">mdi-monitor-dashboard</v-icon>
              <span v-show="$vuetify.breakpoint.lgAndUp">
                {{ $t('navigation.reporting') }}
                <v-icon>mdi-chevron-down</v-icon>
              </span>
            </v-tab>
          </template>
          <v-card>
            <v-list-item style="background-image:linear-gradient(to top right,#f6d365,#fda085);" two-line>
              <v-list-item-content>
                <v-list-item-title class="title white--text">Reporting</v-list-item-title>
                <v-list-item-subtitle class="caption white--text">All of your <strong>fleet</strong> reports in one place</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-tabs
              v-model="reportingTab"
              color="warning"
              slider-size="3"
              slider-color="warning lighten-2"
              grow
              centered
            >
              <v-tab v-for="(category, key) in reporting_categories" :key="`reportingtab${key}`" class="overline">
                {{ $t(category.key) }}
              </v-tab>
            </v-tabs>
            <v-divider />
            <v-tabs-items v-model="reportingTab">
              <v-tab-item v-for="(category, key) in reporting_categories" :key="`reportingtab-item${key}`">
                <v-card-text class="pa-0">
                  <v-list nav tile dense>
                    <v-list-item v-for="(item, name, key) in category.items" :key="key" :to="item.to" style="min-height:32px;">
                      <v-icon class="mr-4" size="20">{{ item.icon || 'mdi-source-commit' }}</v-icon>
                      <v-list-item-subtitle class="font-weight-regular">{{ $t(item.key) }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-tab-item>
            </v-tabs-items>
            <v-divider />
            <v-card-actions class="pa-0">
              <v-spacer />
              <v-subheader>Do something else</v-subheader>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-menu
          v-model="managementMenu"
          :close-on-content-click="false"
          origin="top right"
          transition="scale-transition"
          left
          offset-y
          :nudge-bottom="8"
          bottom
        >
          <template #activator="{ on }">
            <v-tab v-on="on" title="Fleet Management" style="min-width:60px;">
              <v-icon color="warning lighten-4" v-show="$vuetify.breakpoint.mdAndDown">mdi-toolbox</v-icon>
              <span v-show="$vuetify.breakpoint.lgAndUp">
                {{ $t('navigation.fleet_management') }}
                <v-icon>mdi-chevron-down</v-icon>
              </span>
            </v-tab>
          </template>
          <v-card>
            <v-list-item style="background-image:linear-gradient(to top right,#f6d365,#fda085);" two-line>
              <v-list-item-content>
                <v-list-item-title class="title white--text">Fleet Management</v-list-item-title>
                <v-list-item-subtitle class="caption white--text">Configure your <strong>fleet</strong> settings</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-tabs
              v-model="managementTab"
              color="warning"
              slider-size="3"
              slider-color="warning lighten-2"
              grow
              centered
            >
              <v-tab v-for="(category, key) in management_categories" :key="`managementtab${key}`" class="overline">
                {{ $t(category.key) }}
              </v-tab>
            </v-tabs>
            <v-divider />
            <v-tabs-items v-model="managementTab">
              <v-tab-item v-for="(category, key) in management_categories" :key="`managementtab-item${key}`">
                <v-card-text class="pa-0">
                  <v-list nav tile dense>
                    <v-list-item v-for="(item, name, key) in category.items" :key="key" :to="item.to" style="min-height:32px;">
                      <v-icon class="mr-4" size="20">{{ item.icon || 'mdi-source-commit' }}</v-icon>
                      <v-list-item-subtitle class="font-weight-regular">{{ $t(item.key) }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-tab-item>
            </v-tabs-items>
            <v-divider />
            <v-card-actions class="pa-0">
              <v-spacer />
              <v-subheader>Do something else</v-subheader>
            </v-card-actions>
          </v-card>
        </v-menu>

        
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
  methods: {
    resizeNavigationTabs() {
      this.$refs.navigationTabs.onResize()
    }
  },
  watch: {
    managementMenu: function(val) {
      if (!val) {
        this.navigationTab = null
        this.managementTab = 0
      }
    },
    orderingMenu: function(val) {
      if (!val) {
        // if menu has just closed, clear the slider from the navigation bar since we dont want to see an active slider on the megamenus which are just dropdowns
        this.navigationTab = null
        this.orderingTab = 0
      }
    },
    reportingMenu: function(val) {
      if (!val) {
        this.navigationTab = null
        this.reportingTab = 0
      }
    }
  },
  data: () => ({
    navigationTab: null,
    managementMenu: false,
    managementTab: 0,
    orderingMenu: false,
    orderingTab: 0,
    reportingMenu: false,
    reportingTab: 0,
    management_categories: [
      {
        key: 'common.fleet',
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
    ],
    ordering_categories: [
      {
        key: 'navigation.orders',
        icon: 'mdi-timeline-text',
        items: [
          { key: 'navigation.place_factory_orders', to: '/todo', icon: 'mdi-car-door' },
          { key: 'navigation.place_stock_orders', to: '/todo', icon: 'mdi-car-door-lock' },
          { key: 'navigation.view_order_requests', to: '/todo', icon: 'mdi-counter' }
        ]
      },
      {
        key: 'navigation.driver_orders',
        icon: 'mdi-cash-register',
        items: [
          { key: 'navigation.manage_driver_order_settings', to: '/todo', icon: 'mdi-account-settings' },
          { key: 'navigation.allow_drivers_to_order', to: '/todo', icon: 'mdi-shield-car' },
          { key: 'navigation.approve_driver_orders', to: '/todo', icon: 'mdi-check-decagram' }
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
    reporting_categories: [
      {
        key: 'common.fleet',
        icon: '',
        items: [
          { key: 'reporting.inventory', to: '/todo' },
          { key: 'reporting.order_status', to: '/todo' },
          { key: 'reporting.replacement_analysis', to: '/todo' },
          { key: 'reporting.sold_vehicle_analysis', to: '/todo' },
        ]
      },
      {
        key: 'reporting.expenses',
        icon: '',
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
        icon: '',
        items: [
          { key: 'reporting.invoice_history', to: '/todo' },
          { key: 'reporting.custom_invoicing', to: '/todo' }
        ]
      },
      {
        key: 'navigation.services',
        icon: '',
        items: [
          { key: 'reporting.evoucher', to: '/todo' },
          { key: 'reporting.license_renewal', to: '/todo' },
          { key: 'reporting.driver_360_mileage', to: '/todo' },
          { key: 'reporting.accident_claim', to: '/todo' }
        ]
      },
      {
        key: 'navigation.safety_and_telematics',
        icon: '',
        items: [
          { key: 'reporting.saferoads_fleet_summary', to: '/todo' },
          { key: 'reporting.saferoads_trip_detail', to: '/todo' },
          { key: 'reporting.engine_faults', to: '/todo' },
          { key: 'reporting.driver_safety', to: '/todo' },
          { key: 'reporting.driver_record', to: '/todo' }
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
    ]
  }),
  computed: {
    ...mapGetters('auth',['isAuthenticated']),
  }
}
</script>

<style>

</style>