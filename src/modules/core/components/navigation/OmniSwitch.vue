<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template #activator="{ on }">
      <v-btn text style="min-width:48px;" v-on="on">
        <v-icon size="24">language</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list v-if="isAuthenticated">
        <v-list-item>
          <v-list-item-avatar color="primary">
            <span class="white--text headline">JK</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ currentUser.username }}</v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.account }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action />
        </v-list-item>
      </v-list>
      
      <v-divider />
      
      <v-list>
        <v-list-item class="py-2">
          <v-list-item-action>
            <v-switch v-model="dark" color="primary" @change="changeTheme(dark)" />
          </v-list-item-action>
          <v-list-item-title v-t="'common.dark_mode'" />
        </v-list-item>

        <v-list-item class="py-2">
          <v-select v-model="locale" :items="languages" item-text="name" item-value="locale" :label="$t('common.language')" @input="changeLanguage(locale)" dense />
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn elevation="0" block @click.prevent="logout">
          <v-icon class="mr-4">exit_to_app</v-icon>
          {{ $t('auth.logout') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { languages } from '@/plugins/i18n'
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    menu: false,
    locale: null,
    dark: false,
    languages
  }),
  created() {
    this.dark = this.isDark
    this.locale = this.currentLocale
  },
  computed: {
    ...mapGetters('auth',['isAuthenticated','isDark','currentUser','currentLocale'])
  },
  methods: {
    ...mapActions('auth',['changeLanguage','changeTheme']),
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/login')
      })
    }
    
    // setDarkMode() {
    //   this.changeTheme(this.dark).then(() => { this.$vuetify.theme.dark = this.isDark })
    // }
  }
}
</script>

<style>

</style>