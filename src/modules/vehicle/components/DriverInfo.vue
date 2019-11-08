<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <v-card>
        <v-form>
          <v-card-title class="headline" v-text="$t('vehicle_dashboard.driver_details')" />
          <v-card-text>
            <v-row v-if="initializing">
              <v-skeleton-loader type="table-row-divider@4" />
            </v-row>
            <v-row v-else>
              <v-col cols="12" lg="4">
                <v-row :dense="isEditing">
                  <v-subheader class="col-12 overline" v-text="$t('vehicle_dashboard.driver_information')" />
                  <v-col v-for="(item, name, key) in model.driver_info" :key="key" v-bind="schema.driver_info[name].flex">
                    <v-text-field v-model="model.driver_info[name]" v-bind="schema.driver_info[name].props" :disabled="!isEditing" :filled="isEditing" rounded />
                    <!-- <v-text-field :label="name" :disabled="!isEditing" :filled="isEditing" :solo="!isEditing" :flat="!isEditing" dense /> -->
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" lg="4">
                <v-row :dense="isEditing">
                  <v-subheader class="col-12 overline" v-text="$t('vehicle_dashboard.contact_information')" />
                  <v-col v-for="(item, name, key) in model.driver_info" :key="key" v-bind="schema.driver_info[name].flex">
                    <v-text-field v-model="model.driver_info[name]" v-bind="schema.driver_info[name].props" :disabled="!isEditing" :filled="isEditing" rounded />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" lg="4">
                <v-row :dense="isEditing">
                  <v-subheader class="col-12 overline" v-text="$t('vehicle_dashboard.customization')" />
                  <v-col v-for="(item, name, key) in model.customization" :key="key" v-bind="schema.customization[name].flex">
                    <v-text-field v-model="model.customization[name]" v-bind="schema.customization[name].props" :disabled="!isEditing" :filled="isEditing" rounded />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="isEditing = !isEditing">EDIT</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'DriverInfo',
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    isEditing: false,
    initializing: false,

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
        // save off original model in case of edit cancel
        this.originalModel = { ...this.model }
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
        this.initializing = false
      })
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
              type: 'text'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          driver_use_2: {
            props: {
              label: this.$t('vehicle_dashboard.driver_use_label_2'),
              type: 'text'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          driver_use_3: {
            props: {
              label: this.$t('vehicle_dashboard.driver_use_label_3'),
              type: 'text'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          },
          driver_use_4: {
            props: {
              label: this.$t('vehicle_dashboard.driver_use_label_4'),
              type: 'text'
            },
            flex: {
              cols: 12,
              sm: 6
            }
          }
        }
      }
    }
  }
}
</script>

<style>

</style>