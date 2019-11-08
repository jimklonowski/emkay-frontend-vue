<template>
  <v-card :loading="loading">
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-toolbar :color="toolbarColor" :class="$config.TOOLBAR_CLASS" dark>
        <toolbar-title v-bind="title" />
        <v-spacer />
        <v-btn large icon dark @click.prevent="$emit('close')">
          <v-icon v-text="'mdi-close'" />
        </v-btn>
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-alert v-if="errorMessage" class="mb-0" type="error" dense tile>{{ errorMessage }}</v-alert>
        <v-subheader v-t="hintKey" />
        <v-divider />
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" sm="6" class="py-0">
              <v-row>
                <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.client_customization') }}</header>
                <field-with-loader :model.sync="model.client_use_label_1" :schema="schema.client_use_label_1" :status="status" />
                <field-with-loader :model.sync="model.client_use_label_2" :schema="schema.client_use_label_2" :status="status" />
                <field-with-loader :model.sync="model.client_use_label_3" :schema="schema.client_use_label_3" :status="status" />
                <field-with-loader :model.sync="model.client_use_label_4" :schema="schema.client_use_label_4" :status="status" />
                <field-with-loader :model.sync="model.client_use_label_5" :schema="schema.client_use_label_5" :status="status" />
              </v-row>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-row>
                <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.driver_customization') }}</header>
                <field-with-loader :model.sync="model.driver_use_label_1" :schema="schema.driver_use_label_1" :status="status" />
                <field-with-loader :model.sync="model.driver_use_label_2" :schema="schema.driver_use_label_2" :status="status" />
                <field-with-loader :model.sync="model.driver_use_label_3" :schema="schema.driver_use_label_3" :status="status" />
                <field-with-loader :model.sync="model.driver_use_label_4" :schema="schema.driver_use_label_4" :status="status" />
              </v-row>
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
          <v-icon dark v-text="'save'" />
          {{ $t('common.save_changes') }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { maxLength } from 'vuelidate/lib/validators'
import { translateError } from '@/util/helpers'
import FieldWithLoader from '@/modules/core/components/FieldWithLoader'
import ToolbarTitle from '@/modules/core/components/ToolbarTitle'

export default {
  components: { FieldWithLoader, ToolbarTitle },
  props: {
    titleKey: {
      type: String,
      default: 'vehicle_dashboard.edit_custom_labels'
    }
  },
  data: () => ({
    errorMessage: null,
    isInitializing: false,
    isEditing: true,
    dialog: false,
    hintKey: 'vehicle_dashboard.custom_labels_subheader',
    loading: false,
    title: {
      key1: 'vehicle_dashboard.custom',
      key2: 'vehicle_dashboard.labels'
    },
    model: {
      client_use_label_1: '',
      client_use_label_2: '',
      client_use_label_3: '',
      client_use_label_4: '',
      client_use_label_5: '',
      driver_use_label_1: '',
      driver_use_label_2: '',
      driver_use_label_3: '',
      driver_use_label_4: '',
    }
  }),
  computed: {
    status() {
      return { isEditing: this.isEditing, isInitializing: this.isInitializing }
    },
    toolbarColor() {
      return this.errorMessage ? 'error darken-2' : 'primary'
    },
    schema() {
      return {
        client_use_label_1: {
          label: this.$t('vehicle_dashboard.client_use_label_1'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.labelErrors('client_use_label_1', 40),
          outlined: true,
          dense: true
        },
        client_use_label_2: {
          label: this.$t('vehicle_dashboard.client_use_label_2'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.labelErrors('client_use_label_2', 40),
          outlined: true,
          dense: true
        },
        client_use_label_3: {
          label: this.$t('vehicle_dashboard.client_use_label_3'),
          type: 'text',
          cols: 12,
          errorMessages: this.labelErrors('client_use_label_3', 40),
          counter: 40,
          outlined: true,
          dense: true
        },
        client_use_label_4: {
          label: this.$t('vehicle_dashboard.client_use_label_4'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.labelErrors('client_use_label_4', 40),
          outlined: true,
          dense: true
        },
        client_use_label_5: {
          label: this.$t('vehicle_dashboard.client_use_label_5'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.labelErrors('client_use_label_5', 40),
          outlined: true,
          dense: true
        },
        driver_use_label_1: {
          label: this.$t('vehicle_dashboard.driver_use_label_1'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.labelErrors('driver_use_label_1', 40),
          outlined: true,
          dense: true
        },
        driver_use_label_2: {
          label: this.$t('vehicle_dashboard.driver_use_label_2'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.labelErrors('driver_use_label_2', 40),
          outlined: true,
          dense: true
        },
        driver_use_label_3: {
          label: this.$t('vehicle_dashboard.driver_use_label_3'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.labelErrors('driver_use_label_3', 40),
          outlined: true,
          dense: true
        },
        driver_use_label_4: {
          label: this.$t('vehicle_dashboard.driver_use_label_4'),
          type: 'text',
          cols: 12,
          counter: 40,
          errorMessages: this.labelErrors('driver_use_label_4', 40),
          outlined: true,
          dense: true
        }
      }
    }
  },
  async created() {
    this.isInitializing = true
    this.loading = true
    const url = '/custom-labels'
    this.$http
      .get(url)
      .then(response => {
        this.model = { ...this.model, ...response.data }
        // save off original model in case we want to cancel edit
        this.originalModel = { ...this.model }
        this.errorMessage = null
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.isInitializing = false
        this.loading = false
      })
  },
  validations: {
    model: {
      client_use_label_1: { maxLength: maxLength(40) },
      client_use_label_2: { maxLength: maxLength(40) },
      client_use_label_3: { maxLength: maxLength(40) },
      client_use_label_4: { maxLength: maxLength(40) },
      client_use_label_5: { maxLength: maxLength(40) },
      driver_use_label_1: { maxLength: maxLength(40) },
      driver_use_label_2: { maxLength: maxLength(40) },
      driver_use_label_3: { maxLength: maxLength(40) },
      driver_use_label_4: { maxLength: maxLength(40) }
    }
  },
  methods: {
    translateError,
    cancelEdit() {
      this.dialog = false
      this.resetForm()
    },
    resetForm() {
      // restore original model
      Object.assign(this.model, this.originalModel)
      this.loading = false
      this.errorMessage = null
    },
    labelErrors(field, length) {
      const errors = []
      if (!this.$v.model[field].$dirty) return errors
      !this.$v.model[field].maxLength && errors.push(this.translateError('validation.max_length', length))
      return errors
    },
    onSubmit() {
      this.errorMessage = null
      this.loading = true
      const url = '/test/post'
      // trigger validations
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = 'Fix Validation Errors, dude!'
        this.loading = false
        return false
      }

      this.$http
        .post(url, this.model)
        .then(() => {
          //console.log(`Successful result: ${result}`)
          this.errorMessage = null
          this.originalModel = this.model
        })
        .catch(error => {
          //console.error(error.response)
          this.errorMessage = error.response.data.error
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
