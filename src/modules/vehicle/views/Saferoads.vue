<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="breadcrumbs" />
    </v-row>
    <v-row>
      <v-col :cols="12">
        saferoads
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Saferoads',
  data: self => ({
    errorMessage: null,
    loading: true,
    search: '',
    title: {
      key1: 'vehicle_dashboard.saferoads',
      subtitle: self.vehicle
    },
    vehicle: '',
    headers: [],
    vehicle_inspections: []
  }),
  created() {
    this.vehicle = this.$route.params.vehicle
    
    console.log('do saferoads stuff')
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
          text: this.$t('vehicle_dashboard.saferoads'),
          disabled: true
        }
      ]
    }
  }
}
</script>

<style>

</style>