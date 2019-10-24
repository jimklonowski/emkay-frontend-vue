<template>
  <article>
    <v-card :loading="loading">
      <v-form ref="form" @submit.prevent="onSubmit">
        <v-toolbar :color="toolbarColor" :class="$config.TOOLBAR_CLASS" dark>
          <toolbar-title v-bind="title" />
          <v-spacer />
          <toolbar-menu :actions="actions" />
        </v-toolbar>
        <v-alert v-if="errorMessage" class="mb-0" type="error" dense tile>{{ errorMessage }}</v-alert>
        <v-card-text class="pa-0">
          <v-container class="py-0">
            <v-row>
              <!-- Driver Information -->
              <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.driver_information') }}</header>
              <field-with-loader :model.sync="model.last_name" :schema="schema.last_name" :status="status" />
              <field-with-loader :model.sync="model.first_name" :schema="schema.first_name" :status="status" />
              <field-with-loader :model.sync="model.employee_id" :schema="schema.employee_id" :status="status" @update="updateModel('employee_id', $event)" />
              <field-with-loader :model.sync="model.selector_level" :schema="schema.selector_level" :status="status" />
              <field-with-loader :model.sync="model.license_number" :schema="schema.license_number" :status="status" @update="updateModel('license_number', $event)" />
              <field-with-loader :model.sync="model.license_state" :schema="schema.license_state" :status="status" />
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-row>
                  <!-- Contact Information -->
                  <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.contact_information') }}</header>
                  <field-with-loader :model.sync="model.address_1" :schema="schema.address_1" :status="status" @update="updateModel('address_1', $event)" />
                  <field-with-loader :model.sync="model.address_2" :schema="schema.address_2" :status="status" @update="updateModel('address_2', $event)" />
                  <field-with-loader :model.sync="model.city" :schema="schema.city" :status="status" />
                  <field-with-loader :model.sync="model.state_province" :schema="schema.state_province" :status="status" />
                  <field-with-loader :model.sync="model.county" :schema="schema.county" :status="status" />
                  <field-with-loader :model.sync="model.postal_code" :schema="schema.postal_code" :status="status" @update="updateModel('postal_code', $event)" />
                  <field-with-loader :model.sync="model.phone" :schema="schema.phone" :status="status" @update="updateModel('phone', $event)" />
                  <field-with-loader :model.sync="model.cell" :schema="schema.cell" :status="status" @update="updateModel('cell', $event)" />
                  <field-with-loader :model.sync="model.email" :schema="schema.email" :status="status" @update="updateModel('email', $event)" />
                </v-row>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row>
                  <!-- Customization -->
                  <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.customization') }}</header>
                  <field-with-loader :model.sync="model.driver_use_1" :schema="schema.driver_use_1" :status="status" @update="updateModel('driver_use_1', $event)" />
                  <field-with-loader :model.sync="model.driver_use_2" :schema="schema.driver_use_2" :status="status" @update="updateModel('driver_use_2', $event)" />
                  <field-with-loader :model.sync="model.driver_use_3" :schema="schema.driver_use_3" :status="status" @update="updateModel('driver_use_3', $event)" />
                  <field-with-loader :model.sync="model.driver_use_4" :schema="schema.driver_use_4" :status="status" @update="updateModel('driver_use_4', $event)" />
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions v-if="isEditing">
          <v-spacer />
          <v-btn
            v-t="'common.cancel'"
            type="button"
            color="error"
            :ripple="false"
            text
            @click.prevent="cancelEdit"
          />
          <v-btn
            v-t="'common.save_changes'"
            type="submit"
            color="primary"
            :ripple="false"
            depressed
            tile
          >
            <v-icon dark v-text="'save'" />
            {{ $t('common.save_changes') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </article>
</template>

<script>
//import ApiService from '@/services/api.service'
import { isLength, translateError } from '@/util/helpers'
import { email, maxLength, required } from 'vuelidate/lib/validators'

import FieldWithLoader from '@/modules/core/components/FieldWithLoader'
import ToolbarMenu from '@/modules/core/components/ToolbarMenu'
import ToolbarTitle from '@/modules/core/components/ToolbarTitle'

export default {
  components: {
    ToolbarMenu,
    ToolbarTitle,
    FieldWithLoader
  },
  data: self => ({
    errorMessage: null,
    isInitializing: false,
    hasPostalCodeError: false,
    isEditing: false,
    loading: false,
    loadingPostalCode: false,
    title: {
      key1: 'vehicle_dashboard.driver',
      key2: 'vehicle_dashboard.details',
      subtitle: self.vehicle
    },
    actions: [
      {
        key: 'vehicle_dashboard.edit_driver',
        icon: 'edit',
        action: () => self.toggleEdit(),
        divider: true
      },
      {
        key: 'vehicle_dashboard.edit_custom_labels',
        icon: 'label_important',
        action: () => self.showEditCustomLabelsForm()
      },
      {
        key: 'vehicle_dashboard.reassign_driver',
        icon: 'assignment_ind',
        action: () => self.showReassignDriverForm()
      },
      {
        key: 'vehicle_dashboard.add_new_driver',
        icon: 'person_add',
        action: () => self.showAddDriverForm()
      }
    ],
    model: {
      // Driver Information
      last_name: '',
      first_name: '',
      employee_id: '',
      license_state: '',
      license_number: '',
      selector_level: '',
      // Contact Information
      address_1: '',
      address_2: '',
      postal_code: '',
      city: '',
      state_province: '',
      county: '',
      email: '',
      phone: '',
      cell: '',
      // Customization
      driver_use_label_1: '',
      driver_use_1: '',
      driver_use_label_2: '',
      driver_use_2: '',
      driver_use_label_3: '',
      driver_use_3: '',
      driver_use_label_4: '',
      driver_use_4: ''
    }
  }),
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  watch: {
    // watch zip code for changes and request city/state/province/county from backend
    'model.postal_code': function(newValue, oldValue) {
      if (this.isInitializing) return
      else if (!this.isEditing) return
      else if (oldValue === newValue) return
      else if (!newValue) {
        // newValue is empty, so also clear the city/state/county
        this.model.city = ''
        this.model.state_province = ''
        this.model.county = ''
        this.errorMessage = null
        return
      } else {
        //import ApiService instead of using axios directly and call ApiService.get(url, newValue)
        let url = `/postalcode/${newValue}`

        if (newValue.length >= 5 && newValue.length <= 6) {
          //debugger
          this.loadingPostalCode = true
          this.$http
            .get(url)
            .then(response => {
              this.model = { ...this.model, ...response.data }
              this.hasPostalCodeError = false
            })
            .catch(err => {
              this.hasPostalCodeError = true
              this.errorMessage = err.message
            })
            .finally(() => {
              this.loadingPostalCode = false
            })
        }
      }
    }
  },
  computed: {
    status() {
      return { isEditing: this.isEditing, isInitializing: this.isInitializing }
    },
    // need to use computed property to store schema because i18n translations need to be computed
    schema() {
      return {
        // Driver Information
        last_name: {
          label: this.$t('vehicle_dashboard.last_name'),
          type: 'text',
          cols: 12,
          sm: 6,
          disabled: true,
          outlined: true,
          dense: true
        },
        first_name: {
          label: this.$t('vehicle_dashboard.first_name'),
          type: 'text',
          cols: 12,
          sm: 6,
          disabled: true,
          outlined: true,
          dense: true
        },
        employee_id: {
          label: this.$t('vehicle_dashboard.employee_id'),
          type: 'text',
          cols: 12,
          sm: 6,
          counter: 9,
          //['error-messages']: this.employeeIdErrors(), // okay syntax!
          errorMessages: this.employeeIdErrors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        selector_level: {
          label: this.$t('vehicle_dashboard.selector_level'),
          type: 'text',
          cols: 12,
          sm: 6,
          disabled: true,
          outlined: true,
          dense: true
        },
        license_number: {
          label: this.$t('vehicle_dashboard.license_number'),
          type: 'text',
          cols: 12,
          sm: 6,
          counter: 20,
          errorMessages: this.licenseNumberErrors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        license_state: {
          label: this.$t('vehicle_dashboard.license_state'),
          type: 'text',
          cols: 12,
          sm: 6,
          disabled: true,
          outlined: true,
          dense: true
        },
        // Contact Information
        address_1: {
          label: this.$t('vehicle_dashboard.address_1'),
          type: 'text',
          cols: 12,
          errorMessages: this.address1Errors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        address_2: {
          label: this.$t('vehicle_dashboard.address_2'),
          type: 'text',
          cols: 12,
          errorMessages: this.address2Errors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        city: {
          label: this.$t('vehicle_dashboard.city'),
          type: 'text',
          cols: 12,
          disabled: true,
          outlined: true,
          dense: true
        },
        state_province: {
          label: this.$t('vehicle_dashboard.state_province'),
          type: 'text',
          cols: 12,
          sm: 4,
          disabled: true,
          outlined: true,
          dense: true
        },
        county: {
          label: this.$t('vehicle_dashboard.county'),
          type: 'text',
          cols: 12,
          sm: 8,
          disabled: true,
          outlined: true,
          dense: true
        },
        postal_code: {
          label: this.$t('vehicle_dashboard.postal_code'),
          type: 'text',
          clearable: true,
          cols: 12,
          error: this.hasPostalCodeError,
          loading: this.loadingPostalCode,
          errorMessages: this.postalCodeErrors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        email: {
          label: this.$t('vehicle_dashboard.email'),
          type: 'email',
          cols: 12,
          errorMessages: this.emailErrors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        phone: {
          label: this.$t('vehicle_dashboard.phone'),
          type: 'tel',
          cols: 12,
          sm: 6,
          errorMessages: this.phoneErrors(),
          mask: '(###) ###-####',
          outlined: true,
          dense: true
        },
        cell: {
          label: this.$t('vehicle_dashboard.cell'),
          type: 'tel',
          cols: 12,
          sm: 6,
          mask: '(###) ###-####',
          errorMessages: this.cellErrors(),
          outlined: true,
          dense: true
        },
        // Customization
        driver_use_1: {
          //label: this.$t('vehicle_dashboard.driver_use_1'),
          label: this.getLabel('driver_use_label_1'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.driverUse1Errors(),
          outlined: true,
          dense: true
        },
        driver_use_2: {
          //label: this.$t('vehicle_dashboard.driver_use_2'),
          label: this.getLabel('driver_use_label_2'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.driverUse2Errors(),
          outlined: true,
          dense: true
        },
        driver_use_3: {
          //label: this.$t('vehicle_dashboard.driver_use_3'),
          label: this.getLabel('driver_use_label_3'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.driverUse3Errors(),
          outlined: true,
          dense: true
        },
        driver_use_4: {
          //label: this.$t('vehicle_dashboard.driver_use_4'),
          label: this.getLabel('driver_use_label_4'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.driverUse4Errors(),
          outlined: true,
          dense: true
        }
      }
    },
    toolbarColor() {
      return this.errorMessage ? 'error darken-2' : 'primary'
    }
  },
  async created() {
    let url = `/driver-details/${this.vehicle}`
    // populate the panel
    this.isInitializing = true
    this.loading = true
    this.$http
      .get(url)
      .then(response => {
        // populate model
        this.model = response.data
        // save copy of original model in case of cancel edit
        this.originalModel = { ...this.model }
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.isInitializing = false
        this.loading = false
      })
  },
  methods: {
    translateError,
    getLabel(key) {
      // if there's a custom label already set, fetch it from the model and display it.
      if (Object.prototype.hasOwnProperty.call(this.model, key) && !!this.model[key]) return this.model[key]
      // otherwise, return the default i18n translation of 'vehicle_dashboard.custom_use_N_label'
      return this.$t(`vehicle_dashboard.${key}`)
    },
    updateModel(field, value) {
      this.model[field] = value
      this.$v.model[field].$touch()
    },
    // validators
    employeeIdErrors() {
      const errors = []
      if (!this.$v.model.employee_id.$dirty) return errors
      !this.$v.model.employee_id.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.employee_id'))
      !this.$v.model.employee_id.isLength && errors.push(this.translateError('validation.length', 9))
      return errors
    },
    licenseNumberErrors() {
      const errors = []
      if (!this.$v.model.license_number.$dirty) return errors
      !this.$v.model.license_number.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.license_number'))
      !this.$v.model.license_number.isLength && errors.push(this.translateError('validation.length', 20))
      return errors
    },
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
    },
    driverUse1Errors() {
      const errors = []
      if (!this.$v.model.driver_use_1.$dirty) return errors
      !this.$v.model.driver_use_1.maxLength && errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    driverUse2Errors() {
      const errors = []
      if (!this.$v.model.driver_use_2.$dirty) return errors
      !this.$v.model.driver_use_2.maxLength && errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    driverUse3Errors() {
      const errors = []
      if (!this.$v.model.driver_use_3.$dirty) return errors
      !this.$v.model.driver_use_3.maxLength && errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    driverUse4Errors() {
      const errors = []
      if (!this.$v.model.driver_use_4.$dirty) return errors
      !this.$v.model.driver_use_4.maxLength && errors.push(this.translateError('validation.max_length', 40))
      return errors
    },

    // Load/Show Action Modals
    async showAddDriverForm(){
      let componentProps = { width: 1000, elevation: 6 }
      let modalProps = { width: 1000, height: 'auto' }
      const form = await import(/* webpackChunkName: 'addDriver' */ '@/modules/vehicle/components/modals/AddDriver')
      this.$modal.show(form.default, componentProps, modalProps)
    },
    async showEditCustomLabelsForm() {
      let componentProps = { width: 1000, elevation: 6 }
      let modalProps = { width: 1000, height: 'auto', delay: 0, clickToClose: false, draggable: false }
      const form = await import(/* webpackChunkName: 'customLabels' */ '@/modules/vehicle/components/modals/EditCustomLabels')
      this.$modal.show(form.default, componentProps, modalProps)
    },
    async showReassignDriverForm() {
      let componentProps = { width: 1000, elevation: 6 }
      let modalProps = { width: 1000, height: 'auto' }
      const form = await import(/* webpackChunkName: 'reassignDriver' */ '@/modules/vehicle/components/modals/ReassignDriver')
      this.$modal.show(form.default, componentProps, modalProps)
    },
    cancelEdit() {
      this.isEditing = !this.isEditing
      this.errorMessage = null
      // restore the original model if we want to cancel the edit
      Object.assign(this.model, this.originalModel)
    },
    toggleEdit() {
      this.isEditing = !this.isEditing
      this.menu = false
      this.errorMessage = null
    },
    onSubmit() {
      this.errorMessage = null
      this.loading = true
      const url = '/test/post'

      // Trigger validations
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = 'Fix validation errors'
        this.loading = false
        return false
      }

      this.$http
        .post(url, this.model)
        .then(result => {
          console.log(`successful result ${result}`)
          this.errorMessage = null
          this.originalModel = this.model
        })
        .catch(error => {
          console.log(error.response)
          this.errorMessage = error.response.data.error || error.response.statusText
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  validations: {
    model: {
      // Driver Information
      last_name: { required },
      first_name: { required },
      employee_id: { required, isLength: isLength(9) },
      selector_level: { required },
      license_number: { required, isLength: isLength(20) },
      license_state: { required },
      // Contact Information
      address_1: { required, maxLength: maxLength(30) },
      address_2: { maxLength: maxLength(30) },
      city: { required },
      county: {},
      state_province: { required },
      postal_code: { required /*,maxLength: maxLength(10)*/ },
      email: { required, email },
      phone: {},
      cell: {},
      // Customization
      driver_use_1: { maxLength: maxLength(40) },
      driver_use_2: { maxLength: maxLength(40) },
      driver_use_3: { maxLength: maxLength(40) },
      driver_use_4: { maxLength: maxLength(40) }
    }
  }
}
</script>

<style>

</style> 