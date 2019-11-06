export default [
  // {
  //   path: '/vehicle',
  //   //alias: '/vehicle-search',
  //   name: 'vehicle-dashboard-wrapper',
  //   component: () => import(/* webpackChunkName: "vehicle-dashboard-search" */ '@/modules/vehicle/views/VehicleDashboardWrapper.vue'),
  //   meta: {
  //     breadcrumb: {
  //       path: { name: 'vehicle-dashboard' },
  //       key: 'vehicle_dashboard.vehicle_search'
  //     }
  //   },
  //   children: [
      {
        path: '/vehicle',
        //alias: '/vehicle-search',
        name: 'vehicle-dashboard-wrapper',
        component: () => import(/* webpackChunkName: "vehicle-dashboard-search" */ '@/modules/vehicle/views/VehicleDashboardWrapper.vue'),
        meta: {
          breadcrumb: {
            path: { name: 'vehicle-dashboard-wrapper' },
            key: 'vehicle_dashboard.vehicle_search'
          }
        }
      },
      {
        path: '/vehicle/:vehicle',
        name: 'vehicle-dashboard',
        redirect: { name: 'vehicle-dashboard-details' },
        component: () => import(/* webpackChunkName: "vehicle-dashboard" */ '@/modules/vehicle/views/Dashboard.vue'),
        meta: {
          breadcrumb: {
            key: 'vehicle_dashboard.dashboard',
            useParam: true,
            path: { name: 'vehicle-dashboard' }
          },
          toc: true
        },
        children: [
          {
            path: '/vehicle/:vehicle/details',
            alias: '/vehicle/:vehicle',
            name: 'vehicle-dashboard-details',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.vehicle_and_driver',
                path: { name: 'vehicle-dashboard-details' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/VehicleAndDriverDetails')
          },
          {
            path: '/vehicle/:vehicle/fuel',
            name: 'vehicle-dashboard-fuel',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.fuel_history',
                path: { name: 'vehicle-dashboard-fuel' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/FuelHistory')
          },
          {
            path: '/vehicle/:vehicle/maintenance',
            name: 'vehicle-dashboard-maintenance',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.maintenance_history',
                path: { name: 'vehicle-dashboard-maintenance' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/MaintenanceHistory')
          },
          {
            path: '/vehicle/:vehicle/invoice',
            name: 'vehicle-dashboard-invoice',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.invoice_history',
                path: { name: 'vehicle-dashboard-invoice' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/InvoiceHistory')
          },
          {
            path: '/vehicle/:vehicle/licensing',
            name: 'vehicle-dashboard-licensing',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.licensing_history',
                path: { name: 'vehicle-dashboard-licensing' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/LicensingHistory')
          },
          {
            path: '/vehicle/:vehicle/accident',
            name: 'vehicle-dashboard-accident',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.accident_history',
                path: { name: 'vehicle-dashboard-accident' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/AccidentHistory')
          },
          {
            path: '/vehicle/:vehicle/rentals',
            name: 'vehicle-dashboard-rentals',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.rental_history',
                path: { name: 'vehicle-dashboard-rentals' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/RentalHistory')
          },
          {
            path: '/vehicle/:vehicle/tolls',
            name: 'vehicle-dashboard-tolls',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.toll_history',
                path: { name: 'vehicle-dashboard-tolls' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/TollHistory')
          },
          {
            path: '/vehicle/:vehicle/violations',
            name: 'vehicle-dashboard-violations',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.violation_history',
                path: { name: 'vehicle-dashboard-violations' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/ViolationHistory')
          },
          {
            path: '/vehicle/:vehicle/odometers',
            name: 'vehicle-dashboard-odometers',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.odometer_history',
                path: { name: 'vehicle-dashboard-odometers' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/OdometerHistory')
          },
          {
            path: '/vehicle/:vehicle/drivers',
            name: 'vehicle-dashboard-drivers',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.driver_history',
                path: { name: 'vehicle-dashboard-drivers' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/DriverHistory')
          },
          {
            path: '/vehicle/:vehicle/notes',
            name: 'vehicle-dashboard-notes',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.vehicle_notes',
                path: { name: 'vehicle-dashboard-notes' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/VehicleNotes')
          },
          {
            path: '/vehicle/:vehicle/documents',
            name: 'vehicle-dashboard-documents',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.documents',
                path: { name: 'vehicle-dashboard-documents' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/Documents')
          },
          {
            path: '/vehicle/:vehicle/inspections',
            name: 'vehicle-dashboard-inspections',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.inspections',
                path: { name: 'vehicle-dashboard-inspections' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/Inspections')
          },
          {
            path: '/vehicle/:vehicle/saferoads',
            name: 'vehicle-dashboard-saferoads',
            meta: {
              breadcrumb: {
                key: 'vehicle_dashboard.saferoads',
                path: { name: 'vehicle-dashboard-saferoads' }
              },
              toc: true
            },
            component: () => import('@/modules/vehicle/views/Dashboard/Saferoads')
          },
          {
            path: '/vehicle/:vehicle/transports-and-storage/',
            name: 'transports-and-storage',
            redirect: { name: 'transtor-status' },
            component: () => import(/* webpackChunkName: "transtor" */ '@/modules/vehicle/views/Transtor/Transtor.vue'),
            meta: {
              breadcrumb: {
                key: 'transtor.transports_and_storage',
                path: { name: 'transports-and-storage' }
              },
              toc: true
            },
            children: [
              {
                path: '/vehicle/:vehicle/transports-and-storage/check-status',
                name: 'transtor-status',
                component: () => import('@/modules/vehicle/views/Transtor/CheckStatus.vue'),
                meta: {
                  breadcrumb: {
                    key: 'transtor.transport_status',
                    path: { name: 'transtor-status' }
                  },
                  toc: true
                }
              },
              {
                path: '/vehicle/:vehicle/transports-and-storage/request-quote',
                name: 'transtor-quote',
                component: () => import('@/modules/vehicle/views/Transtor/RequestQuote.vue'),
                meta: {
                  breadcrumb: {
                    key: 'transtor.request_quote',
                    path: { name: 'transtor-quote' }
                  },
                  toc: true
                }
              },
              {
                path: '/vehicle/:vehicle/transports-and-storage/create-order',
                name: 'transtor-order',
                component: () => import('@/modules/vehicle/views/Transtor/CreateOrder.vue'),
                props: true,
                meta: {
                  breadcrumb: {
                    key: 'vehicle_dashboard.create_order',
                    path: { name: 'transtor-order' }
                  },
                  toc: true
                }
              }
            ]
          }        
        ]
      }
    
  
]


// export default [
//   {
//     path: '/vehicle/:vehicle?',
//     name: 'vehicle-dashboard',
//     component: () => import(/* webpackChunkName: "vehicledashboard" */ '@/modules/vehicle/views/VehicleDashboardWrapper.vue'),
//     meta: {
//       breadcrumb: {
//         to: { name: 'vehicle-dashboard' },
//         key: 'vehicle_dashboard.vehicle_search'
//       }
//     },
//     children: [
//       {
//         path: '/vehicle/:vehicle/dashboard',
//         name: 'dashboard',
//         component: () => import(/* webpackChunkName: "dashboard" */ '@/modules/vehicle/views/Dashboard.vue'),
//         meta: {
//           breadcrumb: {
//             to: { name: 'vehicle-dashboard-details' }
//           }          
//         },
//         children: [
//           {
//             path: '',
//             name: 'dashboard-router',
//             //default child route, redirect to vehicle details
//             redirect: { name: 'vehicle-dashboard-details' }
//           },
//           {
//             path: '/vehicle/:vehicle/details',
//             name: 'vehicle-dashboard-details',
//             component: () => import(/* webpackChunkName: "vehicle-dashboard-details" */ '@/modules/vehicle/views/Dashboard/VehicleAndDriverDetails.vue'),
//             meta: {
//               breadcrumb: {
//                 to: { name: 'vehicle-dashboard-details'},
//                 key: 'vehicle_dashboard.vehicle_and_driver'
//               }
//             }
//           },
//           // {
//           //   path: '/vehicle/:vehicle/dashboard/vehicle',
//           //   name: 'vehicle-dashboard-vehicle',
//           //   component: () => import(/* webpackChunkName: "vehicle-dashboard-vehicle" */ '@/modules/vehicle/views/Dashboard/VehicleDetails.vue')
//           // },
//           // {
//           //   path: '/vehicle/:vehicle/dashboard/driver',
//           //   name: 'vehicle-dashboard-driver',
//           //   component: () => import(/* webpackChunkName: "vehicle-dashboard-driver" */ '@/modules/vehicle/views/Dashboard/DriverDetails.vue')
//           // },
//           {
//             path: '/vehicle/:vehicle/dashboard/fuel',
//             name: 'vehicle-dashboard-fuel',
//             component: () => import(/* webpackChunkName: "vehicle-dashboard-fuel" */ '@/modules/vehicle/views/Dashboard/FuelHistory.vue')
//           },
//           {
//             path: '/vehicle/:vehicle/dashboard/maintenance',
//             name: 'vehicle-dashboard-maintenance',
//             component: () => import(/* webpackChunkName: "vehicle-dashboard-maintenance" */ '@/modules/vehicle/views/Dashboard/MaintenanceHistory.vue')
//           },
//           {
//             path: '/vehicle/:vehicle/dashboard/invoice',
//             name: 'vehicle-dashboard-invoice',
//             component: () => import(/* webpackChunkName: "vehicle-dashboard-invoice" */ '@/modules/vehicle/views/Dashboard/InvoiceHistory.vue')
//           },
//           {
//             path: '/vehicle/:vehicle/dashboard/licensing',
//             name: 'vehicle-dashboard-licensing',
//             component: () => import(/* webpackChunkName: "vehicle-dashboard-licensing" */ '@/modules/vehicle/views/Dashboard/LicensingHistory.vue')
//           },
//           {
//             path: '/vehicle/:vehicle/dashboard/accident',
//             name: 'vehicle-dashboard-accident',
//             component: () => import(/* webpackChunkName: "vehicle-dashboard-accident" */ '@/modules/vehicle/views/Dashboard/AccidentHistory.vue')
//           },
//           {
//             path: '/vehicle/:vehicle/dashboard/rentals',
//             name: 'vehicle-dashboard-rentals',
//             component: () => import(/* webpackChunkName: "vehicle-dashboard-rentals" */ '@/modules/vehicle/views/Dashboard/RentalHistory.vue')
//           },
//           {
//             path: '/vehicle/:vehicle/dashboard/tolls',
//             name: 'vehicle-dashboard-tolls',
//             component: () => import(/* webpackChunkName: "vehicle-dashboard-tolls" */ '@/modules/vehicle/views/Dashboard/TollHistory.vue')
//           },
//           {
//             path: '/vehicle/:vehicle/dashboard/violations',
//             name: 'vehicle-dashboard-violations',
//             component: () => import(/* webpackChunkName: "vehicle-dashboard-violations" */ '@/modules/vehicle/views/Dashboard/ViolationHistory.vue')
//           },
//           {
//             path: '/vehicle/:vehicle/dashboard/odometers',
//             name: 'vehicle-dashboard-odometers',
//             component: () => import(/* webpackChunkName: "vehicle-dashboard-odometers" */ '@/modules/vehicle/views/Dashboard/OdometerHistory.vue')
//           },
//           {
//             path: '/vehicle/:vehicle/dashboard/drivers',
//             name: 'vehicle-dashboard-drivers',
//             component: () => import(/* webpackChunkName: "vehicle-dashboard-drivers" */ '@/modules/vehicle/views/Dashboard/DriverHistory.vue')
//           },
//           {
//             path: '/vehicle/:vehicle/dashboard/notes',
//             name: 'vehicle-dashboard-notes',
//             component: () => import(/* webpackChunkName: "vehicle-dashboard-notes" */ '@/modules/vehicle/views/Dashboard/VehicleNotes.vue')
//           }
//         ]
//       },
//       {
//         path: '/vehicle/:vehicle/documents',
//         name: 'documents',
//         component: () => import(/* webpackChunkName: "documents" */ '@/modules/vehicle/views/Documents.vue')
//       },
//       {
//         path: '/vehicle/:vehicle/inspections',
//         name: 'inspections',
//         component: () => import(/* webpackChunkName: "inspections" */ '@/modules/vehicle/views/Inspections.vue')
//       },
//       {
//         path: '/vehicle/:vehicle/saferoads',
//         name: 'saferoads',
//         component: () => import(/* webpackChunkName: "saferoads" */ '@/modules/vehicle/views/Saferoads.vue')
//       },
//       {
//         path: '/vehicle/:vehicle/transports-and-storage/',
//         name: 'transports-and-storage',
//         component: () => import(/* webpackChunkName: "transtor" */ '@/modules/vehicle/views/Transtor/Transtor.vue'),
//         children: [
//           {
//             path: '/vehicle/:vehicle/transports-and-storage/check-status',
//             name: 'transtor-status',
//             component: () => import('@/modules/vehicle/views/Transtor/CheckStatus.vue')
//           },
//           {
//             path: '/vehicle/:vehicle/transports-and-storage/request-quote',
//             name: 'transtor-quote',
//             component: () => import('@/modules/vehicle/views/Transtor/RequestQuote.vue')
//           },
//           {
//             path: '/vehicle/:vehicle/transports-and-storage/create-order',
//             name: 'transtor-order',
//             component: () => import('@/modules/vehicle/views/Transtor/CreateOrder.vue'),
//             props: true
//           }
//         ]
//       }
//     ]
//   }
// ]