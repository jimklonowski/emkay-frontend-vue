<template>
  <v-card :elevation="elevation" :width="width" raised>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-card-title :class="$config.LOGIN_BAR_CLASS" v-t="'auth.login'" />
      <v-alert v-if="errorMessage" type="error" dense tile>{{ errorMessage }}</v-alert>
      <v-card-text class="pa-4">      
        <v-text-field v-model="model.account" v-bind="schema.account" />
        <v-text-field v-model="model.username" v-bind="schema.username" />
        <v-text-field v-model="model.password" v-bind="schema.password" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn v-t="'auth.forgot_password'" to="/login-help" tabindex="-1" text />
        <v-btn v-t="'auth.login'" type="submit" color="primary" class="mr-4" text />
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { translateError } from '@/util/helpers'
import { required } from 'vuelidate/lib/validators'

export default {
  props: {
    elevation: {
      type: Number,
      default: 4
    },
    width: {
      type: [String,Number],
      default: '600px'
    },
    text: {
      type: String,
      default: 'EM102 JCK 123'
    }
  },
  data: () => ({
    model: {
      account: '',
      username: '',
      password: ''
    },
    errorMessage: null,
    loading: false
  }),
  computed: {
    schema() {
      return {
        account: {
          label: this.$t('auth.account'),
          type: 'text',
          errorMessages: this.accountErrors(),
          appendIcon: 'account_balance',
          autocomplete: 'organization'
        },
        username: {
          label: this.$t('auth.username'),
          type: 'text',
          errorMessages: this.usernameErrors(),
          appendIcon: 'person',
          autocomplete: 'username'
        },
        password: {
          label: this.$t('auth.password'),
          type: 'password',
          errorMessages: this.passwordErrors(),
          appendIcon: 'lock',
          autocomplete: 'current-password'
        }
      }
    }
  },
  methods: {
    translateError,
    accountErrors() {
      const errors = []
      if (!this.$v.model.account.$dirty) return errors
      !this.$v.model.account.required && errors.push(this.translateError('validation.required', 'auth.account'))
      return errors
    },
    usernameErrors() {
      const errors = []
      if (!this.$v.model.username.$dirty) return errors
      !this.$v.model.username.required && errors.push(this.translateError('validation.required', 'auth.username'))
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.model.password.$dirty) return errors
      !this.$v.model.password.required && errors.push(this.translateError('validation.required', 'auth.password'))
      return errors
    },
    onSubmit() {
      this.errorMessage = null
      this.loading = true

      // trigger validation
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = 'Fix validation errors.'
        this.loading = false
        return false
      }

      // try to login
      this.$store
        .dispatch('auth/login', this.model)
        .then(() => {
          console.log('Login Success')
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log('Login Failure')
          this.errorMessage = error.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  validations: {
    model: {
      account: { required },
      username: { required },
      password: { required }
    }
  }
}
</script>

<style>
</style>