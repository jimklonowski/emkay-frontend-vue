import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


import coreRoutes from '@/modules/core/router'
import authRoutes from '@/modules/auth/router'
import vehicleRoutes from '@/modules/vehicle/router'

Vue.use(VueRouter)

const routes = coreRoutes.concat(
  authRoutes,
  vehicleRoutes
)

/**
 * @type {import('vue-router').RouterOptions}
 */
const options = {
  base: process.env.BASE_URL,
  mode: 'history',
  routes: routes,
  // Scroll to the top of each view upon routing.
  // setTimeout: Since there's a 300ms page transition on every route in App.vue, scrollTop AFTER this transition occurs (looks better)
  scrollBehavior() {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 300)
    )
  }
}

const router = new VueRouter(options)

// Global Router Navigation Guarg: role-based protection on each route
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.guest)) {
    if (to.matched.some(record => record.meta.onlyWhenLoggedOut)) {
      if (store.getters['auth/isAuthenticated']) {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    // this is an authenticated route, check auth status before proceeding
    if (store.getters['auth/isAuthenticated']) {
      // user is authenticated, pass route through
      next()
    } else {
      // user is not authenticated, redirect to /home to show login screen
      console.log('Not Authed -> redirect to home login')
      store.dispatch('auth/logout').then(() => next('/'))
    }
  }
})

export default router
