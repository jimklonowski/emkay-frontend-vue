<template>
  <v-card flat>
    <v-alert v-if="errorMessage" class="mb-0" type="error" text>{{ errorMessage }}</v-alert>
    <v-toolbar flat>
      <v-toolbar-title>{{ $t('vehicle_dashboard.request_quote') }}</v-toolbar-title>
    </v-toolbar>
    <v-form @submit.prevent="requestQuote">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-radio-group v-model="model.transport_method" v-bind="schema.transport_method">
              <template #label>
                {{ $t('vehicle_dashboard.transport_method') }}
              </template>
              <v-radio value="driven">
                <template #label>
                  {{ $t('vehicle_dashboard.driven') }}
                </template>
              </v-radio>
              <v-radio value="trucked">
                <template #label>
                  {{ $t('vehicle_dashboard.trucked') }}
                </template>
              </v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-label>Origin</v-label>
            <v-row>
              <v-col cols="9" md="4">
                <v-text-field v-bind="schema.origin_city" v-model="model.origin_city" />
              </v-col>
              <v-col cols="3" md="2">
                <v-text-field v-bind="schema.origin_state_province" v-model="model.origin_state_province" />
              </v-col>
              <v-col cols="12" md="1" class="text-center">
                <span class="overline">or</span>
              </v-col>
              <v-col cols="4" md="3">
                <v-text-field v-bind="schema.origin_postal_code" v-model="model.origin_postal_code" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-label>Destination</v-label>
            <v-row>
              <v-col cols="9" md="4">
                <v-text-field v-bind="schema.destination_city" v-model="model.destination_city" />
              </v-col>
              <v-col cols="3" md="2">
                <v-text-field v-bind="schema.destination_state_province" v-model="model.destination_state_province" />
              </v-col>
              <v-col cols="12" md="1" class="text-center">
                <span class="overline">or</span>
              </v-col>
              <v-col cols="4" md="3">
                <v-text-field v-bind="schema.destination_postal_code" v-model="model.destination_postal_code" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn type="submit" color="primary" block>{{$t('vehicle_dashboard.request_quote')}}</v-btn>
      </v-card-actions>
    </v-form>
    <v-divider />
    <v-skeleton-loader v-if="quoteLoading" type="article" tile />
    <transtor-quote v-show="showQuote" :quote="quote" />
  </v-card>
</template>

<script>
import TranstorQuote from '@/modules/vehicle/components/TranstorQuote'
import { translateError } from '@/util/helpers'
import { maxLength, required, requiredIf } from 'vuelidate/lib/validators'

export default {
  components: {
    TranstorQuote
  },
  data: () => ({
    errorMessage: null,
    loading: false,
    model: {
      transport_method: null,
      origin_city: '',
      origin_state_province: '',
      origin_postal_code: '',
      destination_city: '',
      destination_state_province: '',
      destination_postal_code: ''
    },
    quote: null,
    quoteLoading: false,
    showQuote: false,
  }),
  computed: {
    getQuote() {
      return this.quote
    },
    schema() {
      return {
        transport_method: {
          label: this.$t('vehicle_dashboard.transport_method'),
          errorMessages: this.transportMethodErrors()
        },
        origin_city: {
          label: this.$t('vehicle_dashboard.city'),
          type: 'text',
          errorMessages: this.originCityErrors(),
          class: 'col-12 col-md-5',
          cols: 12,
          md: 5,
          dense: true
        },
        origin_state_province: {
          label: this.$t('vehicle_dashboard.state_province'),
          type: 'text',
          errorMessages: this.originStateProvinceErrors(),
          class: 'col-12 col-md-4',
          cols: 12,
          md: 4,
          dense: true
        },
        origin_postal_code: {
          label: this.$t('vehicle_dashboard.postal_code'),
          type: 'text',
          errorMessages: this.originPostalCodeErrors(),
          class: 'col-12 col-md-3',
          cols: 12,
          md: 3,
          dense: true
        },
        destination_city: {
          label: this.$t('vehicle_dashboard.city'),
          type: 'text',
          errorMessages: this.destinationCityErrors(),
          class: 'col-12 col-md-5',
          cols: 12,
          md: 5,
          dense: true
        },
        destination_state_province: {
          label: this.$t('vehicle_dashboard.state_province'),
          type: 'text',
          errorMessages: this.destinationStateProvinceErrors(),
          class: 'col-12 col-md-4',
          cols: 12,
          md: 4,
          dense: true
        },
        destination_postal_code: {
          label: this.$t('vehicle_dashboard.postal_code'),
          type: 'text',
          errorMessages: this.destinationPostalCodeErrors(),
          class: 'col-12 col-md-3',
          cols: 12,
          md: 3,
          dense: true
        }
      }
    }
  },
  methods: {
    translateError,
    transportMethodErrors() {
      const errors = []
      if (!this.$v.model.transport_method.$dirty) return errors
      !this.$v.model.transport_method.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.transport_method'))
      return errors
    },
    originCityErrors() {
      const errors = []
      if (!this.$v.model.origin_city.$dirty) return errors
      !this.$v.model.origin_city.requiredIf && errors.push(this.translateError('validation.city_state_province_required_if_no_postal_code'))
      !this.$v.model.origin_city.maxLength && errors.push(this.translateError('validation.max_length', 30))
      return errors
    },
    originStateProvinceErrors() {
      const errors = []
      if (!this.$v.model.origin_state_province.$dirty) return errors
      !this.$v.model.origin_state_province.requiredIf && errors.push(this.translateError('validation.city_state_province_required_if_no_postal_code'))
      //!this.$v.model.origin_state_province.maxLength && errors.push(this.translateError('validation.max_length', 10))
      return errors
    },
    originPostalCodeErrors() {
      const errors = []
      if (!this.$v.model.origin_postal_code.$dirty) return errors
      !this.$v.model.origin_postal_code.requiredIf && errors.push(this.translateError('validation.postal_code_required_if_no_city_state_province'))
      !this.$v.model.origin_postal_code.maxLength && errors.push(this.translateError('validation.max_length', 10))
      return errors
    },
    destinationCityErrors() {
      const errors = []
      if (!this.$v.model.destination_city.$dirty) return errors
      !this.$v.model.destination_city.requiredIf && errors.push(this.translateError('validation.city_state_province_required_if_no_postal_code'))
      !this.$v.model.destination_city.maxLength && errors.push(this.translateError('validation.max_length', 30))
      return errors
    },
    destinationStateProvinceErrors() {
      const errors = []
      if (!this.$v.model.destination_state_province.$dirty) return errors
      !this.$v.model.destination_state_province.requiredIf && errors.push(this.translateError('validation.city_state_province_required_if_no_postal_code'))
      return errors
    },
    destinationPostalCodeErrors() {
      const errors = []
      if (!this.$v.model.destination_postal_code.$dirty) return errors
      !this.$v.model.destination_postal_code.requiredIf && errors.push(this.translateError('validation.postal_code_required_if_no_city_state_province'))
      !this.$v.model.destination_postal_code.maxLength && errors.push(this.translateError('validation.max_length', 10))
      return errors
    },
    requestQuote() {
      this.quote = {}
      this.showQuote = false
      this.errorMessage = null
      this.loading = true
      const url = '/transtor/quote'
      // Trigger validations
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = 'Fix validation errors'
        this.loading = false
        return false
      }

      this.quoteLoading = true

      this.$http
        .post(url, this.model)
        .then(result => {
          this.errorMessage = null
          //debugger
          this.quote = result.data
          this.showQuote = true
        })
        .catch(error => {
          //console.log(error.response)
          this.errorMessage = error.response.data.error
        })
        .finally(() => {
          this.loading = false
          this.quoteLoading = false
        })
    }
  },
  validations: {
    model: {
      transport_method: { required },
      origin_city: {
        requiredIf: requiredIf(model => {
          return !model.origin_postal_code
        }),
        maxLength: maxLength(30)
      },
      origin_state_province: {
        requiredIf: requiredIf(model => {
          return !model.origin_postal_code
        })
      },
      origin_postal_code: { 
        requiredIf: requiredIf(model => {
          return !(model.origin_city && model.origin_state_province)
        }),
        maxLength: maxLength(10)
      },
      destination_city: {
        requiredIf: requiredIf(model => {
          return !model.destination_postal_code
        }),
        maxLength: maxLength(30)
      },
      destination_state_province: {
        requiredIf: requiredIf(model => {
          return !model.destination_postal_code
        })
      },
      destination_postal_code: {
        requiredIf: requiredIf(model => {
          return !(model.destination_city && model.destination_state_province)
        }),
        maxLength: maxLength(10)
      },
    }
  }
}
</script>

<style>

</style>