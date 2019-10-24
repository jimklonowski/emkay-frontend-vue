<template>
  <section :style="$vuetify.breakpoint.mdAndUp ? 'padding-right:200px' : ''">
    <v-container>
      <v-row>
        <v-breadcrumbs :items="breadcrumbs" />
      </v-row>
      <v-row>
        <v-col :cols="12">
          <v-card :loading="loading">
            <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
              transtor
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'Inspections',
  data: self => ({
    errorMessage: null,
    loading: true,
    search: '',
    title: {
      key1: 'vehicle_dashboard.transport',
      key2: 'vehicle_dashboard.storage',
      subtitle: self.vehicle
    },
    vehicle: '',
    headers: [],
    vehicle_inspections: []
  }),
  created() {
    this.vehicle = this.$route.params.vehicle
    console.log('do transtor stuff')
    this.loading = false
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