<template>
  <section v-if="!$route.params.vehicle">
    <v-container fluid fill-height>
      <v-container>
        <v-row justify="center" tag="form" @submit.prevent="search">
          <v-text-field v-model="vehicle" v-bind="schema.vehicle" @click:append-outer="search" />
        </v-row>
      </v-container>
    </v-container>
  </section>
  <section v-else>
    <vehicle-navigation />
    <router-view />
  </section>
</template>

<script>
import VehicleNavigation from '@/modules/vehicle/components/VehicleNavigation'
export default {
  name: 'vehicle-dashboard',
  components: {
    VehicleNavigation
  },
  data: () => ({
    vehicle: ''
  }),
  methods: {
    search() {
      if (this.vehicle) {
        this.$router.push({ name: 'dashboard', params: { vehicle: this.vehicle }})
      }
    }
  },
  computed: {
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
          //errorMessages: this.vehicleErrors(),
        }
      }
    }
  }
}
</script>

<style>

</style>