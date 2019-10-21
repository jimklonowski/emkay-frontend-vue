<template>
  <v-container>
    <v-row v-if="!isAuthenticated">
      <v-btn @click="showLoginHelpForm" v-t="'auth.forgot_password'" />
      <v-btn @click="showLoginForm" v-t="'auth.login'" />
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Public',
  computed: {
    ...mapGetters('auth',['isAuthenticated'])
  },
  methods: {
    async showLoginForm() {
      let componentProps = { width: 1000, elevation: 6, text: 'This is passed as dynamic text!' }
      let modalProps = { width: 1000, height: 'auto' }

      const form = await import(/* webpackChunkName: 'loginForm' */ '../components/LoginForm')
      this.$modal.show(form.default, componentProps, modalProps)
    },
    async showLoginHelpForm() {
      let componentProps = { width: 1000, elevation: 6, text: 'This is passed as dyna text!' }
      let modalProps = { width: 1000, height: 'auto' }

      const form = await import(/* webpackChunkName: 'loginHelpForm' */ '../components/LoginHelpForm')
      this.$modal.show(form.default, componentProps, modalProps)
    }
  }
}
</script>

<style>

</style>