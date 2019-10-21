<template>
  <v-system-bar :class="this.$config.SYSTEM_BAR_CLASS" v-bind="{height}" dark app>
    <v-spacer />
    <omni-switch />
  </v-system-bar>
</template>

<script>
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
  }
}
</script>

<style>

</style>