export default [
  {
    path: '/vehicle/:vehicle?',
    name: 'vehicle-dashboard',
    component: () => import(/* webpackChunkName: "vehicledashboard" */ '@/modules/vehicle/views/VehicleDashboardWrapper.vue'),
    children: [
      {
        path: '/vehicle/:vehicle/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/modules/vehicle/views/Dashboard.vue')
      },
      {
        path: '/vehicle/:vehicle/documents',
        name: 'documents',
        component: () => import(/* webpackChunkName: "documents" */ '@/modules/vehicle/views/Documents.vue')
      },
      {
        path: '/vehicle/:vehicle/inspections',
        name: 'inspections',
        component: () => import(/* webpackChunkName: "inspections" */ '@/modules/vehicle/views/Inspections.vue')
      },
      {
        path: '/vehicle/:vehicle/saferoads',
        name: 'saferoads',
        component: () => import(/* webpackChunkName: "saferoads" */ '@/modules/vehicle/views/Saferoads.vue')
      },
      {
        path: '/vehicle/:vehicle/transport-storage',
        name: 'transport-storage',
        component: () => import(/* webpackChunkName: "transport-storage" */ '@/modules/vehicle/views/TransportStorage.vue')
      }
    ]
  }
]