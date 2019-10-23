import { set } from '@/util/vuex'
import { loadLanguageAsync } from '@/plugins/i18n'
import ApiService from '../../services/api.service'

export default {
  namespaced: true,

  mutations: {
    setUser: set('user'),
    setIsAdmin: set('isAdmin'),
    setIsAuthenticated: set('isAuthenticated'),
    setIsDark: set('isDark'),
    setLocale: set('locale'),
    //toggleIsDark: toggle('isDark'),
  },

  actions: {
    async login({ dispatch, commit }, credentials) {
      console.log('login action')
      const { data } = await ApiService.post('/auth/login', { user: credentials })
      commit('setUser', data.user)
      commit('setIsAuthenticated', true)
      commit('setIsAdmin', data.isAdmin)
      // dispatch separate async action because the locale might need to be loaded from json.
      dispatch('setLocale', data.locale)
      dispatch('setIsDark', data.isDark)
    },
    logout({ dispatch, commit }) {
      console.log('logout action')
      commit('setUser', { account: '', username: '', firstname: '', lastname: '' })
      commit('setIsAuthenticated', false)
      commit('setIsAdmin', false)
      //commit('setLocale', 'en')
      dispatch('setLocale', 'en')
      //commit('setIsDark', false)
      dispatch('setIsDark', false)
    },
    async setLocale({ commit }, locale) {
      // Load language from json, update state, then set $i18n.locale and $vuetify.lang.current
      let lang = await loadLanguageAsync(locale)
      commit('setLocale', lang)
      this.$app.$i18n.locale = lang
      this.$app.$vuetify.lang.current = lang
    },
    setIsDark({ commit }, isDark) {
      // update state then update vuetify object
      commit('setIsDark', isDark)
      this.$app.$vuetify.theme.dark = isDark
    }
  },

  getters: {
    initials: state => [state.user.firstname,state.user.lastname].map(n => n[0]).join(''),
    currentUser: state => state.user,
    currentLocale: state => state.locale,
    isAdmin: state => state.isAdmin,
    isAuthenticated: state => state.isAuthenticated,
    isDark: state => state.isDark
  },

  state: {
    user: { 
      account: '',
      username: '',
      firstname: '',
      lastname: '',
    },
    isAdmin: false,
    isAuthenticated: false,
    isDark: false,
    locale: 'en',
    errors: {}
  }
}