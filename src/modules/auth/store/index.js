import Vue from 'vue'
import Vuex from 'vuex'
import vuetify from '@/plugins/vuetify'

import { loadLanguageAsync } from '@/plugins/i18n'

Vue.use(Vuex)

export const mutations = {
  setLocale(state, locale) {
    state.locale = locale
  },
  setDark(state, isDark) {
    state.isDark = isDark
    vuetify.framework.theme.dark = isDark
  },
  setError(state, error) {
    state.errors = error
  },
  setAuth(state, payload) {
    state.isAuthenticated = true
    state.user = payload.user
    state.errors = {}
  },
  removeAuth(state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
  }
}

export const actions = {
  async login(context, credentials) {
    console.log('login action')
    let response = await Vue.axios.post('/auth/login', { user: credentials })
    if (response) {
      context.commit('setAuth', response.data.user)
    } else {
      context.commit('setError')
    }
  },
  async changeLanguage(context, locale) {
    await loadLanguageAsync(locale)
    context.commit('setLocale', locale)
    console.log(`Language Set: ${locale}`)
  },
  changeTheme(context, isDark) {
    
    context.commit('setDark', isDark)
    console.log(`Dark Mode: ${isDark ? 'enabled' : 'disabled'}`)
  }
}

export const state = {
  isAuthenticated: false,
  isDark: false,
  locale: 'en',
  user: {},
  errors: {}
}

export const getters = {
  currentUser: state => state.user,
  currentLocale: state => state.locale,
  isAuthenticated: state => state.isAuthenticated,
  isDark: state => state.isDark
}

export default {
  namespaced: true,
  mutations,
  actions,
  state,
  getters
}