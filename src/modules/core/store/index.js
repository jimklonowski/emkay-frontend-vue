import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const mutations = {
  showModal(state, component) {
    debugger
    state.modalVisible = true
    state.modalComponent = component
  },
  hideModal(state) {
    debugger
    state.modalVisible = false
  }
}

export const state = {
  modalVisible: false,
  modalComponent: null
}

export default {
  namespaced: true,
  mutations,
  state
}