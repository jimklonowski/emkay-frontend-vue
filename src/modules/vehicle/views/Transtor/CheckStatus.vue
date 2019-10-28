<template>
  <v-card flat>
    <v-toolbar flat>
      <v-toolbar-title>{{ $t('vehicle_dashboard.transport_status') }}</v-toolbar-title>
    </v-toolbar>
    <!-- <v-alert v-if="errorMessage" class="mb-0" type="error" dense tile>{{ errorMessage }}</v-alert> -->
    <v-data-table :headers="headers" :items="items" :loading="loading">
      
      <template #loading>
        <v-skeleton-loader type="table-row-divider" tile />
      </template>

      <template #no-data>
        {{ $t('vehicle_dashboard.no_transports_found') }}
      </template>

      <template v-for="header in headers" #[`header.${header.value}`]="{ header }">
        {{ $t(header.key) }}
      </template>

      <template #item.action="{ item }">
        <v-icon small class="mr-2" @click="editOrder(item)">edit</v-icon>
        <v-icon small class="mr-2" @click="viewOrder(item)">visibility</v-icon>
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    errorMessage: null,
    loading: false,
    headers: [
      {
        key: 'dates.order_date',
        value: 'order_date'
      },
      {
        key: 'vehicle_dashboard.order_number',
        value: 'order_number'
      },
      {
        key: 'vehicle_dashboard.pickup_location',
        value: 'pickup_location'
      },
      {
        key: 'vehicle_dashboard.delivery_location',
        value: 'delivery_location'
      },
      {
        key: 'common.actions',
        value: 'action',
        sortable: false
      }
    ],
    items: []
  }),
  async created() {
    this.vehicle = this.$route.params.vehicle
    this.loading = true
    let url = `/transtor/status/${this.vehicle}`

    this.$http
      .get(url)
      .then(response => {
        this.items = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    editOrder(item) {
      alert(`edit order #${item.order_number}`)
    },
    viewOrder(item) {
      alert(`view order #${item.order_number}`)
    }
  },
  computed: {
    toolbarColor() {
      return this.errorMessage ? 'error darken-2' : 'primary'
    }
  }
}
</script>

<style>

</style>