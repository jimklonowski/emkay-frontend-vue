export default [
  {
    path: '/vehicle/:vehicle?',
    name: 'vehicle-dashboard',
    component: () => import(/* webpackChunkName: "vehicledashboard" */ '@/modules/vehicle/views/VehicleDashboardWrapper.vue'),
    children: [
      {
        path: '/vehicle/:vehicle/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "vehicledashboard" */ '@/modules/vehicle/views/Dashboard.vue')
      }
    ]
  }
]