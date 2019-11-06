<template>
  <div>
    <v-card elevation="1" tile>
      <v-toolbar flat>
        <v-toolbar-title>{{ $t('transtor.request_quote') }}</v-toolbar-title>
      </v-toolbar>
      <!-- <v-card-title class="display-2 font-weight-light justify-center">{{ $t('vehicle_dashboard.request_quote') }}</v-card-title> -->
      <v-form @submit.prevent="requestQuote">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-radio-group v-model="model.transport_method" v-bind="schema.transport_method">
                  <template #label>
                    {{ $t('transtor.transport_method') }}
                  </template>
                  <v-radio value="driven">
                    <template #label>
                      {{ $t('transtor.driven') }}
                    </template>
                  </v-radio>
                  <v-radio value="trucked">
                    <template #label>
                      {{ $t('transtor.trucked') }}
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6">
                <v-label>{{ $t('transtor.origin') }}</v-label>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-text-field v-bind="schema.origin_city" v-model="model.origin_city" />
                  </v-col>
                  <v-col cols="7" md="3">
                    <v-text-field v-bind="schema.origin_state_province" v-model="model.origin_state_province" />
                  </v-col>
                  <v-col cols="5" md="4">
                    <v-text-field v-bind="schema.origin_postal_code" v-model="model.origin_postal_code" />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" lg="6">
                <v-label>{{ $t('transtor.destination') }}</v-label>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-text-field v-bind="schema.destination_city" v-model="model.destination_city" />
                  </v-col>
                  <v-col cols="7" md="3">
                    <v-text-field v-bind="schema.destination_state_province" v-model="model.destination_state_province" />
                  </v-col>
                  <v-col cols="5" md="4">
                    <v-text-field v-bind="schema.destination_postal_code" v-model="model.destination_postal_code" />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn type="submit" color="primary lighten-2" :loading="loading">{{$t('transtor.request_quote')}}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-scale-transition>
      <transtor-quote v-show="showQuote" id="quote" class="py-12" :quote="quote" :quote-loading="quoteLoading" />
    </v-scale-transition>
  </div>
</template>

<script>
//import TranstorVehicle from '@/modules/vehicle/components/TranstorVehicle'
import TranstorQuote from '@/modules/vehicle/components/TranstorQuote'
import { goTo, translateError } from '@/util/helpers'
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
    quote: {},
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
          label: this.$t('transtor.transport_method'),
          errorMessages: this.transportMethodErrors()

        },
        origin_city: {
          label: this.$t('vehicle_dashboard.city'),
          type: 'text',
          errorMessages: this.originCityErrors(),
          class: 'col-12 col-md-5',
          cols: 12,
          md: 5,
          dense: true,
          outlined: true
        },
        origin_state_province: {
          label: this.$t('vehicle_dashboard.state_province'),
          type: 'text',
          errorMessages: this.originStateProvinceErrors(),
          // setting errorcount to 0 will hide the error text since city/state use the same error
          errorCount: 0,
          class: 'col-12 col-md-4',
          cols: 12,
          md: 4,
          dense: true,
          outlined: true
        },
        origin_postal_code: {
          label: this.$t('vehicle_dashboard.postal_code'),
          type: 'text',
          errorMessages: this.originPostalCodeErrors(),
          class: 'col-12 col-md-3',
          cols: 12,
          md: 3,
          dense: true,
          outlined: true
        },
        destination_city: {
          label: this.$t('vehicle_dashboard.city'),
          type: 'text',
          errorMessages: this.destinationCityErrors(),
          class: 'col-12 col-md-5',
          cols: 12,
          md: 5,
          dense: true,
          outlined: true
        },
        destination_state_province: {
          label: this.$t('vehicle_dashboard.state_province'),
          type: 'text',
          errorMessages: this.destinationStateProvinceErrors(),
          // setting errorcount to 0 will hide the error text since city/state use the same error
          errorCount: 0,
          class: 'col-12 col-md-4',
          cols: 12,
          md: 4,
          dense: true,
          outlined: true
        },
        destination_postal_code: {
          label: this.$t('vehicle_dashboard.postal_code'),
          type: 'text',
          errorMessages: this.destinationPostalCodeErrors(),
          class: 'col-12 col-md-3',
          cols: 12,
          md: 3,
          dense: true,
          outlined: true
        }
      }
    }
  },
  methods: {
    goTo,
    translateError,
    transportMethodErrors() {
      const errors = []
      if (!this.$v.model.transport_method.$dirty) return errors
      !this.$v.model.transport_method.required && errors.push(this.translateError('validation.required', 'transtor.transport_method'))
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
          // scroll to the quote
          this.goTo('#quote')
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