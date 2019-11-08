<template>
  <v-container class="search-hero" fluid fill-height>
    <v-img :src="require('@/assets/logolight.png')" height="50" contain style="position:absolute;top:50px;left:0;right:0;opacity:0.6;" />
    <v-row justify="center">
      <v-form @submit.prevent.stop="onSubmit">
        <v-autocomplete
          v-model="selection"
          autocomplete="off"
          :label="$t('common.search')"
          :loading="loading"
          :items="items"
          item-value="vehicle_number"
          item-text="description"
          :search-input.sync="query"
          :style="{ 'minWidth': '800px' }"
          clearable
          solo
          hide-details
          no-filter
          return-object
          full-width
          append-outer-icon="mdi-search-web"
          @change="onSubmit"
          @click:append-outer="onSubmit"
          @keydown.enter.native.prevent="onSubmit"
          :menu-props="{ 'nudgeBottom': 10, 'maxHeight': 360 }"
        >
          <template #progress>
            <v-progress-linear
              color="warning lighten-2"
              :buffer-value="0"
              height="5"
              absolute
              indeterminate
              stream
            />
          </template>
          <template #no-data>
            <v-list-item dense>
              <v-list-item-title v-t="'vehicle_dashboard.vehicle_search_placeholder'" />
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
        </v-autocomplete>
      </v-form>
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
    //async query (newVal, oldVal) {
    async query () {
      //if (!newVal) return
      //if (newVal === oldVal) return

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
        this.$router.push({ name: 'vehicle-dashboard', params: { vehicle: this.selection.vehicle_number }})
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
<style>
.search-hero::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/desertroad.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  opacity: 0.5;
}
</style>