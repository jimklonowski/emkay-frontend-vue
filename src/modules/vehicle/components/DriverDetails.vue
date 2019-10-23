<template>
  <article>
    <v-card :loading="loading">
      <v-toolbar :color="toolbarColor" :class="$config.TOOLBAR_CLASS" dark>
        <toolbar-title v-bind="title" :subtitle="vehicle" />
        <v-spacer />
        <toolbar-menu :actions="actions" />
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-container>
          <v-row>
            <!-- Driver Information -->
            <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.driver_information') }}</header>
            <field-with-loader :model="model.last_name" :schema="schema.last_name" />
            <field-with-loader :model="model.first_name" :schema="schema.first_name" />
            <field-with-loader :model="model.employee_id" :schema="schema.employee_id" />
            <field-with-loader :model="model.selector_level" :schema="schema.selector_level" />
            <field-with-loader :model="model.license_number" :schema="schema.license_number" />
            <field-with-loader :model="model.license_state" :schema="schema.license_state" />
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-row>
                <!-- Contact Information -->
                <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.contact_information') }}</header>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6">
              <v-row>
                <!-- Customization -->
                <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.customization') }}</header>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions />
    </v-card>
  </article>
</template>

<script>
import ApiService from '@/services/api.service'
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
    isInitializing: false,
    isEditing: false,
    loading: false,
    title: {
      key1: 'vehicle_dashboard.driver',
      key2: 'vehicle_dashboard.details',
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
  computed: {
    // need to use computed property to store schema because i18n translations need to be computed
    schema() {
      return {
        // Driver Information
        last_name: {
          label: this.$t('vehicle_dashboard.last_name'),
          type: 'text',
          isEditing: this.isEditing,
          isInitializing: this.isInitializing,
          cols: 12,
          sm: 6,
          disabled: true,
          outlined: true,
          dense: true
        },
        first_name: {
          label: this.$t('vehicle_dashboard.first_name'),
          type: 'text',
          isEditing: this.isEditing,
          isInitializing: this.isInitializing,
          cols: 12,
          sm: 6,
          disabled: true,
          outlined: true,
          dense: true
        },
        employee_id: {
          label: this.$t('vehicle_dashboard.employee_id'),
          type: 'text',
          isEditing: this.isEditing,
          isInitializing: this.isInitializing,
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
          isEditing: this.isEditing,
          isInitializing: this.isInitializing,
          cols: 12,
          sm: 6,
          disabled: true,
          outlined: true,
          dense: true
        },
        license_number: {
          label: this.$t('vehicle_dashboard.license_number'),
          type: 'text',
          isEditing: this.isEditing,
          isInitializing: this.isInitializing,
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
          isEditing: this.isEditing,
          isInitializing: this.isInitializing,
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
          errorMessages: this.address1Errors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        address_2: {
          label: this.$t('vehicle_dashboard.address_2'),
          type: 'text',
          errorMessages: this.address2Errors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        city: {
          label: this.$t('vehicle_dashboard.city'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        state_province: {
          label: this.$t('vehicle_dashboard.state_province'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        county: {
          label: this.$t('vehicle_dashboard.county'),
          type: 'text',
          disabled: true,
          outlined: true,
          dense: true
        },
        postal_code: {
          label: this.$t('vehicle_dashboard.postal_code'),
          type: 'text',
          clearable: true,
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
          errorMessages: this.emailErrors(),
          errorCount: 1,
          outlined: true,
          dense: true
        },
        phone: {
          label: this.$t('vehicle_dashboard.phone'),
          type: 'tel',
          errorMessages: this.phoneErrors(),
          mask: '(###) ###-####',
          outlined: true,
          dense: true
        },
        cell: {
          label: this.$t('vehicle_dashboard.cell'),
          type: 'tel',
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
          counter: 40,
          errorMessages: this.driverUse1Errors(),
          outlined: true,
          dense: true
        },
        driver_use_2: {
          //label: this.$t('vehicle_dashboard.driver_use_2'),
          label: this.getLabel('driver_use_label_2'),
          type: 'text',
          counter: 40,
          errorMessages: this.driverUse2Errors(),
          outlined: true,
          dense: true
        },
        driver_use_3: {
          //label: this.$t('vehicle_dashboard.driver_use_3'),
          label: this.getLabel('driver_use_label_3'),
          type: 'text',
          counter: 40,
          errorMessages: this.driverUse3Errors(),
          outlined: true,
          dense: true
        },
        driver_use_4: {
          //label: this.$t('vehicle_dashboard.driver_use_4'),
          label: this.getLabel('driver_use_label_4'),
          type: 'text',
          counter: 40,
          errorMessages: this.driverUse4Errors(),
          outlined: true,
          dense: true
        }
      }
    },
    toolbarColor() {
      return this.errorMessage ? 'error' : 'primary'
    }
  },
  async created() {
    // populate the panel
    this.isInitializing = true
    this.loading = true
    ApiService.get('/driver-details', this.vehicle)
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
    // validators
    employeeIdErrors() {
      const errors = []
      if (!this.$v.model.employee_id.$dirty) return errors
      !this.$v.model.employee_id.required && errors.push(this.translateError('validation.required', 'vehicle_dashboard.employee_id'))
      !this.$v.model.employee_id.isLength && errors.push(this.translateError('validation.length', 9))
      return errors
    },
    licenseNumberErrors() {},
    address1Errors() {},
    address2Errors() {},
    postalCodeErrors() {},
    emailErrors() {},
    phoneErrors() {},
    cellErrors() {},
    driverUse1Errors() {},
    driverUse2Errors() {},
    driverUse3Errors() {},
    driverUse4Errors() {},

    // Load/Show Action Modals
    async showAddDriverForm(){
      let componentProps = { width: 1000, elevation: 6 }
      let modalProps = { width: 1000, height: 'auto' }
      const form = await import(/* webpackChunkName: 'addDriver' */ '@/modules/vehicle/components/modals/AddDriver')
      this.$modal.show(form.default, componentProps, modalProps)
    },
    async showEditCustomLabelsForm() {
      let componentProps = { width: 1000, elevation: 6 }
      let modalProps = { width: 1000, height: 'auto' }
      const form = await import(/* webpackChunkName: 'customLabels' */ '@/modules/vehicle/components/modals/EditCustomLabels')
      this.$modal.show(form.default, componentProps, modalProps)
    },
    async showEditDriverForm() {
      let componentProps = { width: 1000, elevation: 6 }
      let modalProps = { width: 1000, height: 'auto' }
      const form = await import(/* webpackChunkName: 'addDriver' */ '@/modules/vehicle/components/modals/EditDriver')
      this.$modal.show(form.default, componentProps, modalProps)
    },
    async showReassignDriverForm() {
      let componentProps = { width: 1000, elevation: 6 }
      let modalProps = { width: 1000, height: 'auto' }
      const form = await import(/* webpackChunkName: 'addDriver' */ '@/modules/vehicle/components/modals/ReassignDriver')
      this.$modal.show(form.default, componentProps, modalProps)
    },
    toggleEdit() {
      this.isEditing = !this.isEditing
      this.menu = false
      this.errorMessage = null
    },
    onSubmit() {
      alert('submit')
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