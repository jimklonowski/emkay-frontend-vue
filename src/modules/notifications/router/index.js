export default [
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import(/* webpackChunkName: "notifications" */ '../views/Notifications.vue')
  }
]