<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-alert v-if="isAuthenticated" type="warning" min-width="500" outlined prominent border="left">
        <h3 class="headling">User is authenticated!</h3>
        <v-divider class="my-4 warning" style="opacity:0.22;" />
        <div><strong>Account</strong>: {{ currentUser.account }}</div>
        <div><strong>Username</strong>: {{ currentUser.username }}</div>
        <div><strong>Admin</strong>: {{ isAdmin }}</div>
        <div><strong>Language</strong>: {{ currentLocale }}</div>
        <div><strong>Dark</strong>: {{ isDark }}</div>
      </v-alert>
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
    ...mapGetters('auth',['isAuthenticated','currentUser','currentLocale','isAdmin','isDark'])
  },
  methods: {
    toggleHelp() {
      this.needsHelp = !this.needsHelp
    }
  }
}
</script>

<style>

</style>