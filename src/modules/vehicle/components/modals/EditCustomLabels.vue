<template>
  <v-card :loading="loading">
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-toolbar :color="toolbarColor" :class="$config.TOOLBAR_CLASS" dark>
        <toolbar-title v-bind="title" />
        <v-spacer />
        <v-btn large icon tile dark @click.prevent="$emit('close')">
          <v-icon v-text="'close'" />
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-card-text class="pa-0">
        <v-subheader v-t="hintKey" />
        <v-divider />
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" sm="6" class="py-0">
              <v-row>
                <v-subheader v-t="'vehicle_dashboard.client_customization'" :class="$config.SUBHEADER_CLASS" />
                <v-col cols="12">
                  <v-text-field v-bind="schema.client_use_label_1" v-model="model.client_use_label_1" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-bind="schema.client_use_label_2" v-model="model.client_use_label_2" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-bind="schema.client_use_label_3" v-model="model.client_use_label_3" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-bind="schema.client_use_label_4" v-model="model.client_use_label_4" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-bind="schema.client_use_label_5" v-model="model.client_use_label_5" />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-row>
                <v-subheader v-t="'vehicle_dashboard.driver_customization'" :class="$config.SUBHEADER_CLASS" />
                <v-col cols="12">
                  <v-text-field v-bind="schema.driver_use_label_1" v-model="model.driver_use_label_1" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-bind="schema.driver_use_label_2" v-model="model.driver_use_label_2" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-bind="schema.driver_use_label_3" v-model="model.driver_use_label_3" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-bind="schema.driver_use_label_4" v-model="model.driver_use_label_4" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-alert v-if="errorMessage" type="error" v-text="errorMessage" class="mb-0" dense outlined />
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
</template>

<script>
import { maxLength } from 'vuelidate/lib/validators'
import { translateError } from '@/util/helpers'
import ToolbarTitle from '@/modules/core/components/ToolbarTitle'

export default {
  components: { ToolbarTitle },
  props: {
    titleKey: {
      type: String,
      default: 'vehicle_dashboard.edit_custom_labels'
    }
  },
  data: () => ({
    errorMessage: null,
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
    toolbarColor() {
      return this.errorMessage ? 'error' : 'primary'
    },
    schema() {
      return {
        client_use_label_1: {
          label: this.$t('vehicle_dashboard.client_use_label_1'),
          type: 'text',
          counter: 40,
          errorMessages: this.labelErrors('client_use_label_1', 40),
          outlined: true,
          dense: true
        },
        client_use_label_2: {
          label: this.$t('vehicle_dashboard.client_use_label_2'),
          type: 'text',
          counter: 40,
          errorMessages: this.labelErrors('client_use_label_2', 40),
          outlined: true,
          dense: true
        },
        client_use_label_3: {
          label: this.$t('vehicle_dashboard.client_use_label_3'),
          type: 'text',
          errorMessages: this.labelErrors('client_use_label_3', 40),
          counter: 40,
          outlined: true,
          dense: true
        },
        client_use_label_4: {
          label: this.$t('vehicle_dashboard.client_use_label_4'),
          type: 'text',
          counter: 40,
          errorMessages: this.labelErrors('client_use_label_4', 40),
          outlined: true,
          dense: true
        },
        client_use_label_5: {
          label: this.$t('vehicle_dashboard.client_use_label_5'),
          type: 'text',
          counter: 40,
          errorMessages: this.labelErrors('client_use_label_5', 40),
          outlined: true,
          dense: true
        },
        driver_use_label_1: {
          label: this.$t('vehicle_dashboard.driver_use_label_1'),
          type: 'text',
          counter: 40,
          errorMessages: this.labelErrors('driver_use_label_1', 40),
          outlined: true,
          dense: true
        },
        driver_use_label_2: {
          label: this.$t('vehicle_dashboard.driver_use_label_2'),
          type: 'text',
          counter: 40,
          errorMessages: this.labelErrors('driver_use_label_2', 40),
          outlined: true,
          dense: true
        },
        driver_use_label_3: {
          label: this.$t('vehicle_dashboard.driver_use_label_3'),
          type: 'text',
          counter: 40,
          errorMessages: this.labelErrors('driver_use_label_3', 40),
          outlined: true,
          dense: true
        },
        driver_use_label_4: {
          label: this.$t('vehicle_dashboard.driver_use_label_4'),
          type: 'text',
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
        .then(result => {
          console.log(`Successful result: ${result}`)
          this.errorMessage = null
          this.originalModel = this.model
        })
        .catch(error => {
          console.error(error.response)
          this.errorMessage = error.response.data.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
