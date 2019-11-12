<template>
  <v-row>
    <v-col cols="12">
      <driver-card :vehicle="$route.params.vehicle" />
    </v-col>
    <v-col cols="12">
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
                      <json-excel v-t="'common.export_to_excel'" :fields="getHeaders" :data="driver_history" :name="getName" />
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
            :items="driver_history"
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
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DriverCard from '@/modules/vehicle/components/DriverCard'
import JsonExcel from 'vue-json-excel'
import ToolbarMenu from '@/modules/core/components/ToolbarMenu'
import ToolbarTitle from '@/modules/core/components/ToolbarTitle'
import { nameForExport, headersForExport } from '@/util/helpers'

export default {
  components: {
    DriverCard,
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
    name: 'driver_history',
    loading: true,
    search: '',
    title: {
      key1: 'vehicle_dashboard.driver',
      key2: 'vehicle_dashboard.history',
      subtitle: self.vehicle
    },
    actions: [
      {
        key: 'vehicle_dashboard.change_driver_effective_date',
        icon: 'date_range',
        action: () => alert('change driver effective date')
      }
    ],
    headers: [
      {
        key: 'common.date',
        width: 'auto',
        align: 'left',
        sortable: true,
        value: 'date'
      },
      {
        key: 'vehicle_dashboard.effective_date',
        width: 'auto',
        align: 'left',
        sortable: true,
        value: 'effective_date'
      },
      {
        key: 'vehicle_dashboard.driver_reference_number',
        width: 'auto',
        align: 'left',
        sortable: true,
        value: 'driver_reference_number'
      },
      {
        key: 'vehicle_dashboard.driver',
        width: 'auto',
        align: 'left',
        sortable: true,
        value: 'driver'
      }
    ],
    driver_history: []
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
    let url = `/vehicle/drivers/${this.vehicle}`
    // fetch the data when the view is created and the data is already being observed.
    this.$http
      .get(url)
      .then(response => {
        this.driver_history = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {}
}
</script>

<style></style>
