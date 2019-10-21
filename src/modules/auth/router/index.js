export default [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      guest: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/login-help',
    name: 'login-help',
    component: () => import(/* webpackChunkName: 'login-help' */ '../views/LoginHelp.vue'),
    meta: {
      guest: true,
      onlyWhenLoggedOut: true
    }
  }
]