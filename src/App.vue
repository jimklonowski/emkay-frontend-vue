<template>
  <v-app>
    <app-navigation />
    <v-content>
      <router-view />
      <modals-container />
      <fab-scroll-top />
    </v-content>
  </v-app>
</template>

<script>
import AppNavigation from '@/modules/core/components/navigation/AppNavigation'
import FabScrollTop from './modules/core/components/navigation/FabScrollTop'
import ModalsContainer from 'vue-js-modal/src/ModalsContainer'

export default {
  name: 'App',
  components: {
    AppNavigation,
    FabScrollTop,
    ModalsContainer
  }
}
</script>
<style lang="scss">
.striped.v-data-table tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>