<template>
  <v-card :loading="loading">
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-toolbar :color="error ? 'error darken-2' : 'primary'" dark>
        <v-toolbar-title>Edit Driver Details</v-toolbar-title>
        <v-spacer />
        <v-btn large icon dark @click.prevent="$emit('close')">
          <v-icon v-text="'mdi-close'" />
        </v-btn>
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-alert v-if="error" class="mb-0" type="error" dense tile>{{ error }}</v-alert>
        <v-subheader>TODO</v-subheader>
        <v-divider />
        <v-container class="py-0">
          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col v-for="(item, name, key) in model.address" :key="key" v-bind="schema.address[name].flex">
                  <v-text-field v-model="model.address[name]" v-bind="schema.address[name].props" dense />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col v-for="(item, name, key) in model.contact" :key="key" v-bind="schema.contact[name].flex">
                  <v-text-field v-model="model.contact[name]" v-bind="schema.contact[name].props" dense />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-form>
  </v-card>
</template>
<script>
import { translateError } from '@/util/helpers'
import { email, maxLength, required } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    loading: false,
    model: {
      address: {
        address_1: '',
        address_2: '',
        city: '',
        state_province: '',
        county: '',
        postal_code: ''
      },
      contact: {
        phone: '',
        cell: '',
        email: ''
      }
    }
  }),
  methods: {
    translateError,
    address1Errors() {
      const errors = []
      if (!this.$v.model.address_1.$dirty) return errors
      !this.$v.model.address_1.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.address_1'))
      !this.$v.model.address_1.maxLength && errors.push(this.translateError('validation.max_length', 30))
      return errors
    },
    address2Errors() {
      const errors = []
      if (!this.$v.model.address_2.$dirty) return errors
      !this.$v.model.address_2.maxLength && errors.push(this.translateError('validation.max_length', 30))
      return errors
    },
    cityErrors() {
      const errors = []
      if (!this.$v.model.city.$dirty) return errors
      !this.$v.model.city.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.city'))
      return errors
    },
    stateProvinceErrors() {
      const errors = []
      if (!this.$v.model.state_province.$dirty) return errors
      !this.$v.model.state_province.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.state_province'))
      return errors
    },
    countyErrors() {
      const errors = []
      return errors
    },
    postalCodeErrors() {
      const errors = []
      if (!this.$v.model.postal_code.$dirty) return errors
      !this.$v.model.postal_code.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.postal_code'))
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.model.email.$dirty) return errors
      !this.$v.model.email.email && errors.push(this.translateError('validation.invalid', 'vehicle_dashboard.email'))
      !this.$v.model.email.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.email'))
      return errors
    },
    phoneErrors() {
      const errors = []
      return errors
    },
    cellErrors() {
      const errors = []
      return errors
    }
  },
  computed: {
    schema() {
      return {
        address: {
          address_1: {
            props: {
              label: this.$t('vehicle_dashboard.address_1'),
              type: 'text',
              errorMessages: this.address1Errors(),
              errorCount: 1
            },
            flex: {
              cols: 12
            }
          },
          address_2: {
            props: {
              label: this.$t('vehicle_dashboard.address_2'),
              type: 'text',
              errorMessages: this.address2Errors(),
              errorCount: 1
            },
            flex: {
              cols: 12
            }
          },
          city: {
            props: {
              label: this.$t('vehicle_dashboard.city'),
              type: 'text',
              errorMessages: this.cityErrors(),
              errorCount: 1
            },
            flex: {
              cols: 8
            }
          },
          state_province: {
            props: {
              label: this.$t('vehicle_dashboard.state_province'),
              type: 'text',
              //errorMessages: this.stateProvinceErrors(),
              //errorCount: 1
            },
            flex: {
              cols: 4
            }
          },
          county: {
            props: {
              label: this.$t('vehicle_dashboard.county'),
              type: 'text',
              //errorMessages: this.countyErrors(),
              //errorCount: 1
            },
            flex: {
              cols: 6
            }
          },
          postal_code: {
            props: {
              label: this.$t('vehicle_dashboard.postal_code'),
              type: 'text',
              errorMessages: this.postalCodeErrors(),
              errorCount: 1
            },
            flex: {
              cols: 6
            }
          }
        },
        contact: {
          phone: {
            props: {
              label: this.$t('vehicle_dashboard.phone'),
              type: 'tel',
              prependIcon: 'mdi-phone',
              errorMessages: this.phoneErrors(),
              errorCount: 1
            },
            flex: {
              cols: 12
            }
          },
          cell: {
            props: {
              label: this.$t('vehicle_dashboard.cell'),
              type: 'tel',
              prependIcon: 'mdi-cellphone-basic',
              errorMessages: this.cellErrors(),
              errorCount: 1
            },
            flex: {
              cols: 12
            }
          },
          email: {
            props: {
              label: this.$t('vehicle_dashboard.email'),
              type: 'email',
              prependIcon: 'mdi-email',
              errorMessages: this.emailErrors(),
              errorCount: 1
            },
            flex: {
              cols: 12
            }
          }
        }
      }
    }
  },
  validations: {
    model: {
      address_1: { required, maxLength: maxLength(30) },
      address_2: { maxLength: maxLength(30) },
      city: { required },
      county: {},
      state_province: { required },
      postal_code: { required },
      phone: {},
      cell: {},
      email: { required, email }
    }
  }
}
</script>
