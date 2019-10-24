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
                    <json-excel v-t="'common.export_to_excel'" :fields="getHeaders" :data="odometer_history" :name="getName" />
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
          :items="odometer_history"
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
    name: 'odometer_history',
    loading: true,
    search: '',
    title: {
      key1: 'vehicle_dashboard.odometer',
      key2: 'vehicle_dashboard.history',
      subtitle: self.vehicle
    },
    actions: [
      {
        key: 'vehicle_dashboard.report_odometer',
        icon: 'speed',
        action: () => alert('report odometer')
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
        key: 'vehicle_dashboard.odometer',
        width: 'auto',
        align: 'left',
        sortable: true,
        value: 'odometer'
      },
      {
        key: 'vehicle_dashboard.type',
        width: 'auto',
        align: 'left',
        sortable: true,
        value: 'type'
      }
    ],
    odometer_history: []
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
    let url = `/vehicle/odometer/${this.vehicle}`
    // fetch the data when the view is created and the data is already being observed.
    this.$http
      .get(url)
      .then(response => {
        this.odometer_history = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    getColor: type => {
      switch (true) {
        case /fuel/i.test(type):
          return 'info'
        case /maint/i.test(type):
          return 'primary'
        default:
          return 'secondary'
      }
    }
  }
}
</script>

<style></style>
