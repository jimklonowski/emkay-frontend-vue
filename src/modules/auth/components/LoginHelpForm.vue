<template>
  <v-card :elevation="elevation" :width="width" raised>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-card-title :class="$config.LOGIN_BAR_CLASS" v-t="'auth.forgot_password'" />
      <v-alert v-if="errorMessage" type="error" dense tile>{{ errorMessage }}</v-alert>
      <v-card-text class="pa-4">
        <v-text-field v-model="model.email" v-bind="schema.email" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn v-t="'common.back'" :ripple="false" @click="toggleHelp" tabindex="-1" text />
        <v-btn v-t="'auth.forgot_password'" :ripple="false" type="submit" color="primary" small text />
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import ApiService from '@/services/api.service'
import { translateError } from '@/util/helpers'
import { email, required } from 'vuelidate/lib/validators'

export default {
  props: {
    elevation: {
      type: Number,
      default: 4
    },
    width: {
      type: [String,Number],
      default: '600px'
    }
  },
  data: () => ({
    model: {
      email: ''
    },
    errorMessage: null,
    loading: false
  }),
  computed: {
    schema() {
      return {
        email: {
          label: this.$t('auth.email'),
          type: 'email',
          errorMessages: this.emailErrors(),
          appendIcon: 'mail',
          autocomplete: 'email'
        }
      }
    }
  },
  methods: {
    translateError,
    toggleHelp() {
      this.$emit('update')
    },
    emailErrors() {
      const errors = []
      if (!this.$v.model.email.$dirty) return errors
      !this.$v.model.email.required && errors.push(this.translateError('validation.required', 'auth.email'))
      !this.$v.model.email.email && errors.push(this.translateError('validation.email', 'auth.email'))
      return errors
    },
    onSubmit() {
      this.errorMessage = null
      this.loading = true

      // trigger validators
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = 'Fix Errors'
        this.loading = false
        return false
      }

      // submit login help request
      ApiService.post('auth/help', this.model)
        .then(() => {
          //console.log('Login Help Success')
          //this.$router.push({ name: 'home' })
        })
        .catch(error => {
          //console.log('Login Help Failure')
          this.errorMessage = error.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  validations: {
    model: {
      email: { email, required }
    }
  }
}
</script>

<style>

</style>