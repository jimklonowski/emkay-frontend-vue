<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template #activator="{ on }">
      <v-btn text style="min-width:48px;" v-on="on">
        <v-icon size="24">mdi-web</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list v-if="isAuthenticated">
        <v-list-item>
          <v-list-item-avatar color="primary">
            <span class="white--text headline">{{ initials }}</span>
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
            <v-switch v-model="darkMode" color="primary" />
          </v-list-item-action>
          <v-list-item-title v-t="'common.dark_mode'" />
        </v-list-item>

        <v-list-item class="py-2">
          <v-select v-model="language" :items="languages" item-text="name" item-value="locale" :label="$t('common.language')" dense />
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn v-if="isAuthenticated" elevation="0" block @click.prevent="logout">
          <v-icon class="mr-4">mdi-logout</v-icon>
          {{ $t('auth.logout') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { languages } from '@/plugins/i18n'
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    menu: false,
    languages
  }),
  computed: {
    ...mapGetters('auth',['isAuthenticated','currentUser','initials']),
    darkMode: {
      get() {
        return this.$store.getters['auth/isDark']
      },
      set(value) {
        this.setIsDark(value)
      }
    },
    language: {
      get() {
        return this.$store.getters['auth/currentLocale']
      },
      set(value) {
        this.setLocale(value)
      }
    }
  },
  methods: {
    ...mapActions('auth',['setIsDark', 'setLocale']),
    //...mapMutations('auth',['setIsDark','setLocale']),
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        //console.log(this.$store)
        this.$router.push({ name: 'home'}).catch(() => {})
      })
    }
  },
}
</script>

<style>

</style>