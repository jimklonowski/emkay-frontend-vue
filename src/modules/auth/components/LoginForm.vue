<template>
  <v-card :loading="loading" :width="width" raised>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-card-title class="justify-center font-weight-thin display-2 ma-4" v-t="'auth.login'" />
      <!-- <v-alert v-if="errorMessage" type="error" dense tile text>{{ errorMessage }}</v-alert> -->
      <v-card-text class="my-4">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="model.account" v-bind="schema.account" tile />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="model.username" v-bind="schema.username" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="model.password" v-bind="schema.password" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-checkbox v-model="model.remember" v-bind="schema.remember" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="flex-column">
        <!-- <v-spacer /> -->
        <v-btn v-t="'auth.login'" :ripple="false" type="submit" color="primary lighten-2" large depressed block />
        <v-btn v-t="'auth.forgot_password'" :ripple="false" @click="toggleHelp" tabindex="-1" small text block />
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
      default: 0
    },
    width: {
      type: [String,Number],
      default: '500px'
    }
  },
  data: () => ({
    model: {
      account: '',
      username: '',
      password: '',
      remember: false
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
          outlined: false,
          dense: true,
          errorMessages: this.accountErrors(),
          prependIcon: 'mdi-bank',
          autocomplete: 'organization'
        },
        username: {
          label: this.$t('auth.username'),
          type: 'text',
          outlined: false,
          dense: true,
          errorMessages: this.usernameErrors(),
          prependIcon: 'mdi-account-tie',
          autocomplete: 'username'
        },
        password: {
          label: this.$t('auth.password'),
          type: 'password',
          outlined: false,
          dense: true,
          errorMessages: this.passwordErrors(),
          prependIcon: 'mdi-lock-question',
          autocomplete: 'current-password'
        },
        remember: {
          label: this.$t('auth.remember_me'),
          class: 'mt-0',
          dense: true
        }
      }
    }
  },
  methods: {
    translateError,
    toggleHelp() {
      this.$emit('update')
    },
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

      // separate the credentials from the 'remember' checkbox
      let { remember, ...credentials } = this.model
      
      if (remember) {
        console.log('remember me? '+remember)
        // not sure what to do with this, maybe use it to register the auto-refresh-login config
      }


      // try to login
      this.$store
        .dispatch('auth/login', credentials)
        .then(() => {
          //console.log('Login Success')
          //console.log(this.$store)
          this.$router.push({ name: 'home'}).catch(() => {})
        })
        .catch(error => {
          //console.log('Login Failure')
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
      password: { required },
      remember: {}
    }
  }
}
</script>

<style>
</style>