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
              <!-- Account Information -->
              <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.account_information') }}</header>
              <field-with-loader :model.sync="model.account" :schema="schema.account" :status="status" />
              <field-with-loader :model.sync="model.center_description" :schema="schema.center_description" :status="status" />
              <field-with-loader :model.sync="model.billing_sort" :schema="schema.billing_sort" :status="status" />
              <field-with-loader :model.sync="model.center" :schema="schema.center" :status="status" />
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-row>
                  <!-- Vehicle Information -->
                  <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.vehicle_information') }}</header>
                  <field-with-loader :model.sync="model.year" :schema="schema.year" :status="status" />
                  <field-with-loader :model.sync="model.make" :schema="schema.make" :status="status" />
                  <field-with-loader :model.sync="model.model" :schema="schema.model" :status="status" />
                  <field-with-loader :model.sync="model.vin" :schema="schema.vin" :status="status" />
                  <field-with-loader :model.sync="model.vehicle_number" :schema="schema.vehicle_number" :status="status" />
                  <field-with-loader :model.sync="model.client_vehicle_number" :schema="schema.client_vehicle_number" :status="status" />
                </v-row>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row>
                  <!-- Customization -->
                  <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.customization') }}</header>
                  <field-with-loader :model.sync="model.client_use_1" :schema="schema.client_use_1" :status="status" @update="updateModel('client_use_1', $event)" />
                  <field-with-loader :model.sync="model.client_use_2" :schema="schema.client_use_2" :status="status" @update="updateModel('client_use_2', $event)" />
                  <field-with-loader :model.sync="model.client_use_3" :schema="schema.client_use_3" :status="status" @update="updateModel('client_use_3', $event)" />
                  <field-with-loader :model.sync="model.client_use_4" :schema="schema.client_use_4" :status="status" @update="updateModel('client_use_4', $event)" />
                  <field-with-loader :model.sync="model.client_use_5" :schema="schema.client_use_5" :status="status" @update="updateModel('client_use_5', $event)" />
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
import ApiService from '@/services/api.service'
import { isLength, translateError } from '@/util/helpers'
import { maxLength, required } from 'vuelidate/lib/validators'
import FieldWithLoader from '@/modules/core/components/FieldWithLoader'
import ToolbarMenu from '@/modules/core/components/ToolbarMenu'
import ToolbarTitle from '@/modules/core/components/ToolbarTitle'

export default {
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  components: {
    ToolbarMenu,
    ToolbarTitle,
    FieldWithLoader
  },
  data: self => ({
    errorMessage: null,
    isInitializing: false,
    isEditing: false,
    loading: false,
    menu: false,
    title: {
      key1: 'vehicle_dashboard.vehicle',
      key2: 'vehicle_dashboard.details',
      subtitle: self.vehicle
    },
    actions: [
      {
        key: 'vehicle_dashboard.edit_vehicle',
        icon: 'edit',
        action: () => self.toggleEdit(),
        divider: true
      },
      {
        key: 'vehicle_dashboard.order_status',
        icon: 'av_timer',
        action: () => self.showOrderStatus()
        //component: () => import('@/modules/vehicle/components/Details/OrderStatus'),
      },
      {
        key: 'vehicle_dashboard.edit_custom_labels',
        icon: 'label_important',
        action: () => self.showEditCustomLabelsForm(),
        //component: () => import('@/modules/vehicle/components/Forms/EditCustomLabels')
      },
      {
        key: 'vehicle_dashboard.schedule_ac',
        icon: 'schedule',
        action: () => alert('A/C click')
      },
      {
        key: 'vehicle_dashboard.report_expenses',
        icon: 'assessment',
        action: () => alert('Report Expenses')
      },
      {
        key: 'vehicle_dashboard.used_vehicle_quote',
        icon: 'local_atm',
        action: () => alert('Used Quote')
      },
      {
        key: 'vehicle_dashboard.terminate_vehicle',
        icon: 'cancel_presentation',
        action: () => alert('Terminate Vehicle')
      }
    ],
    model: {
      // Account Information
      account: '',
      billing_sort: '',
      center: '',
      center_description: '',
      // Vehicle Information
      year: '',
      make: '',
      model: '',
      vin: '',
      vehicle_number: '',
      client_vehicle_number: '',
      // Customization
      client_use_label_1: '',
      client_use_1: '',
      client_use_label_2: '',
      client_use_2: '',
      client_use_label_3: '',
      client_use_3: '',
      client_use_label_4: '',
      client_use_4: '',
      client_use_label_5: '',
      client_use_5: ''
    }
  }),
  computed: {
    status() {
      return { isEditing: this.isEditing, isInitializing: this.isInitializing }
    },
    schema() {
      return {
        // Account Information
        account: {
          label: this.$t('auth.account'),
          type: 'text',
          cols: 12,
          sm: 6,
          disabled: true,
          outlined: true,
          dense: true
        },
        billing_sort: {
          label: this.$t('vehicle_dashboard.billing_sort'),
          type: 'text',
          cols: 12,
          sm: 6,
          outlined: true,
          dense: true
        },
        center: {
          label: this.$t('vehicle_dashboard.center'),
          type: 'text',
          cols: 12,
          sm: 6,
          outlined: true,
          dense: true
        },
        center_description: {
          label: this.$t('vehicle_dashboard.center_description'),
          type: 'text',
          cols: 12,
          sm: 6,
          disabled: true,
          outlined: true,
          dense: true
        },
        // Vehicle Information
        year: {
          label: this.$t('vehicle_dashboard.year'),
          type: 'text',
          cols: 12,
          sm: 6,
          disabled: true,
          outlined: true,
          dense: true
        },
        make: {
          label: this.$t('vehicle_dashboard.make'),
          type: 'text',
          cols: 12,
          sm: 6,
          disabled: true,
          outlined: true,
          dense: true
        },
        model: {
          label: this.$t('vehicle_dashboard.model'),
          type: 'text',
          cols: 12,
          disabled: true,
          outlined: true,
          dense: true
        },
        vin: {
          label: this.$t('vehicle_dashboard.vin'),
          type: 'text',
          cols: 12,
          outlined: true,
          dense: true
        },
        vehicle_number: {
          label: this.$t('vehicle_dashboard.vehicle_number'),
          type: 'text',
          cols: 12,
          outlined: true,
          disabled: true,
          dense: true
        },
        client_vehicle_number: {
          label: this.$t('vehicle_dashboard.client_vehicle_number'),
          type: 'text',
          cols: 12,
          outlined: true,
          dense: true
        },
        // Customization
        client_use_1: {
          //label: this.$t('vehicle_dashboard.client_use_1'),
          label: this.getLabel('client_use_label_1'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.clientUse1Errors(),
          outlined: true,
          dense: true
        },
        // client_use_label_1: {
        //   label: this.$t('vehicle_dashboard.client_use_label_1'),
        //   type: 'text',
        //   outlined: true,
        //   dense: true
        // },
        client_use_2: {
          //label: this.$t('vehicle_dashboard.client_use_2'),
          label: this.getLabel('client_use_label_2'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.clientUse2Errors(),
          outlined: true,
          dense: true
        },
        // client_use_label_2: {
        //   label: this.$t('vehicle_dashboard.client_use_label_2'),
        //   type: 'text',
        //   outlined: true,
        //   dense: true
        // },
        client_use_3: {
          //label: this.$t('vehicle_dashboard.client_use_3'),
          label: this.getLabel('client_use_label_3'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.clientUse3Errors(),
          outlined: true,
          dense: true
        },
        // client_use_label_3: {
        //   label: this.$t('vehicle_dashboard.client_use_label_3'),
        //   type: 'text',
        //   outlined: true,
        //   dense: true
        // },
        client_use_4: {
          //label: this.$t('vehicle_dashboard.client_use_4'),
          label: this.getLabel('client_use_label_4'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.clientUse4Errors(),
          outlined: true,
          dense: true
        },
        // client_use_label_4: {
        //   label: this.$t('vehicle_dashboard.client_use_label_4'),
        //   type: 'text',
        //   outlined: true,
        //   dense: true
        // },
        client_use_5: {
          //label: this.$t('vehicle_dashboard.client_use_5'),
          label: this.getLabel('client_use_label_5'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.clientUse5Errors(),
          outlined: true,
          dense: true
        },
        // client_use_label_5: {
        //   label: this.$t('vehicle_dashboard.client_use_label_5'),
        //   type: 'text',
        //   outlined: true,
        //   dense: true
        // }
      }
    },
    toolbarColor() {
      return this.errorMessage ? 'error darken-2' : 'primary'
    }
  },
  async created() {
    let url = `/vehicle-details/${this.vehicle}`
    // populate the panel
    this.isInitializing = true
    this.loading = true
    //ApiService.get('/vehicle-details', this.vehicle)
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
    // tedious validators,
    clientUse1Errors() {
      const errors = []
      if (!this.$v.model.client_use_1.$dirty) return errors
      !this.$v.model.client_use_1.maxLength &&
        errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    clientUse2Errors() {
      const errors = []
      if (!this.$v.model.client_use_2.$dirty) return errors
      !this.$v.model.client_use_2.maxLength &&
        errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    clientUse3Errors() {
      const errors = []
      if (!this.$v.model.client_use_3.$dirty) return errors
      !this.$v.model.client_use_3.maxLength &&
        errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    clientUse4Errors() {
      const errors = []
      if (!this.$v.model.client_use_4.$dirty) return errors
      !this.$v.model.client_use_4.maxLength &&
        errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    clientUse5Errors() {
      const errors = []
      if (!this.$v.model.client_use_5.$dirty) return errors
      !this.$v.model.client_use_5.maxLength &&
        errors.push(this.translateError('validation.max_length', 40))
      return errors
    },

    // Load/Show Action Modals
    async showEditCustomLabelsForm() {
      let componentProps = { width: 1000, elevation: 6 }
      let modalProps = { width: 1000, height: 'auto', delay: 0, clickToClose: false, draggable: false }
      const form = await import(/* webpackChunkName: 'customLabels' */ '@/modules/vehicle/components/modals/EditCustomLabels')
      this.$modal.show(form.default, componentProps, modalProps)
    },
    async showOrderStatus() {
      let componentProps = { width: 1000, elevation: 6 }
      let modalProps = { width: 1000, height: 600, delay: 0, clickToClose: true, draggable: false, scrollable: true }
      const form = await import(/* webpackChunkName: 'orderStatus' */ '@/modules/vehicle/components/modals/OrderStatus')
      this.$modal.show(form.default, componentProps, modalProps)
    },
    //...
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

      ApiService
        .post(url, this.model)
        .then(() => {
          //console.log(`successful result ${result}`)
          this.errorMessage = null
          this.originalModel = this.model
        })
        .catch(error => {
          //console.log(error.response)
          this.errorMessage = error.response.data.error
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  validations: {
    model: {
      // Account Information
      account: { required },
      billing_sort: { required },
      center: { required },
      center_description: {},
      // Vehicle Information
      year: { required },
      make: { required },
      model: { required },
      vin: { required },
      vehicle_number: { required, isLength: isLength(6) },
      client_vehicle_number: { maxLength: maxLength(8) },
      // Customization
      client_use_1: { maxLength: maxLength(40) },
      //client_use_label_1: { maxLength: maxLength(40) },
      client_use_2: { maxLength: maxLength(40) },
      //client_use_label_2: { maxLength: maxLength(40) },
      client_use_3: { maxLength: maxLength(40) },
      //client_use_label_3: { maxLength: maxLength(40) },
      client_use_4: { maxLength: maxLength(40) },
      //client_use_label_4: { maxLength: maxLength(40) },
      client_use_5: { maxLength: maxLength(40) },
      //client_use_label_5: { maxLength: maxLength(40) }
    }
  },
}
</script>

<style>

</style>