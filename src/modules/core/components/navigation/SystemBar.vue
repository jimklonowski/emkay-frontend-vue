<template>
  <v-system-bar :class="this.$config.SYSTEM_BAR_CLASS" style="z-index:5;" v-bind="{height}" dark app>
    <template v-if="isAuthenticated">
      <template v-for="(button, key) in buttons">
        <v-btn
          :key="key"
          :to="button.to"
          small
          text
          tile
        >
          <v-icon v-text="button.icon" />
          <span class="system-bar-text">
            {{ $tc(button.key, button.count) }}
          </span>
        </v-btn>
      </template>
    </template>
    <v-spacer />
    <omni-switch />
  </v-system-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import OmniSwitch from '@/modules/core/components/navigation/OmniSwitch'
export default {
  components: {
    OmniSwitch
  },
  props: {
    height: {
      type: [Number,String],
      default: 36
    }
  },
  computed: {
    ...mapGetters('auth',['isAuthenticated']),
  },
  data: () => ({
    buttons: [
      {
        text: 'Unread Messages',
        key: 'notifications.unread_messages',
        to: { name: 'notifications' },
        icon: 'mail',
        count: 10
      },
      {
        text: 'Critical Alerts',
        key: 'notifications.critical_alerts',
        to: { name: 'notifications' },
        icon: 'notifications',
        count: 3
      },
      {
        text: 'Driver Order Approvals',
        key: 'notifications.driver_order_approvals',
        to: { name: 'notifications' },
        icon: 'drive_eta',
        count: 0
      },
      {
        text: 'Maintenance Approvals',
        key: 'notifications.maintenance_approvals',
        to: { name: 'notifications' },
        icon: 'report',
        count: 1
      },
      {
        text: 'Fleet Navigator',
        key: 'navigation.fleet_navigator',
        to: { name: 'notifications' },
        icon: 'widgets'
      }
    ]
  })
}
</script>

<style>
.system-bar-text {
  font-family: 'Roboto Condensed', sans-serif;
}
</style>