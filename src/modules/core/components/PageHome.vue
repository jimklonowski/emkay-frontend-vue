<template>
  <div>
    <v-btn @click="showLogin">Login</v-btn>
  </div>
</template>

<script>
import LoginModal from './LoginModal'

export default {
  name: 'PageHome',
  methods: {
    showLogin() {
      this.$modal.show(LoginModal, { text: 'This text was passed as a property!' })
    }
  }
}
</script>

<style>

</style>