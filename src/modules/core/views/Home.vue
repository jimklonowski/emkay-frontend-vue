<template>
  <v-container class="road-hero" fluid fill-height>
    <v-img :src="require('@/assets/logodark.png')" height="50" contain style="position:absolute;top:50px;left:0;right:0;opacity:0.2;" />
    <v-row v-if="isAuthenticated" justify="center">
      <v-alert type="warning" min-width="800" prominent border="left">
        <h3 class="headling">User is authenticated!</h3>
        <v-divider class="my-4" />
        <v-row>
          <v-col><strong>Account</strong>: {{ currentUser.account }}</v-col>
          <v-col><strong>Username</strong>: {{ currentUser.username }}</v-col>
          <v-col><strong>Admin</strong>: {{ isAdmin }}</v-col>
          <v-col><strong>Language</strong>: {{ currentLocale }}</v-col>
          <v-col><strong>Dark</strong>: {{ isDark }}</v-col>
        </v-row>
      </v-alert>
    </v-row>
    <v-row v-else justify="center">
      <login-form v-if="!needsHelp" @update="toggleHelp" />
      <login-help-form v-else @update="toggleHelp" />
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
.road-hero::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/road.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  opacity: 0.5;
}
</style>