<template>
  <section :style="$vuetify.breakpoint.mdAndUp ? 'padding-right:200px' : ''">
    <v-container>
      <v-row>
        <v-breadcrumbs :items="breadcrumbs" />
      </v-row>
      <v-row>
        <v-col :cols="12">
          <v-card :loading="quote_loading">
            <v-form ref="quote" @submit.prevent="submitQuote">
              <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
                Get Quote
              </v-toolbar>
              <v-card-text class="pa-0">
                <v-container class="py-0">
                  <v-row>
                    <v-col cols="12">
                      <v-radio-group v-model="transport" column>
                        <template v-slot:label>
                          <v-label>Transport Method</v-label>
                        </template>
                        <v-radio label="Driven" value="transport-method-1"></v-radio>
                        <v-radio label="Trucked" value="transport-method-2"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row>
                    <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.origin') }}</header>
                    <v-col cols="12" lg="5">
                      <v-text-field :label="$t('vehicle_dashboard.city')" outlined dense />
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field :label="$t('vehicle_dashboard.state_province')" outlined dense />
                    </v-col>
                    <v-col cols="12" lg="1">OR</v-col>
                    <v-col cols="12" lg="2">
                      <v-text-field :label="$t('vehicle_dashboard.postal_code')" clearable outlined dense />
                    </v-col>
                  </v-row>
                  <v-row>
                    <header :class="$config.SUBHEADER_CLASS">{{ $t('vehicle_dashboard.destination') }}</header>
                    <v-col cols="12" lg="5">
                      <v-text-field :label="$t('vehicle_dashboard.city')" outlined dense />
                    </v-col>
                    <v-col cols="12" lg="4">
                      <v-text-field :label="$t('vehicle_dashboard.state_province')" outlined dense />
                    </v-col>
                    <v-col cols="12" lg="1">OR</v-col>
                    <v-col cols="12" lg="2">
                      <v-text-field :label="$t('vehicle_dashboard.postal_code')" clearable outlined dense />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn type="submit" color="primary">Request Quote</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="12">
          <v-card :loading="loading">
            <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
              Create Order
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="12">
          <v-card :loading="loading">
            <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
              Check Status
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data: self => ({
    errorMessage: null,
    quote_loading: true,
    loading: false,
    search: '',
    title: {
      key1: 'vehicle_dashboard.transport',
      key2: 'vehicle_dashboard.storage',
      subtitle: self.vehicle
    },
    vehicle: '',
    
    transport: null
  }),
  created() {
    this.vehicle = this.$route.params.vehicle
    //console.log('do transtor stuff')
    this.quote_loading = false
  },
  methods: {
    submitQuote() {
      this.quote_loading = true
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: this.$t('vehicle_dashboard.vehicle_search'),
          disabled: false,
          exact: true,
          to: { name: 'vehicle-dashboard' }
        },
        {
          text: this.$route.params.vehicle,
          disabled: true
        },
        {
          text: this.$t('vehicle_dashboard.transport_storage'),
          disabled: true
        }
      ]
    }
  }
}
</script>

<style>

</style>