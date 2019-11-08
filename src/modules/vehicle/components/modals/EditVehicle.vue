<template>
  <v-card :loading="loading">
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-toolbar :color="errorMessage ? 'error darken-2' : 'primary'">
        <toolbar-title v-bind="title" />
        <v-spacer />
        <v-btn large icon dark @click.prevent="$emit('close')">
          <v-icon v-text="'mdi-close'" />
        </v-btn>
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-alert v-if="errorMessage" class="mb-0" type="error" dense tile>{{ errorMessage }}</v-alert>
        <v-subheader>TODO</v-subheader>
        <v-divider />
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="model.center" v-bind="schema.center" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="model.billing_sort" v-bind="schema.billing_sort"  />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="model.vin" v-bind="schema.vin"  />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="model.client_vehicle_number" v-bind="schema.client_vehicle_number"  />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          v-t="'common.cancel'"
          type="button"
          color="error"
          :ripple="false"
          text
          @click.prevent="$emit('close')"
        />
        <v-btn
          v-t="'common.save_changes'"
          type="submit"
          color="primary"
          :ripple="false"
          depressed
          tile
        >
          <v-icon dark v-text="'mdi-save'" />
          {{ $t('common.save_changes') }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import ToolbarTitle from '@/modules/core/components/ToolbarTitle'
export default {
  components: { ToolbarTitle },
  data: () => ({
    errorMessage: null,
    loading: false,
    title: {
      key1: 'common.edit',
      key2: 'vehicle_dashboard.vehicle'
    },

    // model
    model: {
      center: '',
      center_description: '',
      billing_sort: '',
      vin: '',
      client_vehicle_number: ''
    }
  }),
  computed: {
    schema() {
      return {
        center: {
          label: this.$t('vehicle_dashboard.center'),
          type: 'text'
        },
        billing_sort: {
          label: this.$t('vehicle_dashboard.billing_sort'),
          type: 'text'
        },
        vin: {
          label: this.$t('vehicle_dashboard.vin'),
          type: 'text'
        },
        client_vehicle_number: {
          label: this.$t('vehicle_dashboard.client_vehicle_number'),
          type: 'text'
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.errorMessage = null
      this.loading = true
      const url = '/test/post'
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = 'Fix Validation Errors'
        this.loading = false
        return false
      }

      this.$http
        .post(url, this.model)
        .then(() => {
          this.errorMessage = null
          this.originalModel = this.model
        })
        .catch(error => {
          this.errorMessage = error.response.data.error
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  validations: {
    model: {
      center: {},
      //center_description: {},
      billing_sort: {},
      vin: {},
      client_vehicle_number: {}
    }
  }
}
</script>
