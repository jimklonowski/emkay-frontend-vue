<template>
  <section v-if="!$route.params.vehicle" :style="$vuetify.breakpoint.mdAndUp ? 'padding-right:200px' : ''">
    <v-sheet color="transparent" elevation="0" tile style="position:sticky;top:100px;" height="48" />
    <v-container>
      <v-row>
        <v-breadcrumbs :items="breadcrumbs" />
      </v-row>
      <v-row no-gutters justify="center" tag="form" @submit.prevent="search">
        <v-text-field v-model="vehicle" :loading="loading" v-bind="schema.vehicle" @click:append-outer="search" />
      </v-row>
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
    vehicle: '',
    loading: false
  }),
  methods: {
    search() {
      this.loading = true
      if (this.vehicle) {
        this.$router.push({ name: 'dashboard', params: { vehicle: this.vehicle }})
      }
      this.loading = false
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: this.$t('vehicle_dashboard.vehicle_search'),
          disabled: true
        }
      ]
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
          //errorMessages: this.vehicleErrors(),
        }
      }
    }
  }
}
</script>

<style>

</style>