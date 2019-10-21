<template>
  <v-card :elevation="elevation" :width="width">
    <v-card-title v-text="'Login'" />
    <v-card-text>
      <v-form>
        <v-alert>{{ text }}</v-alert>
        <v-text-field v-model="model.account" v-bind="schema.account" />
        <v-text-field v-model="model.username" v-bind="schema.username" />
        <v-text-field v-model="model.password" v-bind="schema.password" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn v-t="'auth.forgot_password'" tabindex="-1" text />
      <v-btn v-t="'auth.login'" type="submit" color="primary" class="mr-4" text />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    elevation: {
      type: Number,
      default: 12
    },
    width: {
      type: [String,Number],
      default: '600px'
    },
    text: {
      type: String,
      default: 'default text'
    }
  },
  data: () => ({
    model: {
      account: '',
      username: '',
      password: ''
    }
  }),
  computed: {
    schema() {
      return {
        account: {
          label: this.$t('auth.account'),
          type: 'text'
        },
        username: {
          label: this.$t('auth.username'),
          type: 'text'
        },
        password: {
          label: this.$t('auth.password'),
          type: 'password'
        }
      }
    }
  },
  methods: {
    accountErrors() {
      const errors = []
      return errors
    },
    usernameErrors() {
      const errors = []
      return errors
    },
    passwordErrors() {
      const errors = []
      return errors
    }
  }
}
</script>

<style>

</style>