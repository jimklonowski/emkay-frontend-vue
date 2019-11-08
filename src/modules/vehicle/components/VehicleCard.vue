<template>
  <v-expansion-panels v-model="panel" accordian>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <v-list dense nav>
          <v-list-item two-line>
            <v-list-item-avatar color="secondary lighten-2" :size="50">
              <v-icon color="white">mdi-car</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">{{ $route.params.vehicle }}</v-list-item-title>
              <v-list-item-subtitle class="caption">2012 Jeep Compass</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expansion-panel-header>
      <v-divider />
      <v-expansion-panel-content>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Client Vehicle Number</v-list-item-title>
              <v-list-item-subtitle>CVN123456</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-menu bottom right>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" :ripple="false">
                    <v-icon>mdi-settings</v-icon>
                  </v-btn>
                </template>
                <v-list dense>
                  <template v-for="(item, name, key) in vehicle_actions">
                    <v-list-item :key="key" :color="item.color" @click="item.callback">
                      <v-list-item-icon>
                        <v-icon v-text="item.icon" />
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-t="item.key" />
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Center</v-list-item-title>
              <v-list-item-subtitle>001 - Executive</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>VIN</v-list-item-title>
              <v-list-item-subtitle>MYVIN1234567890</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Billing Sort</v-list-item-title>
              <v-list-item-subtitle>n/a</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <!-- <v-list dense nav>
    <v-list-item two-line>
      <v-list-item-avatar>
        <v-icon>mdi-car</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">{{ $route.params.vehicle }}</v-list-item-title>
        <v-list-item-subtitle class="caption">2012 Jeep Compass</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" :ripple="false">
              <v-icon>mdi-settings</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <template v-for="(item, name, key) in vehicle_actions">
              <v-list-item :key="key" :color="item.color" @click="item.callback">
                <v-list-item-icon>
                  <v-icon v-text="item.icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-t="item.key" />
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Client Vehicle Number</v-list-item-title>
        <v-list-item-subtitle>CVN123456</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Center</v-list-item-title>
        <v-list-item-subtitle>001 - Executive</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>VIN</v-list-item-title>
        <v-list-item-subtitle>MYVIN1234567890</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Billing Sort</v-list-item-title>
        <v-list-item-subtitle>n/a</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list> -->
</template>
<script>
import { 
  editCustomLabels, 
  editVehicle, 
  reportExpenses, 
  scheduleAC, 
  showOrderStatus ,
  terminateVehicle,
  usedVehicleQuote
} from '@/modules/vehicle/components/modals/'
export default {
  name: 'VehicleCard',
  methods: {
  },
  data: () => ({
    panel: 0,
    vehicle_actions: [
      {
        key: 'vehicle_dashboard.edit_vehicle',
        icon: 'mdi-file-edit',
        callback: () => editVehicle()
      },
      {
        key: 'vehicle_dashboard.order_status',
        icon: 'mdi-timeline-text',
        callback: () => showOrderStatus()
      },
      {
        key: 'vehicle_dashboard.edit_custom_labels',
        icon: 'mdi-label',
        callback: () => editCustomLabels()
      },
      {
        key: 'vehicle_dashboard.schedule_ac',
        icon: 'mdi-calendar-clock',
        callback: () => scheduleAC()
      },
      {
        key: 'vehicle_dashboard.report_expenses',
        icon: 'mdi-cash-register',
        callback: () => reportExpenses()
      },
      {
        key: 'vehicle_dashboard.used_vehicle_quote',
        icon: 'mdi-bus-clock',
        callback: () => usedVehicleQuote()
      },
      {
        key: 'vehicle_dashboard.terminate_vehicle',
        icon: 'mdi-briefcase-remove',
        callback: () => terminateVehicle()
      }
    ]
  })
}
</script>