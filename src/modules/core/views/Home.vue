<template>
  <v-container>
    <v-row v-if="isAuthenticated">
      <v-col cols="12">User is authenticated! ({{ currentUser.username }})</v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters('auth',['isAuthenticated','currentUser'])
  },
  methods: {
    async showLoginForm() {
      let componentProps = { width: 1000, elevation: 6, text: 'This is passed as dynamic text!' }
      let modalProps = { width: 1000, height: 'auto' }

      const form = await import(/* webpackChunkName: 'loginForm' */ '@/modules/auth/components/LoginForm')
      this.$modal.show(form.default, componentProps, modalProps)
    },
    async showLoginHelpForm() {
      let componentProps = { width: 1000, elevation: 6, text: 'This is passed as dyna text!' }
      let modalProps = { width: 1000, height: 'auto' }

      const form = await import(/* webpackChunkName: 'loginHelpForm' */ '@/modules/auth/components/LoginHelpForm')
      this.$modal.show(form.default, componentProps, modalProps)
    }
  }
}
</script>

<style>

</style>