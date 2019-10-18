import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import i18n from './i18n'

//https://github.com/euvl/vue-js-modal
import VModal from 'vue-js-modal'
Vue.use(VModal, {
  dialog: true,
  dynamic: true,
  //injectModalsContainer: true,
  dynamicDefaults: {
    resizable: true,
    scrollable: true,
    adaptive: true
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
