import store from '@/store'

export const editCustomLabels = async () => {
  const form = await import(/* webpackChunkName: 'customLabels' */ '@/modules/vehicle/components/modals/EditCustomLabels')
  store.$app.$modal.show(form.default, { width: 1000, elevation: 6 }, { width: 1000, height: 'auto', delay: 0, draggable: true, clickToClose: true })
}

export const editDriver = async () => {
  const form = await import(/* webpackChunkName: 'editDriver' */ '@/modules/vehicle/components/modals/EditDriver')
  store.$app.$modal.show(form.default, { width: 1000, elevation: 6 }, { width: 1000, height: 'auto', delay: 0, draggable: true, clickToClose: true })
}

export const editVehicle = async () => {
  const form = await import(/* webpackChunkName: 'editVehicle' */ '@/modules/vehicle/components/modals/EditVehicle')
  store.$app.$modal.show(form.default, { width: 1000, elevation: 6 }, { width: 1000, height: 'auto', delay: 0, draggable: true, clickToClose: true })
}

export const reportExpenses = async () => {
  const form = await import(/* webpackChunkName: 'reportExpenses' */ '@/modules/vehicle/components/modals/ReportExpenses')
  store.$app.$modal.show(form.default, { width: 1000, elevation: 6 }, { width: 1000, height: 'auto', delay: 0, draggable: true, clickToClose: true })
}

export const scheduleAC = async () => {
  const form = await import(/* webpackChunkName: 'scheduleAC' */ '@/modules/vehicle/components/modals/ScheduleAC')
  store.$app.$modal.show(form.default, { width: 1000, elevation: 6 }, { width: 1000, height: 'auto', delay: 0, draggable: true, clickToClose: true })
}

export const showOrderStatus = async () => {
  const form = await import(/* webpackChunkName: 'orderStatus' */ '@/modules/vehicle/components/modals/OrderStatus')
  store.$app.$modal.show(form.default, { width: 1000, elevation: 6 }, { width: 1000, height: 'auto', delay: 0, draggable: true, clickToClose: true })
}

export const terminateVehicle = async () => {
  const form = await import(/* webpackChunkName: 'terminateVehicle' */ '@/modules/vehicle/components/modals/TerminateVehicle')
  store.$app.$modal.show(form.default, { width: 1000, elevation: 6 }, { width: 1000, height: 'auto', delay: 0, draggable: true, clickToClose: true })
}

export const usedVehicleQuote = async () => {
  const form = await import(/* webpackChunkName: 'usedVehicleQuote' */ '@/modules/vehicle/components/modals/UsedVehicleQuote')
  store.$app.$modal.show(form.default, { width: 1000, elevation: 6 }, { width: 1000, height: 'auto', delay: 0, draggable: true, clickToClose: true })
}
