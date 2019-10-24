<template>
  <article>
    <v-card :loading="loading">
      <v-toolbar :class="$config.TOOLBAR_CLASS" dark>
        <toolbar-title :key1="'vehicle_dashboard.toll'" :key2="'vehicle_dashboard.history'" :subtitle="vehicle" />
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
                    <json-excel v-t="'common.export_to_excel'" :fields="getHeaders" :data="toll_history" :name="getName" />
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
          :items="toll_history"
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
    name: 'toll_history',
    loading: true,
    search: '',
    title: {
      key1: 'vehicle_dashboard.toll',
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
        key: 'vehicle_dashboard.description',
        width: '250px',
        align: 'left',
        sortable: true,
        value: 'description'
      },
      {
        key: 'vehicle_dashboard.amount',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'amount'
      }
    ],
    toll_history: []
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
    let url = `/vehicle/tolls/${this.vehicle}`
    this.$http
      .get(url)
      .then(response => {
        this.toll_history = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    //...mapActions([FETCH_TOLL_HISTORY])
  }
}
</script>

<style></style>
