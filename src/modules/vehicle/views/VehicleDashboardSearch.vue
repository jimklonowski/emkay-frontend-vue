<template>
  <!-- If vehicle param in route, show vehicle dashboard -->
  <section v-if="$route.params.vehicle">
    <router-view />
  </section>
  <!-- Else, show vehicle search -->
  <section v-else>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-form @submit.prevent="search">
            <v-text-field v-model="vehicle" :loading="loading" v-bind="schema.vehicle" @click:append-outer="search" />
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    vehicle: ''
  }),
  methods: {
    search() {
      this.loading = true
      if (this.vehicle) {
        this.$router.push({ name: 'vehicle-dashboard', params: { vehicle: this.vehicle }})
      }
      this.loading = false
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
        }
      }
    }
  }
}
</script>