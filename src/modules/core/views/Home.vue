<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-alert v-if="isAuthenticated" type="success">User is authenticated! ({{ currentUser.username }})</v-alert>
      <template v-else>
        <login-form v-if="!needsHelp" @update="toggleHelp" />
        <login-help-form v-else @update="toggleHelp" />
      </template>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex'
import LoginForm from '@/modules/auth/components/LoginForm'
import LoginHelpForm from '@/modules/auth/components/LoginHelpForm'

export default {
  name: 'Home',
  components: {
    LoginForm,
    LoginHelpForm
  },
  data: () => ({
    needsHelp: false
  }),
  computed: {
    ...mapGetters('auth',['isAuthenticated','currentUser'])
  },
  methods: {
    toggleHelp() {
      this.needsHelp = !this.needsHelp
    },
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