<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <login-form />
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from '../components/LoginForm'
export default {
  components: {
    LoginForm
  }
}
</script>

<style>

</style>