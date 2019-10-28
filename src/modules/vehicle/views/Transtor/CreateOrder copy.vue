<template>
  <v-card flat>
    <v-alert v-if="errorMessage" class="mb-0" type="error" text>{{ errorMessage }}</v-alert>
    <v-toolbar flat>
      <v-toolbar-title>{{ $t('vehicle_dashboard.create_order') }}</v-toolbar-title>
    </v-toolbar>
      <v-form @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <header :class="$config.SUBHEADER_CLASS" v-t="'vehicle_dashboard.authorization_detail'" />
          <v-col cols="12" sm="6">
            <v-radio-group v-model="model.transtor_type" v-bind="schema.transtor_type">
              <template #label>
                {{ $t('vehicle_dashboard.transtor_type') }}
              </template>
              <v-radio value="transport">
                <template #label>
                  {{ $t('vehicle_dashboard.transport') }}
                </template>
              </v-radio>
              <v-radio value="storage">
                <template #label>
                  {{ $t('vehicle_dashboard.storage') }}
                </template>
              </v-radio>
              <v-radio value="transport-out-of-storage">
                <template #label>
                  {{ $t('vehicle_dashboard.transport_out_of_storage') }}
                </template>
              </v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6">
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
          <v-col cols="12" md="6">
            <v-dialog
              ref="pickup_modal"
              v-model="pickup_modal"
              :return-value.sync="model.requested_pickup_date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="model.requested_pickup_date" v-bind="schema.requested_pickup_date" v-on="on" />
              </template>
              <v-date-picker v-model="model.requested_pickup_date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="pickup_modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.pickup_modal.save(model.requested_pickup_date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="12" md="6">
            <v-dialog
              ref="delivery_modal"
              v-model="delivery_modal"
              :return-value.sync="model.requested_delivery_date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="model.requested_delivery_date" v-bind="schema.requested_delivery_date" v-on="on" />
              </template>
              <v-date-picker v-model="model.requested_delivery_date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="delivery_modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.delivery_modal.save(model.requested_delivery_date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn color="primary" block>{{ $t('vehicle_dashboard.change_driver_assignment') }}</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <header :class="$config.SUBHEADER_CLASS" v-t="'vehicle_dashboard.pickup_information'" />
          <v-col cols="12" md="6">
            <v-text-field v-model="model.pickup_contact_name" v-bind="schema.pickup_contact_name" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="4">
            <v-select v-model="model.pickup_address_type" v-bind="schema.pickup_address_type" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="6">
            <v-text-field v-model="model.pickup_address_1" v-bind="schema.pickup_address_1" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="6">
            <v-text-field v-model="model.pickup_address_2" v-bind="schema.pickup_address_2" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="6" sm="12">
            <v-text-field v-model="model.pickup_city" v-bind="schema.pickup_city" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="2" sm="4">
            <v-text-field v-model="model.pickup_state_province" v-bind="schema.pickup_state_province" />
          </v-col>
          <v-col cols="12" md="4" sm="8">
            <v-text-field v-model="model.pickup_postal_code" v-bind="schema.pickup_postal_code" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="2" sm="4">
            <v-text-field v-model="model.pickup_phone_type" v-bind="schema.pickup_phone_type" />
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-text-field v-model="model.pickup_phone" v-bind="schema.pickup_phone" />
          </v-col>
          <v-col cols="12" md="1" sm="2">
            <v-text-field v-model="model.pickup_phone_ext" v-bind="schema.pickup_phone_ext" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="6">
            <v-text-field v-model="model.pickup_contact_email" v-bind="schema.pickup_contact_email" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" sm="6">
            <v-checkbox v-model="model.pickup_employee_terminated" v-bind="schema.pickup_employee_terminated" />
          </v-col>
        </v-row>
        <v-row>
          <header :class="$config.SUBHEADER_CLASS" v-t="'vehicle_dashboard.delivery_information'" />
          <v-col cols="12" md="6">
            <v-text-field v-model="model.delivery_contact_name" v-bind="schema.delivery_contact_name" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="4">
            <v-select v-model="model.delivery_address_type" v-bind="schema.delivery_address_type" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="6">
            <v-text-field v-model="model.delivery_address_1" v-bind="schema.delivery_address_1" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="6">
            <v-text-field v-model="model.delivery_address_2" v-bind="schema.delivery_address_2" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="6" sm="12">
            <v-text-field v-model="model.delivery_city" v-bind="schema.delivery_city" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="2" sm="4">
            <v-text-field v-model="model.delivery_state_province" v-bind="schema.delivery_state_province" />
          </v-col>
          <v-col cols="12" md="4" sm="8">
            <v-text-field v-model="model.delivery_postal_code" v-bind="schema.delivery_postal_code" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="2" sm="4">
            <v-text-field v-model="model.delivery_phone_type" v-bind="schema.delivery_phone_type" />
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-text-field v-model="model.delivery_phone" v-bind="schema.delivery_phone" />
          </v-col>
          <v-col cols="12" md="1" sm="2">
            <v-text-field v-model="model.delivery_phone_ext" v-bind="schema.delivery_phone_ext" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="6">
            <v-text-field v-model="model.delivery_contact_email" v-bind="schema.delivery_contact_email" />
          </v-col>
        </v-row>
        <v-row>
          <header :class="$config.SUBHEADER_CLASS" v-t="'vehicle_dashboard.additional_services'" />
          <v-col cols="12" md="6">
            <v-checkbox v-model="model.approve_auto_detail" v-bind="schema.approve_auto_detail" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="6">
            <v-checkbox v-model="model.approve_oil_change" v-bind="schema.approve_oil_change" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="6">
            <v-textarea v-model="model.other_services" v-bind="schema.other_services" />
          </v-col>
          <v-responsive width="100%" />
          <v-col cols="12" md="6">
            <v-textarea v-model="model.special_instructions" v-bind="schema.special_instructions" />
          </v-col>
        </v-row>
        <v-alert type="info" class="mb-0">{{ `quote as param:` }} {{ quote }}</v-alert>
        <v-card-actions>
          <v-spacer />
          <v-btn type="submit">Submit</v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'
import { translateError } from '@/util/helpers'
export default {
  props: ['vehicle','quote'],
  data: () => ({
    errorMessage: null,
    loading: false,
    delivery_modal: false,
    pickup_modal: false,
    model: {
      // authorization detail
      transport_method: '',
      transtor_type: 'transport',
      requested_pickup_date: null,
      requested_delivery_date: null,
      // pickup information
      pickup_contact_name: '',
      pickup_address_type: 'residence',
      pickup_address_1: '',
      pickup_address_2: '',
      pickup_city: '',
      pickup_state_province: '',
      pickup_postal_code: '',
      pickup_phone_type: '',
      pickup_phone: '',
      pickup_phone_ext: '',
      pickup_contact_email: '',
      pickup_employee_terminated: false,
      // delivery information
      delivery_contact_name: '',
      delivery_address_type: 'Residential',
      delivery_address_1: '',
      delivery_address_2: '',
      delivery_city: '',
      delivery_state_province: '',
      delivery_postal_code: '',
      delivery_phone_type: '',
      delivery_phone: '',
      delivery_phone_ext: '',
      delivery_contact_email: '',
      // additional services
      approve_auto_detail: false,
      approve_oil_change: false,
      other_services: '',
      special_instructions: ''
    }
  }),
  computed: {
    schema() {
      return {
        transtor_type: {
          label: this.$t('vehicle_dashboard.transtor_type'),
          errorMessages: this.transtorTypeErrors()
        },
        transport_method: {
          label: this.$t('vehicle_dashboard.transport_method'),
          errorMessages: this.transportMethodErrors()
        },
        requested_pickup_date: {
          label: this.$t('dates.requested_pickup_date'),
          errorMessages: this.requestedPickupDateErrors(),
          prependIcon: 'event',
          clearable: true,
          readonly: true,
          outlined: true,
          dense: true
        },
        requested_delivery_date: {
          label: this.$t('dates.requested_delivery_date'),
          errorMessages: this.requestedDeliveryDateErrors(),
          prependIcon: 'event',
          clearable: true,
          readonly: true,
          outlined: true,
          dense: true
        },
        pickup_contact_name: {
          label: this.$t('vehicle_dashboard.contact_name'),
          errorMessages: this.pickupContactNameErrors(),
          outlined: true,
          dense: true
        },
        pickup_address_type: {
          label: this.$t('vehicle_dashboard.address_type'),
          errorMessages: this.pickupAddressTypeErrors(),
          items: this.addressTypes(),
          itemText: 'key',
          itemValue: 'value',
          outlined: true,
          dense: true
          //items: ['Residential','Business']
        },
        pickup_address_1: {
          label: this.$t('vehicle_dashboard.address_1'),
          errorMessages: this.pickupAddress1Errors(),
          outlined: true,
          dense: true
        },
        pickup_address_2: {
          label: this.$t('vehicle_dashboard.address_2'),
          //errorMessages: this.pickupAddress2Errors(),
          outlined: true,
          dense: true
        },
        pickup_city: {
          label: this.$t('vehicle_dashboard.city'),
          errorMessages: this.pickupCityErrors(),
          outlined: true,
          dense: true
        },
        pickup_state_province: {
          label: this.$t('vehicle_dashboard.state_province'),
          errorMessages: this.pickupStateProvinceErrors(),
          outlined: true,
          dense: true
        },
        pickup_postal_code: {
          label: this.$t('vehicle_dashboard.postal_code'),
          errorMessages: this.pickupPostalCodeErrors(),
          outlined: true,
          dense: true
        },
        pickup_phone_type: {
          label: this.$t('vehicle_dashboard.phone_type'),
          errorMessages: this.pickupPhoneTypeErrors(),
          outlined: true,
          dense: true
        },
        pickup_phone: {
          label: this.$t('vehicle_dashboard.phone'),
          errorMessages: this.pickupPhoneErrors(),
          outlined: true,
          dense: true
        },
        pickup_phone_ext: {
          label: this.$t('vehicle_dashboard.phone_ext'),
          errorMessages: this.pickupPhoneExtErrors(),
          outlined: true,
          dense: true
        },
        pickup_contact_email: {
          label: this.$t('vehicle_dashboard.email'),
          errorMessages: this.pickupContactEmailErrors(),
          outlined: true,
          dense: true
        },
        pickup_employee_terminated: {
          label: this.$t('vehicle_dashboard.employee_terminated'),
          //errorMessages: this.pickupEmployeeTerminatedErrors(),
          outlined: true,
          dense: true
        },
        delivery_contact_name: {
          label: this.$t('vehicle_dashboard.contact_name'),
          errorMessages: this.deliveryContactNameErrors(),
          outlined: true,
          dense: true
        },
        delivery_address_type: {
          label: this.$t('vehicle_dashboard.address_type'),
          errorMessages: this.deliveryAddressTypeErrors(),
          items: this.addressTypes(),
          itemText: 'key',
          itemValue: 'value',
          outlined: true,
          dense: true
          //items: ['Residential','Business']
        },
        delivery_address_1: {
          label: this.$t('vehicle_dashboard.address_1'),
          errorMessages: this.deliveryAddress1Errors(),
          outlined: true,
          dense: true
        },
        delivery_address_2: {
          label: this.$t('vehicle_dashboard.address_2'),
          //errorMessages: this.pickupAddress2Errors(),
          outlined: true,
          dense: true
        },
        delivery_city: {
          label: this.$t('vehicle_dashboard.city'),
          errorMessages: this.deliveryCityErrors(),
          outlined: true,
          dense: true
        },
        delivery_state_province: {
          label: this.$t('vehicle_dashboard.state_province'),
          errorMessages: this.deliveryStateProvinceErrors(),
          outlined: true,
          dense: true
        },
        delivery_postal_code: {
          label: this.$t('vehicle_dashboard.postal_code'),
          errorMessages: this.deliveryPostalCodeErrors(),
          outlined: true,
          dense: true
        },
        delivery_phone_type: {
          label: this.$t('vehicle_dashboard.phone_type'),
          errorMessages: this.deliveryPhoneTypeErrors(),
          outlined: true,
          dense: true
        },
        delivery_phone: {
          label: this.$t('vehicle_dashboard.phone'),
          errorMessages: this.deliveryPhoneErrors(),
          outlined: true,
          dense: true
        },
        delivery_phone_ext: {
          label: this.$t('vehicle_dashboard.phone_ext'),
          errorMessages: this.deliveryPhoneExtErrors(),
          outlined: true,
          dense: true
        },
        delivery_contact_email: {
          label: this.$t('vehicle_dashboard.email'),
          errorMessages: this.deliveryContactEmailErrors(),
          outlined: true,
          dense: true
        },
        approve_auto_detail: {
          label: this.$t('vehicle_dashboard.approve_auto_detail'),
        },
        approve_oil_change: {
          label: this.$t('vehicle_dashboard.approve_oil_change')
        },
        other_services: {
          label: this.$t('vehicle_dashboard.other_services'),
          outlined: true,
          dense: true
        },
        special_instructions: {
          label: this.$t('vehicle_dashboard.special_instructions'),
          outlined: true,
          dense: true
        }
      }
    }
  },
  methods: {
    translateError,
    addressTypes() {
      return [
        {
          key: this.$t('vehicle_dashboard.residential'),
          name: 'Residential',
          value: 'residential'
        },
        {
          key: this.$t('vehicle_dashboard.business'),
          name: 'Business',
          value: 'business'
        }
      ]
    },
    pickupContactNameErrors() {
      const errors = []
      if (!this.$v.model.pickup_contact_name.$dirty) return errors
      !this.$v.model.pickup_contact_name.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.contact_name'))
      return errors
    },
    pickupAddressTypeErrors() {
      const errors = []
      if (!this.$v.model.pickup_address_type.$dirty) return errors
      !this.$v.model.pickup_address_type.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.pickup_address_type'))
      return errors
    },
    pickupAddress1Errors() {
      const errors = []
      if (!this.$v.model.pickup_address_1.$dirty) return errors
      !this.$v.model.pickup_address_1.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.address_1'))
      return errors
    },
    pickupAddress2Errors() {
      const errors = []
      if (!this.$v.model.pickup_address_2.$dirty) return errors
      !this.$v.model.pickup_address_2.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.address_2'))
      return errors
    },
    pickupCityErrors() {
      const errors = []
      if (!this.$v.model.pickup_city.$dirty) return errors
      !this.$v.model.pickup_city.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.city'))
      return errors
    },
    pickupStateProvinceErrors() {
      const errors = []
      if (!this.$v.model.pickup_state_province.$dirty) return errors
      !this.$v.model.pickup_state_province.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.state_province'))
      return errors
    },
    pickupPostalCodeErrors() {
      const errors = []
      if (!this.$v.model.pickup_postal_code.$dirty) return errors
      !this.$v.model.pickup_postal_code.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.postal_code'))
      return errors
    },
    pickupPhoneTypeErrors() {
      const errors = []
      if (!this.$v.model.pickup_phone_type.$dirty) return errors
      !this.$v.model.pickup_phone_type.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.phone_type'))
      return errors
    },
    pickupPhoneErrors() {
      const errors = []
      if (!this.$v.model.pickup_phone.$dirty) return errors
      !this.$v.model.pickup_phone.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.phone'))
      return errors
    },
    pickupPhoneExtErrors() {
      const errors = []
      if (!this.$v.model.pickup_phone_ext.$dirty) return errors
      !this.$v.model.pickup_phone_ext.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.phone_ext'))
      return errors
    },
    pickupContactEmailErrors() {
      const errors = []
      if (!this.$v.model.pickup_contact_email.$dirty) return errors
      !this.$v.model.pickup_contact_email.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.email'))
      !this.$v.model.pickup_contact_email.email && errors.push(this.translateError('validation.invalid', 'vehicle_dashboard.email'))
      return errors
    },
    pickupEmployeeTerminatedErrors() {
      const errors = []
      if (!this.$v.model.pickup_employee_terminated.$dirty) return errors
      !this.$v.model.pickup_employee_terminated.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.employee_terminated'))
      return errors
    },
    requestedDeliveryDateErrors() {
      const errors = []
      if (!this.$v.model.requested_delivery_date.$dirty) return errors
      !this.$v.model.requested_delivery_date.required && errors.push(this.translateError('validation.required', 'dates.requested_delivery_date'))
      return errors
    },
    requestedPickupDateErrors() {
      const errors = []
      if (!this.$v.model.requested_pickup_date.$dirty) return errors
      !this.$v.model.requested_pickup_date.required && errors.push(this.translateError('validation.required', 'dates.requested_pickup_date'))
      return errors
    },
    transportMethodErrors() {
      const errors = []
      if (!this.$v.model.transport_method.$dirty) return errors
      !this.$v.model.transport_method.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.transport_method'))
      return errors
    },
    transtorTypeErrors() {
      const errors = []
      if (!this.$v.model.transtor_type.$dirty) return errors
      !this.$v.model.transtor_type.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.transtor_type'))
      return errors
    },
    deliveryContactNameErrors() {
      const errors = []
      if (!this.$v.model.delivery_contact_name.$dirty) return errors
      !this.$v.model.delivery_contact_name.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.contact_name'))
      return errors
    },
    deliveryAddressTypeErrors() {},
    deliveryAddress1Errors() {},
    deliveryCityErrors() {},
    deliveryStateProvinceErrors() {},
    deliveryPostalCodeErrors() {},
    deliveryPhoneTypeErrors() {},
    deliveryPhoneErrors() {},
    deliveryPhoneExtErrors() {},
    deliveryContactEmailErrors() {},
    onSubmit() {
      console.log('on submit')
      
      //trigger validations
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = 'fix validation errors!'
        this.loading = false
        return false
      }
      this.errorMessage = null
      console.log('valid!')
    }
  },
  validations: {
    model: {
      transport_method: { required },
      transtor_type: { required },
      requested_pickup_date: { required },
      requested_delivery_date: { required },
      // pickup information
      pickup_contact_name: { required },
      pickup_address_type: { required },
      pickup_address_1: { required },
      pickup_address_2: {},
      pickup_city: { required },
      pickup_state_province: { required },
      pickup_postal_code: { required },
      pickup_phone_type: { required },
      pickup_phone: { required },
      pickup_phone_ext: {},
      pickup_contact_email: { email, required },
      pickup_employee_terminated: {},
      // delivery information
      delivery_contact_name: { required },
      delivery_address_type: { required },
      delivery_address_1: { required },
      delivery_address_2: {},
      delivery_city: { required },
      delivery_state_province: { required },
      delivery_postal_code: { required },
      delivery_phone_type: { required },
      delivery_phone: { required },
      delivery_phone_ext: { required },
      delivery_contact_email: { required },
      // additional services
      approve_auto_detail: {},
      approve_oil_change: {},
      other_services: {},
      special_instructions: {}
    }
  },
  created() {
    console.log(`props: `)
    console.log(this.$props)
    if (this.$props.quote) {
      console.log('setting model to quote passed as prop')
      //debugger
      this.model = { ...this.model, ...this.$props.quote }
    }
  }
}
</script>

<style>

</style>