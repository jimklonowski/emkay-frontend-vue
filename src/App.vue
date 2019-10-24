<template>
  <v-app>
    <app-navigation />
    <v-content>
      <router-view />
      <modals-container />
    </v-content>
  </v-app>
</template>

<script>
import AppNavigation from '@/modules/core/components/navigation/AppNavigation'
import ModalsContainer from 'vue-js-modal/src/ModalsContainer'

export default {
  name: 'App',
  components: {
    AppNavigation,
    ModalsContainer
  }
}
</script>
<style lang="scss">
.v-data-table tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>