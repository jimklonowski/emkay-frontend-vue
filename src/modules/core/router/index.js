export default [
  {
    path: '/home',
    name: 'home',
    alias: '/',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      guest: true
    }
  }
]