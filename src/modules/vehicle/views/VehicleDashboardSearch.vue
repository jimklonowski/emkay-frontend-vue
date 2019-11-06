<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="12">
        <v-form @submit.prevent="onSubmit">
          <v-card color="primary lighten-2" class="pt-12 pb-6 px-12" dark>
            <!-- <v-text-field v-model="vehicle" :loading="loading" v-bind="schema.vehicle" @click:append-outer="search" /> -->
            <v-card-title class="title">Vehicle Search</v-card-title>
            <v-card-text>
              <v-autocomplete
                v-model="selection"
                autocomplete="off"
                :loading="loading"
                :items="items"
                :search-input.sync="query"
                item-value="vehicle_number"
                item-text="description"
                no-filter
                class="mx-4"
                color="white"
                clearable
                return-object
                :label="$t('common.search')"
                filled
                outlined
                :menu-props="{ 'nudgeBottom': 10, 'maxHeight': 360 }"
              >
                <template #no-data>
                  <v-list-item>
                    <v-list-item-title v-t="'vehicle_dashboard.search_placeholder'" />
                  </v-list-item>
                </template>
                <template #selection="data">
                  {{ data.item.vehicle_number }}
                </template>
                <template #item="data">
                  <v-list-item-avatar tile color="primary lighten-2" :size="60">
                    <span class="white--text">{{ data.item.vehicle_number }}</span>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="data.item.description" />
                    <v-list-item-subtitle v-text="data.item.driver_name" />
                  </v-list-item-content>
                </template>
                <template #append-outer>
                  <v-btn type="submit" text tile>
                    <v-icon v-text="'search'" />
                  </v-btn>
                  <!-- <v-btn type="submit" v-t="'common.search'" /> -->
                </template>
              </v-autocomplete>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    results: [],
    vehicleResults: [],
    driverResults: [],
    query: null,
    selection: null
  }),
  watch: {
    async query (newVal, oldVal) {
      if (newVal === oldVal) return
      if (!newVal) return

      // items have already been requested
      if (this.loading) return

      let self = this
      this.loading = true

      let vehicle_url = '/vehicles/search'
      let driver_url = '/drivers/search'

      // Lazily load input items
      this.$http.all([
        this.$http.get(vehicle_url, { params: { query: this.query }}),
        this.$http.get(driver_url, { params: { query: this.query }})
      ]).then(this.$http.spread((vehicleRes, driverRes) => {
        self.results = [...vehicleRes.data,...driverRes.data]
      }))
      .finally(() => {
        this.loading = false
      })
      
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      if (this.selection && this.selection.vehicle_number) {
        //this.$router.push({ name: 'vehicle-dashboard', params: { vehicle: this.selection.vehicle_number }})
        this.$router.push({ name: 'vehicle-dashboard', params: { vehicle: '123456' }})
      }
      this.loading = false
    }
  },
  computed: {
    items() {
      if (!this.results.length) return []
      //remove duplicates
      let res = this.results.map(result => { return { ...result }})
      //debugger
      return res
    },
    schema() {
      return {
        vehicle: {
          label: this.$t('common.search'),
          type: 'text',
          placeholder: this.$t('vehicle_dashboard.search_placeholder'),
          hint: this.$t('vehicle_dashboard.search_hint'),
          counter: 6,
          appendOuterIcon: 'send',
          required: true,
          persistentHint: true,
          autocomplete: false,
          outlined: true
        }
      }
    }
  }
}
</script>