<template>
  <v-card :loading="loading">
    <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
      inspections
    </v-toolbar>
  </v-card>    
</template>

<script>
export default {
  name: 'Inspections',
  data: self => ({
    errorMessage: null,
    loading: true,
    search: '',
    title: {
      key1: 'vehicle_dashboard.vehicle',
      key2: 'vehicle_dashboard.inspections',
      subtitle: self.$route.params.vehicle
    },
    vehicle: '',
    headers: [],
    vehicle_inspections: []
  }),
  created() {
    this.vehicle = this.$route.params.vehicle
    let url = `/vehicle/inspections/${this.vehicle}`
    this.$http
      .get(url)
      .then(response => {
        this.vehicle_inspections = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style>

</style>