import Vue from 'vue'
import Vuex from 'vuex'

// modules
import core from '../modules/core/store'
//import auth from '../modules/auth/store'

// persist state in cookies
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
const COOKIE_TIME = 1 / 24 // 1hour
const SECURE_COOKIE = process.env.NODE_ENV === 'production' ? true : false  // only use secure cookie when production on https

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    core,
//    auth
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value, {
            expires: COOKIE_TIME,
            secure: SECURE_COOKIE
          }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})

export default store
