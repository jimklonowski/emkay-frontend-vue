<template>
  <v-btn @click="showLoginForm">Login</v-btn>
</template>

<script>
import LoginModal from '../components/LoginModal'
export default {
  name: 'Public',
  methods: {
    showLoginForm() {
      let loginProps = { width: 1000, elevation: 6, text: 'This is passed as dynamic text!' }
      let modalProps = { width: 1000, height: 'auto' }
      this.$modal.show(LoginModal, loginProps, modalProps)
    }
  }
}
</script>

<style>

</style>