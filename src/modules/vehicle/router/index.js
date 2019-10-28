export default [
  {
    path: '/vehicle/:vehicle?',
    name: 'vehicle-dashboard',
    component: () => import(/* webpackChunkName: "vehicledashboard" */ '@/modules/vehicle/views/VehicleDashboardWrapper.vue'),
    children: [
      {
        path: '/vehicle/:vehicle/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/modules/vehicle/views/Dashboard.vue'),
        meta: {
          toc: true
        }
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
        path: '/vehicle/:vehicle/transports-and-storage/',
        name: 'transports-and-storage',
        component: () => import(/* webpackChunkName: "transtor" */ '@/modules/vehicle/views/Transtor/Transtor.vue'),
        children: [
          {
            path: '/vehicle/:vehicle/transports-and-storage/check-status',
            name: 'transtor-status',
            component: () => import('@/modules/vehicle/views/Transtor/CheckStatus.vue')
          },
          {
            path: '/vehicle/:vehicle/transports-and-storage/request-quote',
            name: 'transtor-quote',
            component: () => import('@/modules/vehicle/views/Transtor/RequestQuote.vue')
          },
          {
            path: '/vehicle/:vehicle/transports-and-storage/create-order',
            name: 'transtor-order',
            component: () => import('@/modules/vehicle/views/Transtor/CreateOrder.vue'),
            props: true
          }
        ]
      }
    ]
  }
]