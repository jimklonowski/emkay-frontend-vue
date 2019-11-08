<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header v-text="$t('vehicle_dashboard.vehicle_details')" />
      <v-expansion-panel-content>
        <v-btn icon large @click="isEditing = !isEditing" title="Edit">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-form>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="6" lg="4">
                <v-row>
                  <v-subheader class="col-12 overline" v-text="$t('vehicle_dashboard.account_information')" />
                  <v-col v-for="(item, name, key) in model.account_info" :key="key" v-bind="schema.account_info[name].flex">
                    <v-text-field v-model="model.account_info[name]" v-bind="schema.account_info[name].props" :disabled="!isEditing" :filled="isEditing" rounded />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <v-row>
                  <v-subheader class="col-12 overline" v-text="$t('vehicle_dashboard.vehicle_information')" />
                  <v-col v-for="(item, name, key) in model.vehicle_info" :key="key" v-bind="schema.vehicle_info[name].flex">
                    <v-text-field v-model="model.vehicle_info[name]" v-bind="schema.vehicle_info[name].props" :disabled="!isEditing" :filled="isEditing" rounded />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <v-row>
                  <v-subheader class="col-12 overline" v-text="$t('vehicle_dashboard.customization')" />
                  <v-col v-for="(item, name, key) in model.customization" :key="key" v-bind="schema.customization[name].flex">
                    <v-text-field v-model="model.customization[name]" v-bind="schema.customization[name].props" :disabled="!isEditing" :filled="isEditing" rounded />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-btn @click="isEditing = !isEditing">EDIT</v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'VehicleInfo',
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
      // Account Information
      account_info: {
        account: '',
        billing_sort: '',
        center: '',
        center_description: ''
      },
      // Vehicle Information
      vehicle_info: {
        year: '',
        make: '',
        model: '',
        vin: '',
        vehicle_number: '',
        client_vehicle_number: ''
      },
      // Customization
      customization: {
        client_use_1: '',
        client_use_2: '',
        client_use_3: '',
        client_use_4: '',
        client_use_5: ''
      }
    }
  }),
  created() {
    let url = `/vehicle-info/${this.vehicle}`
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
        // Account Information
        account_info: {
          account: {
            props: {
              label: this.$t('auth.account'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          billing_sort: {
            props: {
              label: this.$t('vehicle_dashboard.billing_sort'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          center: {
            props: {
              label: this.$t('vehicle_dashboard.center'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          center_description: {
            props: {
              label: this.$t('vehicle_dashboard.center_description'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          }
        },
        // Vehicle Information
        vehicle_info: {
          year: {
            props: {
              label: this.$t('vehicle_dashboard.year'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          make: {
            props: {
              label: this.$t('vehicle_dashboard.make'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          model: {
            props: {
              label: this.$t('vehicle_dashboard.model'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          vin: {
            props: {
              label: this.$t('vehicle_dashboard.vin'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          vehicle_number: {
            props: {
              label: this.$t('vehicle_dashboard.vehicle_number'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          client_vehicle_number: {
            props: {
              label: this.$t('vehicle_dashboard.client_vehicle_number'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          }
        },
        // Customization
        customization: {
          client_use_1: {
            props: {
              label: this.$t('vehicle_dashboard.client_use_label_1'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          client_use_2: {
            props: {
              label: this.$t('vehicle_dashboard.client_use_label_2'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          client_use_3: {
            props: {
              label: this.$t('vehicle_dashboard.client_use_label_3'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          client_use_4: {
            props: {
              label: this.$t('vehicle_dashboard.client_use_label_4'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
            }
          },
          client_use_5: {
            props: {
              label: this.$t('vehicle_dashboard.client_use_label_1'),
              type: 'text'
            },
            flex: {
              cols: 12,
              md: 6
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