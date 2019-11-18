<template>
  <v-row no-gutters>
    <v-card v-if="initializing" shaped outlined>
      <v-card-title class="pa-0">
        <v-skeleton-loader class="col-8" type="list-item-avatar" />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" v-for="n in 6" :key="n">
            <v-skeleton-loader type="list-item-avatar-two-line"  />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row no-gutters>
          <v-skeleton-loader type="chip" />
        </v-row>
      </v-card-actions>
    </v-card>


    <v-card v-else shaped outlined>
      <v-card-title class="pa-0">
        <v-list-item>
          <!-- <v-list-item-avatar tile size="32" class="d-flex flex-column" style="cursor:pointer;" @click.stop="$router.push({ name: 'vehicle-dashboard-driver-edit' })"> -->
          <v-list-item-avatar tile size="32" class="d-flex flex-column" style="cursor:pointer;" @click.stop="editDriver">
            <v-icon color="primary" size="32">mdi-account-edit</v-icon>
            <p class="ma-0 overline">Edit</p>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="body-1">
              <span class="font-weight-bold">{{ model.driver_info.first_name }}</span>
              <span class="font-weight-light">{{ model.driver_info.last_name }}</span>
            </v-list-item-title>
            <v-list-item-subtitle class="caption">
              <p class="mb-0">{{ model.driver_info.license_state }} {{ model.driver_info.license_number }}</p>
              <!-- <p class="mb-0">Driver #: 271653</p> -->
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>Driver #</v-list-item-action-text>
            <v-chip pill outlined small>271563</v-chip>
          </v-list-item-action>
        </v-list-item>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-list class="text-left">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-map-marker</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ model.contact_info.address_1 }}</v-list-item-title>
                  <v-list-item-subtitle class="caption">{{ model.contact_info.address_2 }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="caption">{{ model.contact_info.city}}, {{ model.contact_info.state_province }} {{ model.contact_info.postal_code }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-card-details</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ model.driver_info.employee_id }}</v-list-item-title>
                  <v-list-item-subtitle class="caption">Employee ID</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-badge</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ model.driver_info.selector_level }}</v-list-item-title>
                  <v-list-item-subtitle class="caption">Selector Level</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="6">
            <v-list class="text-left">
              <v-list-item @click.stop="dialTo(model.contact_info.phone)">
                <v-list-item-icon>
                  <v-icon>mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ model.contact_info.phone }}</v-list-item-title>
                  <v-list-item-subtitle class="caption">Phone</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click.stop="dialTo(model.contact_info.cell)">
                <v-list-item-icon>
                  <v-icon>mdi-cellphone-basic</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ model.contact_info.cell }}</v-list-item-title>
                  <v-list-item-subtitle class="caption">Cell</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click.stop="emailTo(model.contact_info.email)">
                <v-list-item-icon>
                  <v-icon>mdi-email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ model.contact_info.email }}</v-list-item-title>
                  <v-list-item-subtitle class="caption">Email</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn text small v-t="'vehicle_dashboard.reassign_driver'" />
        <v-spacer />
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <v-card :loading="loading" v-show="show" flat>
          
          <v-divider />
          <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>
          <v-card-text>
            <v-form>
              <v-list>
                <v-list-item v-for="(item, name, key) in model.customization" :key="key">
                  <v-text-field v-model="model.customization[name]" v-bind="schema.customization[name].props" :disabled="!editing" />
                </v-list-item>
              </v-list>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn small text depressed :ripple="false" v-if="editing" @click.stop="cancelLabelEdit" color="error">
              Cancel
            </v-btn>
            <v-btn small text v-if="editing" @click.stop="saveLabelEdit">
              Save
            </v-btn>
            <v-btn small text v-if="!editing" @click.stop="editing = !editing">
              Edit Driver Labels
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-row>
</template>

<script>
import { editDriver } from '@/modules/vehicle/components/modals'
import ApiService from '@/services/api.service'
import { cloneDeep, dialTo, emailTo, translateError } from '@/util/helpers'
import { maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'DriverCard',
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    editing: false,
    error: null,
    initializing: false,
    loading: false,
    show: false,

    model: {
      // Driver Information
      driver_info: {
        last_name: '',
        first_name: '',
        employee_id: '',
        license_state: '',
        license_number: '',
        selector_level: ''
      },
      // Contact Information
      contact_info: {
        address_1: '',
        address_2: '',
        postal_code: '',
        city: '',
        state_province: '',
        county: '',
        email: '',
        phone: '',
        cell: ''
      },
      // Customization
      customization: {
        driver_use_1: '',
        driver_use_2: '',
        driver_use_3: '',
        driver_use_4: ''
      }
    }
  }),
  created() {
    let url = `/driver-info/${this.vehicle}`
    this.loading = true
    this.initializing = true

    this.$http
      .get(url)
      .then(response => {
        // populate model
        this.model = response.data
        
        // Save a copy of original model to restore in case user presses 'cancel' while editing
        // A deep copy is required! so I'm using lodash's _.cloneDeep(obj). Object.assign and ...spread operators only do a shallow copy
        // https://stackoverflow.com/questions/48363604
        this.originalModel = cloneDeep(this.model)
        //console.dir(this.originalModel)
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
        this.initializing = false
      })
      
  },
  methods: {
    dialTo,
    emailTo,
    translateError,
    editDriver,
    // validation/error handling
    driverUse1Errors() {
      const errors = []
      if (!this.$v.model.customization.driver_use_1.$dirty) return errors
      !this.$v.model.customization.driver_use_1.maxLength && errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    driverUse2Errors() {
      const errors = []
      if (!this.$v.model.customization.driver_use_2.$dirty) return errors
      !this.$v.model.customization.driver_use_2.maxLength && errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    driverUse3Errors() {
      const errors = []
      if (!this.$v.model.customization.driver_use_3.$dirty) return errors
      !this.$v.model.customization.driver_use_3.maxLength && errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    driverUse4Errors() {
      const errors = []
      if (!this.$v.model.customization.driver_use_4.$dirty) return errors
      !this.$v.model.customization.driver_use_4.maxLength && errors.push(this.translateError('validation.max_length', 40))
      return errors
    },
    cancelLabelEdit() {
      this.editing = false
      this.error = null
      // restore original model
      this.model = cloneDeep(this.originalModel)
      //console.log('driver edit cancelled')
    },
    saveLabelEdit() {
      this.error = null
      this.loading = true
      
      const url = '/test/post'
      // trigger validations
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = 'Fix validation errors...'
        this.loading = false
        return false
      }

      ApiService
        .post(url, this.model)
        .then(() => {
          this.error = null
          this.originalModel = this.model
        })
        .catch(error => {
          this.error = error.response.data.error
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  computed: {
    schema() {
      return {
        // Driver info
        driver_info: {
          last_name: {
            props: {
              label: this.$t('vehicle_dashboard.last_name'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          first_name: {
            props: {
              label: this.$t('vehicle_dashboard.first_name'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          employee_id: {
            props: {
              label: this.$t('vehicle_dashboard.employee_id'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          license_state: {
            props: {
              label: this.$t('vehicle_dashboard.license_state'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          license_number: {
            props: {
              label: this.$t('vehicle_dashboard.license_number'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          selector_level: {
            props: {
              label: this.$t('vehicle_dashboard.selector_level'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          }
        },
        // Contact Info
        contact_info: {
          address_1: {
            props: {
              label: this.$t('vehicle_dashboard.address_1'),
              type: 'text'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          address_2: {
            props: {
              label: this.$t('vehicle_dashboard.address_2'),
              type: 'text'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          postal_code: {
            props: {
              label: this.$t('vehicle_dashboard.postal_code'),
              type: 'text'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          city: {
            props: {
              label: this.$t('vehicle_dashboard.city'),
              type: 'text'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          state_province: {
            props: {
              label: this.$t('vehicle_dashboard.state_province'),
              type: 'text'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          county: {
            props: {
              label: this.$t('vehicle_dashboard.county'),
              type: 'text'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          email: {
            props: {
              label: this.$t('vehicle_dashboard.email'),
              type: 'email'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          phone: {
            props: {
              label: this.$t('vehicle_dashboard.phone'),
              type: 'tel'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          cell: {
            props: {
              label: this.$t('vehicle_dashboard.cell'),
              type: 'tel'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          }
        },
        // Customization
        customization: {
          driver_use_1: {
            props: {
              label: this.$t('vehicle_dashboard.driver_use_label_1'),
              type: 'text',
              errorMessages: this.driverUse1Errors(),
              counter: 40
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          driver_use_2: {
            props: {
              label: this.$t('vehicle_dashboard.driver_use_label_2'),
              type: 'text',
              errorMessages: this.driverUse2Errors(),
              counter: 40
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          driver_use_3: {
            props: {
              label: this.$t('vehicle_dashboard.driver_use_label_3'),
              type: 'text',
              errorMessages: this.driverUse3Errors(),
              counter: 40
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          driver_use_4: {
            props: {
              label: this.$t('vehicle_dashboard.driver_use_label_4'),
              type: 'text',
              errorMessages: this.driverUse4Errors(),
              counter: 40
            },
            flex: {
              cols: 12,
              sm: 6
            }
          }
        }
      }
    }
  },
  validations: {
    model: {
      // Customization
      customization: {
        driver_use_1: { maxLength: maxLength(40) },
        driver_use_2: { maxLength: maxLength(40) },
        driver_use_3: { maxLength: maxLength(40) },
        driver_use_4: { maxLength: maxLength(40) }
      }
    }
  }
}
</script>

<style>

</style>