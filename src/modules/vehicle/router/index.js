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
        path: '/vehicle/:vehicle/transtor/',
        name: 'transtor',
        component: () => import(/* webpackChunkName: "transtor" */ '@/modules/vehicle/views/Transtor/Transtor.vue'),
        children: [
          {
            path: '/vehicle/:vehicle/transtor/status',
            name: 'transtor-status',
            component: () => import('@/modules/vehicle/views/Transtor/Status.vue')
          },
          {
            path: '/vehicle/:vehicle/transtor/quote',
            name: 'transtor-quote',
            component: () => import('@/modules/vehicle/views/Transtor/RequestQuote.vue')
          },
          {
            path: '/vehicle/:vehicle/transtor/new',
            name: 'transtor-order',
            component: () => import('@/modules/vehicle/views/Transtor/CreateOrder.vue')
          }
        ]
      }
    ]
  }
]