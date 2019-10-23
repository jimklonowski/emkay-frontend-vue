import Vue from 'vue'
import Vuex from 'vuex'
//import {app} from '@/main'
//import vuetify from '@/plugins/vuetify'

//import { loadLanguageAsync } from '@/plugins/i18n'

import ApiService from '@/services/api.service'
import TokenService from '@/services/token.service'

Vue.use(Vuex)

export const mutations = {
  setLocale(state, locale) {
    state.locale = locale
    this.$app.$i18n.locale = locale
    this.$app.$vuetify.lang.current = 'en'
  },
  setDark(state, isDark) {
    state.isDark = isDark
    this.$app.$vuetify.theme.dark = isDark
  },
  setError(state, error) {
    state.errors = error
  },
  setAuth(state, payload) {
    state.user = payload.user
    state.isAuthenticated = true
    state.isAdmin = payload.isAdmin
    state.errors = {}
    TokenService.saveAccessToken(payload.access_token)
    TokenService.saveRefreshToken(payload.refresh_token)
  },
  removeAuth(state) {
    state.user = {}
    state.isAuthenticated = false
    state.isAdmin = false
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
      context.commit('setLocale', response.data.locale)
      context.commit('setDark', response.data.isDark)
    } else {
      context.commit('setError')
    }
  },
  logout(context) {
    context.commit('removeAuth')
  },
  changeLanguage(context, locale) {
    debugger
    context.commit('setLocale', locale)
    // return new Promise(resolve => {
    //   context.commit('setLocale', locale)
    //   loadLanguageAsync(locale)
    //   resolve()
    // })
    //debugger
    //console.log(`Language Set: ${locale}`)
  },
  changeTheme(context, isDark) {
    context.commit('setDark', isDark)
    console.log(`Dark Mode: ${isDark ? 'enabled' : 'disabled'}`)
  }
}

export const state = {
  isAuthenticated: false,
  isDark: false,
  locale: null,
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