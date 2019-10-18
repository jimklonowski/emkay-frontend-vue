<template>
  <v-btn @click="showLoginForm">Login</v-btn>
</template>

<script>
//import LoginModal from '../components/LoginModal'
//const LoginModal = () => import(`@/modules/core/components/LoginModal`).default
//const LoginModal = import(`@/modules/core/components/LoginModal`)
export default {
  name: 'Public',
  methods: {
    async showLoginForm() {
      let loginProps = { width: 1000, elevation: 6, text: 'This is passed as dynamic text!' }
      let modalProps = { width: 1000, height: 'auto' }

      const form = await import(/* webpackChunkName: 'loginModal' */ '../components/LoginModal')
      
      this.$modal.show(form.default, loginProps, modalProps)
    }
  }
}
</script>

<style>

</style>