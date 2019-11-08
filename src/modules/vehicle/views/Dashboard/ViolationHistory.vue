<template>
  <v-card :loading="loading">
    <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
      <toolbar-title v-bind="title" />
      <v-spacer />
      <v-text-field
        v-model="search"
        class="font-weight-regular"
        append-icon="mdi-magnify"
        :label="$t('common.search')"
        single-line
        hide-details
        dark
      />
      
      <toolbar-menu :actions="actions">
        <template #actions>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon v-text="'mdi-cloud-download'" />
            </v-list-item-icon>
              <v-list-item-content>
                <!-- export as excel button -->
                <v-list-item-title>
                  <json-excel v-t="'common.export_to_excel'" :fields="getHeaders" :data="violation_history" :name="getName" />
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
        :items="violation_history"
        :items-per-page="10"
        :search="search"
        :sort-by="['date']"
        :sort-desc="[true]"
        :loading="loading"
        class="striped"
        height="auto"
      >
        <template #loading>
          <v-skeleton-loader type="table-tbody" tile />
        </template>
        <template
          v-for="header in headers"
          v-slot:[`header.${header.value}`]="{ header }"
        >
          {{ $t(header.key) }}
        </template>
        <template v-slot:item.reason="{ item }">
          <v-chip
            :color="getColor(item.reason)"
            x-small
            v-text="item.reason"
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
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
    name: 'violation_history',
    loading: true,
    search: '',
    title: {
      key1: 'vehicle_dashboard.violation',
      key2: 'vehicle_dashboard.history',
      subtitle: self.vehicle
    },
    actions: [],
    headers: [
      {
        key: 'common.date',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'date'
      },
      {
        key: 'vehicle_dashboard.violation',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'violation'
      },
      {
        key: 'vehicle_dashboard.reason',
        width: '250px',
        align: 'left',
        sortable: true,
        value: 'reason'
      },
      {
        key: 'vehicle_dashboard.paid_date',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'paid_date'
      },
      {
        key: 'vehicle_dashboard.location',
        width: '250px',
        align: 'left',
        sortable: true,
        value: 'location'
      },
      {
        key: 'vehicle_dashboard.amount',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'amount'
      }
    ],
    violation_history: []
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
    let url = `/vehicle/violations/${this.vehicle}`
    // fetch the data when the view is created and the data is already being observed.
    this.$http
      .get(url)
      .then(response => {
        this.violation_history = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    getColor: reason => {
      switch (true) {
        case /mov/i.test(reason):
          return 'info'
        case /park/i.test(reason):
          return 'warning'
        default:
          return 'secondary'
      }
    }
  }
}
</script>

<style></style>
