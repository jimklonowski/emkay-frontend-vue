<template>
  <v-app>
    <app-header />
    <v-content class="content-wrap">
      <router-view />
      <modals-container />
      <fab-scroll-top />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from '@/modules/core/components/navigation/AppFooter'
import AppHeader from '@/modules/core/components/navigation/AppHeader'
import FabScrollTop from '@/modules/core/components/navigation/FabScrollTop'
import ModalsContainer from 'vue-js-modal/src/ModalsContainer'

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    FabScrollTop,
    ModalsContainer
  }
}
</script>
<style lang="scss">
.content-wrap {
  min-height: 100vh;
}
.striped.v-data-table tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>