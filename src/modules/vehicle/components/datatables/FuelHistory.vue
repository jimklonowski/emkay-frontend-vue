<template>
  <article>
    <v-card :loading="loading">
      <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
        <toolbar-title v-bind="title" />
        <v-spacer />
        <v-text-field
          v-model="search"
          class="font-weight-regular"
          append-icon="search"
          :label="$t('common.search')"
          single-line
          hide-details
          dark
        />

        <toolbar-menu :actions="actions">
          <template #actions>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon v-text="'cloud_download'" />
              </v-list-item-icon>
                <v-list-item-content>
                  <!-- export as excel button -->
                  <v-list-item-title>
                    <json-excel v-t="'common.export_to_excel'" :fields="getHeaders" :data="fuel_history" :name="getName" />
                  </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </template>
        </toolbar-menu>

      </v-toolbar>
      <v-divider />
      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :items="fuel_history"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          :loading="loading"
          dense
        >
          <template #loading>
            <v-skeleton-loader type="table-tbody" tile />
          </template>
          <!-- using i18n on the fly is tedious for column headers currently, but this dynamic solution works:
            https://github.com/vuetifyjs/vuetify/issues/8571#issuecomment-524846520
          -->
          <template
            v-for="header in headers"
            v-slot:[`header.${header.value}`]="{ header }"
          >
            {{ $t(header.key) }}
          </template>
          <template v-slot:item.type="{ item }">
            <v-chip :color="getColor(item.type)" x-small v-text="item.type" />
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </article>
</template>

<script>
import JsonExcel from 'vue-json-excel'
import ToolbarMenu from '@/modules/core/components/ToolbarMenu'
import ToolbarTitle from '@/modules/core/components/ToolbarTitle'
import { nameForExport, headersForExport } from '@/util/helpers'

export default {
  components: {
    JsonExcel,
    ToolbarMenu,
    ToolbarTitle
  },
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: self => ({
    errorMessage: null,
    exportFormat: 'xls',
    name: 'fuel_history',
    //json_meta: [[{ key: 'charset', value: 'utf-8' }]],
    loading: true,
    search: '',
    title: {
      key1: 'vehicle_dashboard.fuel',
      key2: 'vehicle_dashboard.history',
      subtitle: self.vehicle
    },
    actions: [
      {
        key: 'vehicle_dashboard.order_fuel_card',
        icon: 'credit_card',
        action: () => alert('order fuel card')
      },
      {
        key: 'vehicle_dashboard.reassign_auth_profile',
        icon: 'assignment_return',
        action: () => alert('reassign profile')
      }
    ],
    headers: [
      {
        key: 'common.date',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'date'
      },
      {
        key: 'vehicle_dashboard.odometer',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'odometer'
      },
      {
        key: 'vehicle_dashboard.driver',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'driver'
      },
      {
        key: 'vehicle_dashboard.merchant',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'merchant'
      },
      {
        key: 'vehicle_dashboard.merchant_address',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'merchant_address'
      },
      {
        key: 'vehicle_dashboard.type',
        width: '100px',
        align: 'left',
        sortable: true,
        value: 'type'
      },
      {
        key: 'vehicle_dashboard.quantity',
        width: '100px',
        align: 'left',
        sortable: true,
        value: 'quantity'
      },
      {
        key: 'vehicle_dashboard.unit_cost',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'unit_cost'
      },
      {
        key: 'vehicle_dashboard.amount',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'amount'
      }
    ],
    fuel_history: []
  }),
  computed: {
    getHeaders() {
      return headersForExport(this.headers)
    },
    getName() {
      return nameForExport(this.name, this.exportFormat)
    }
  },
  created() {
    let url = `/vehicle/fuel/${this.vehicle}`
    // fetch the data when the view is created and the data is already being observed.
    this.$http
      .get(url)
      .then(response => {
        this.fuel_history = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    // color chips for transaction types
    getColor: type => {
      switch (true) {
        case /wash/i.test(type):
          return 'info'
        case /prem/i.test(type):
        case /unl/i.test(type):
        case /gas/i.test(type):
          return 'primary'
        case /tax/i.test(type):
        case /sal/i.test(type):
        case /misc/i.test(type):
          return 'warning'
        default:
          return 'secondary'
      }
    }
  }
}
</script>
<style></style>
