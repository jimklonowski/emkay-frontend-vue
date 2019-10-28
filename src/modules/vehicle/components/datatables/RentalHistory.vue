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
                    <json-excel v-t="'common.export_to_excel'" :fields="getHeaders" :data="rental_history" :name="getName" />
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
          :items="rental_history"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          :loading="loading"
          class="striped"
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
    name: 'rental_history',
    loading: true,
    search: '',
    title: {
      key1: 'vehicle_dashboard.rental',
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
        key: 'vehicle_dashboard.reason',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'reason'
      },
      {
        key: 'vehicle_dashboard.voucher',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'voucher'
      },
      {
        key: 'vehicle_dashboard.rental_rate',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'rate'
      },
      {
        key: 'vehicle_dashboard.days',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'days'
      },
      {
        key: 'vehicle_dashboard.total_amount',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'total'
      }
    ],
    rental_history: []
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
    let url = `/vehicle/rentals/${this.vehicle}`

    this.$http
      .get(url)
      .then(response => {
        this.rental_history = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    //...mapActions([FETCH_RENTAL_HISTORY])
  }
}
</script>

<style></style>
