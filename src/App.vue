<template>
  <v-app>
    <v-content>
      <router-view />
      <modals-container />
    </v-content>
  </v-app>
</template>

<script>
import ModalsContainer from 'vue-js-modal/src/ModalsContainer'

export default {
  name: 'App',
  components: {
    ModalsContainer
  }
}
</script>
