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
