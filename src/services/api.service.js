import Vue from 'vue'
//import store from '../store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import MockService from './mock.service'
const API_URL = process.env.VUE_APP_ROOT_API

const ApiService = {
  init() {
    MockService.init()
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  // setHeader() {
  //   Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  // },

  get(resource, slug = '') {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[ApiService] GET ${error}`)
    })
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params)
  }

}

export default ApiService