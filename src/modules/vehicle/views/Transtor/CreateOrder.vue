<template>
    <v-card tile>
      <v-stepper v-model="currentStep" class="transparent elevation-0" tile>
        <!-- <v-card-title class="display-2 font-weight-light justify-center">{{ $t('vehicle_dashboard.create_order') }}</v-card-title> -->
        <v-stepper-header class="elevation-1">
          <template v-for="(step, key) in steps">
            <v-stepper-step :key="`step${key}`" :complete="currentStep > key + 1" :step="key + 1" :rules="[() => !steps[key].errors]">
              <span class="text-center" v-t="step.key" />
            </v-stepper-step>
            <v-divider v-if="key < steps.length - 1" :key="`div${key}`" />
          </template>
        </v-stepper-header>
        <v-divider />
        <v-stepper-items>
          <!-- <v-alert v-if="errorMessage" class="mb-0" type="error" text>{{ errorMessage }}</v-alert> -->
          <!-- Step 1 -->
          <v-stepper-content step="1" :complete="currentStep > 1">
            <!-- v-if or dynamic key is required to fix vuetify outlined field labels: https://github.com/vuetifyjs/vuetify/issues/7470 -->
            <v-form ref="step1" v-if="currentStep == 1">
              <v-container>
                <v-row>
                  <!-- <header :class="$config.SUBHEADER_CLASS" v-t="'vehicle_dashboard.authorization_detail'" /> -->
                  <v-col cols="12" sm="6">
                    <v-radio-group v-model="model.transtor_type" v-bind="schema.transtor_type">
                      <template #label>
                        {{ $t('transtor.transtor_type') }}
                      </template>
                      <v-radio value="transport">
                        <template #label>
                          {{ $t('transtor.transport_this_vehicle') }}
                        </template>
                      </v-radio>
                      <v-radio value="storage">
                        <template #label>
                          {{ $t('transtor.store_this_vehicle') }}
                        </template>
                      </v-radio>
                      <v-radio value="transport-out-of-storage">
                        <template #label>
                          {{ $t('transtor.transport_out_of_storage') }}
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="6">
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
                  <v-col cols="12" md="6">
                    <v-btn color="info" @click.prevent="changeDriverAssignment" depressed block>{{ $t('vehicle_dashboard.change_driver_assignment') }}</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>
          <!-- Step 2 -->
          <v-stepper-content step="2" :complete="currentStep > 2">
            <v-form ref="step2" v-if="currentStep == 2">
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-row>
                      <!-- <header :class="$config.SUBHEADER_CLASS" v-t="'vehicle_dashboard.pickup_information'" /> -->
                      <v-col cols="12">
                        <v-text-field v-model="model.pickup_contact_name" v-bind="schema.pickup_contact_name" />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select v-model="model.pickup_address_type" v-bind="schema.pickup_address_type" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="model.pickup_address_1" v-bind="schema.pickup_address_1" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="model.pickup_address_2" v-bind="schema.pickup_address_2" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="model.pickup_city" v-bind="schema.pickup_city" />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="model.pickup_state_province" v-bind="schema.pickup_state_province" />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="model.pickup_postal_code" v-bind="schema.pickup_postal_code" />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-select v-model="model.pickup_phone_type" v-bind="schema.pickup_phone_type" />
                      </v-col>
                      <v-col cols="8">
                        <v-text-field v-model="model.pickup_phone" v-bind="schema.pickup_phone" />
                      </v-col>
                      <v-col cols="4">
                        <v-text-field v-model="model.pickup_phone_ext" v-bind="schema.pickup_phone_ext" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="model.pickup_contact_email" v-bind="schema.pickup_contact_email" />
                      </v-col>
                      <v-col cols="12">
                        <v-checkbox v-model="model.pickup_employee_terminated" v-bind="schema.pickup_employee_terminated" />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>
          <!-- Step 3 -->
          <v-stepper-content step="3" :complete="currentStep > 3">
            <v-form ref="step3" v-if="currentStep == 3">
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="model.delivery_contact_name" v-bind="schema.delivery_contact_name" />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select v-model="model.delivery_address_type" v-bind="schema.delivery_address_type" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="model.delivery_address_1" v-bind="schema.delivery_address_1" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="model.delivery_address_2" v-bind="schema.delivery_address_2" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="model.delivery_city" v-bind="schema.delivery_city" />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="model.delivery_state_province" v-bind="schema.delivery_state_province" />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="model.delivery_postal_code" v-bind="schema.delivery_postal_code" />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="model.delivery_phone_type" v-bind="schema.delivery_phone_type" />
                      </v-col>
                      <v-col cols="8">
                        <v-text-field v-model="model.delivery_phone" v-bind="schema.delivery_phone" />
                      </v-col>
                      <v-col cols="4">
                        <v-text-field v-model="model.delivery_phone_ext" v-bind="schema.delivery_phone_ext" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="model.delivery_contact_email" v-bind="schema.delivery_contact_email" />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>
          <!-- Step 4 -->
          <v-stepper-content step="4" :complete="currentStep > 4">
            <v-form ref="step4" v-if="currentStep == 4">
              <v-container>
                <v-row>
                  <!-- <header :class="$config.SUBHEADER_CLASS" v-t="'vehicle_dashboard.additional_services'" /> -->
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
              </v-container>
              <v-alert type="error" v-if="errorMessage" v-text="errorMessage" />
            </v-form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <!-- <v-alert type="info" class="mb-0">{{ `quote as param:` }} {{ quote }}</v-alert> -->
      <v-card-actions>
        <v-spacer />
        <v-btn v-if="currentStep > 1" @click.prevent="prevStep" text>{{ $t('common.back') }}</v-btn>
        <v-btn v-if="currentStep < 4" @click.prevent="nextStep" color="primary">{{ $t('common.next')}}</v-btn>
        <v-btn v-else @click.prevent="submitOrder">{{ $t('vehicle_dashboard.create_order') }}</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import moment from 'moment'
import { email, required } from 'vuelidate/lib/validators'
import { notInThePast, translateError } from '@/util/helpers'
export default {
  //components: { TranstorVehicle },
  props: ['vehicle','quote'],
  data: () => ({
    currentStep: 1,
    errorMessage: null,
    loading: false,
    delivery_modal: false,
    pickup_modal: false,
    

    steps: [
      {
        step: 1,
        key: 'transtor.authorization_detail',
        errors: null
      },
      {
        step: 2,
        key: 'transtor.pickup_information',
        errors: null
      },
      {
        step: 3,
        key: 'transtor.delivery_information',
        errors: null
      },
      {
        step: 4,
        key: 'transtor.additional_services',
        errors: null
      }
    ],

    model: {
      // authorization detail
      transport_method: '',
      transtor_type: 'transport',
      requested_pickup_date: null,
      requested_delivery_date: null,
      // pickup information
      pickup_contact_name: '',
      pickup_address_type: 'Residential',
      pickup_address_1: '',
      pickup_address_2: '',
      pickup_city: '',
      pickup_state_province: '',
      pickup_postal_code: '',
      pickup_phone_type: 'Home',
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
      delivery_phone_type: 'Home',
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
          label: this.$t('transtor.transtor_type'),
          errorMessages: this.transtorTypeErrors()
        },
        transport_method: {
          label: this.$t('transtor.transport_method'),
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
          items: this.phoneTypes(),
          itemText: 'key',
          itemValue: 'value',
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
          items: this.phoneTypes(),
          itemText: 'key',
          itemValue: 'value',
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
          outlined: true
        },
        special_instructions: {
          label: this.$t('vehicle_dashboard.special_instructions'),
          outlined: true
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
          value: 'Residential'
        },
        {
          key: this.$t('vehicle_dashboard.business'),
          name: 'Business',
          value: 'Business'
        }
      ]
    },
    phoneTypes() {
      return [
        {
          key: this.$t('vehicle_dashboard.home'),
          name: 'Home',
          value: 'Home'
        },
        {
          key: this.$t('vehicle_dashboard.cell'),
          name: 'Cell',
          value: 'Cell'
        },
        {
          key: this.$t('vehicle_dashboard.office'),
          name: 'Office',
          value: 'Office'
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
      !this.$v.model.pickup_address_type.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.address_type'))
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
      //!this.$v.model.pickup_address_2.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.address_2'))
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
      !this.$v.model.requested_delivery_date.notInThePast && errors.push(this.translateError('validation.not_past_date', 'dates.requested_delivery_date'))
      !this.$v.model.requested_delivery_date.notBeforePickup && errors.push(this.translateError('validation.not_before_pickup_date', 'dates.requested_delivery_date'))
      return errors
    },
    requestedPickupDateErrors() {
      const errors = []
      if (!this.$v.model.requested_pickup_date.$dirty) return errors
      !this.$v.model.requested_pickup_date.required && errors.push(this.translateError('validation.required', 'dates.requested_pickup_date'))
      !this.$v.model.requested_pickup_date.notInThePast && errors.push(this.translateError('validation.not_past_date', 'dates.requested_pickup_date'))
      return errors
    },
    transportMethodErrors() {
      const errors = []
      if (!this.$v.model.transport_method.$dirty) return errors
      !this.$v.model.transport_method.required && errors.push(this.translateError('validation.required', 'transtor.transport_method'))
      return errors
    },
    transtorTypeErrors() {
      const errors = []
      if (!this.$v.model.transtor_type.$dirty) return errors
      !this.$v.model.transtor_type.required && errors.push(this.translateError('validation.required', 'transtor.transtor_type'))
      return errors
    },
    deliveryContactNameErrors() {
      const errors = []
      if (!this.$v.model.delivery_contact_name.$dirty) return errors
      !this.$v.model.delivery_contact_name.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.contact_name'))
      return errors
    },
    deliveryAddressTypeErrors() {
      const errors = []
      if (!this.$v.model.delivery_address_type.$dirty) return errors
      !this.$v.model.delivery_address_type.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.address_type'))
      return errors
    },
    deliveryAddress1Errors() {
      const errors = []
      if (!this.$v.model.delivery_address_1.$dirty) return errors
      !this.$v.model.delivery_address_1.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.address_1'))
      return errors
    },
    deliveryAddress2Errors() {
      const errors = []
      if (!this.$v.model.delivery_address_2.$dirty) return errors
      //!this.$v.model.delivery_address_2.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.address_2'))
      return errors
    },
    deliveryCityErrors() {
      const errors = []
      if (!this.$v.model.delivery_city.$dirty) return errors
      !this.$v.model.delivery_city.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.city'))
      return errors
    },
    deliveryStateProvinceErrors() {
      const errors = []
      if (!this.$v.model.delivery_state_province.$dirty) return errors
      !this.$v.model.delivery_state_province.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.state_province'))
      return errors
    },
    deliveryPostalCodeErrors() {
      const errors = []
      if (!this.$v.model.delivery_postal_code.$dirty) return errors
      !this.$v.model.delivery_postal_code.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.postal_code'))
      return errors
    },
    deliveryPhoneTypeErrors() {
      const errors = []
      if (!this.$v.model.delivery_phone_type.$dirty) return errors
      !this.$v.model.delivery_phone_type.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.phone_type'))
      return errors
    },
    deliveryPhoneErrors() {
      const errors = []
      if (!this.$v.model.delivery_phone.$dirty) return errors
      !this.$v.model.delivery_phone.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.phone'))
      return errors
    },
    deliveryPhoneExtErrors() {
      const errors = []
      if (!this.$v.model.delivery_phone_ext.$dirty) return errors
      !this.$v.model.delivery_phone_ext.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.phone_ext'))
      return errors
    },
    deliveryContactEmailErrors() {
      const errors = []
      if (!this.$v.model.delivery_contact_email.$dirty) return errors
      !this.$v.model.delivery_contact_email.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.email'))
      !this.$v.model.delivery_contact_email.email && errors.push(this.translateError('validation.invalid', 'vehicle_dashboard.email'))
      return errors
    },
    changeDriverAssignment() {
      alert('todo: change driver assignment')
    },
    // stepErrors(n) {
    //   if (this.currentStep !== n)
    //     return false
    //   let step = `step${n}`
    //   this.$v[step].$touch()
    //   return !this.$v[step].$invalid
    // },
    prevStep() {
      let step = `step${this.currentStep}`
      this.$v[step].$reset();
      this.steps[this.currentStep - 1].errors = null
      this.currentStep--;
    },
    nextStep() {
      //console.log(`currentStep: ${this.currentStep}`)
      let step = `step${this.currentStep}`
      // trigger validations for step
      this.$v[step].$touch()
      if (this.$v[step].$invalid) {
        this.errorMessage = `Fix step ${this.currentStep} errors`
        this.steps[this.currentStep-1].errors = `STEP ${this.currentStep} ERRORS!`
        this.loading = false
        return false
      }
      //clear errors and advance step
      this.steps[this.currentStep-1].errors = null
      this.errorMessage = null
      this.currentStep++;
    },
    submitOrder() {
      //console.log('on submit')
      
      //trigger validations
      this.$v.$touch()
      //debugger
      if (this.$v.$invalid) {
        this.errorMessage = 'fix validation errors!'
        this.loading = false
        return false
      }
      //console.log('Order Model on submit:')
      //console.log(this.model)
      let url = '/test/post'
      this.$http
        .post(url, this.model)
        .then(response => {
          //console.log(response)
          this.order = response.data
          this.errorMessage = null
          this.loading = false
        })
        .catch(error => {
          //console.error(error)
          this.errorMessage = error.response.data.error
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  validations: {
    model: {
      //step 1
      transport_method: { required },
      transtor_type: { required },
      requested_pickup_date: { 
        required,
        notInThePast
      },
      requested_delivery_date: {
        required,
        notInThePast,
        notBeforePickup: function(value) {
          return moment(value).isSameOrAfter(this.model.requested_pickup_date)
        }
      },
      // step2: pickup information
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
      delivery_phone_ext: {},
      delivery_contact_email: { email, required },
      // additional services
      approve_auto_detail: {},
      approve_oil_change: {},
      other_services: {},
      special_instructions: {}
    },
    //group validations into steps for stepper validation
    step1: [
      'model.transport_method',
      'model.transtor_type',
      'model.requested_pickup_date',
      'model.requested_delivery_date'
    ],
    step2: [
      'model.pickup_contact_name',
      'model.pickup_address_type',
      'model.pickup_address_1',
      'model.pickup_address_2',
      'model.pickup_city',
      'model.pickup_state_province',
      'model.pickup_postal_code',
      'model.pickup_phone_type',
      'model.pickup_phone',
      'model.pickup_phone_ext',
      'model.pickup_contact_email',
      'model.pickup_employee_terminated'
    ],
    step3: [
      'model.delivery_contact_name',
      'model.delivery_address_type',
      'model.delivery_address_1',
      'model.delivery_address_2',
      'model.delivery_city',
      'model.delivery_state_province',
      'model.delivery_postal_code',
      'model.delivery_phone_type',
      'model.delivery_phone',
      'model.delivery_phone_ext',
      'model.delivery_contact_email'
    ],
    step4: [
      'model.approve_auto_detail',
      'model.approve_oil_change',
      'model.other_services',
      'model.special_instructions'
    ]
  },
  created() {
    //console.log(`props: `)
    //console.log(this.$props)
    if (this.$props.quote) {
      //console.log('setting model to quote passed as prop')
      //debugger
      this.model = { ...this.model, ...this.$props.quote }
    }
  }
}
</script>

<style>
.v-stepper .v-stepper__step--active .v-stepper__label {
  text-shadow: none !important;
}
</style>