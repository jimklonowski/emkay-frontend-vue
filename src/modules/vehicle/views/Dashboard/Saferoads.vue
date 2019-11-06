<template>
  <v-card :loading="loading">
    <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
      saferoads
    </v-toolbar>
  </v-card>      
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
      subtitle: self.$route.params.vehicle
    },
    vehicle: '',
    headers: [],
    vehicle_inspections: []
  }),
  created() {
    this.vehicle = this.$route.params.vehicle
    
    //console.log('do saferoads stuff')
    this.loading = false
  }
}
</script>

<style>

</style>