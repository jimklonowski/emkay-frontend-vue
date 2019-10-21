import Vue from 'vue'
import Vuex from 'vuex'
import vuetify from '@/plugins/vuetify'

import { loadLanguageAsync } from '@/plugins/i18n'

import ApiService from '@/services/api.service'
import TokenService from '@/services/token.service'

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
    debugger
    state.isAuthenticated = true
    state.isAdmin = payload.isAdmin
    state.isDark = payload.isDark
    state.locale = payload.locale
    state.user = payload.user
    state.errors = {}
    TokenService.saveAccessToken(payload.access_token)
    TokenService.saveRefreshToken(payload.refresh_token)
  },
  removeAuth(state) {
    state.isAuthenticated = false
    state.isAdmin = false
    state.isDark = false
    state.locale = 'en'
    state.user = {}
    state.errors = {}
    TokenService.destroyAccessToken()
  }
}

export const actions = {
  async login(context, credentials) {
    console.log('login action')
    //let response = await Vue.axios.post('/auth/login', { user: credentials })
    let response = await ApiService.post('/auth/login', { user: credentials })
    if (response) {
      context.commit('setAuth', response.data)
    } else {
      context.commit('setError')
    }
  },
  logout(context) {
    context.commit('removeAuth')
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