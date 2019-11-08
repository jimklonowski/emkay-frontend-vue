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
    </v-toolbar>
    <v-divider />
    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :items="vehicle_documents"
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

        <template v-slot:item.actions="{ item }">
          <v-btn icon small text @click="downloadDoc(item)">
            <v-icon small>
              get_app
            </v-icon>
          </v-btn>
          <v-btn icon small text @click="deleteDoc(item)">
            <v-icon small>
              delete
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import ToolbarTitle from '@/modules/core/components/ToolbarTitle'
export default {
  name: 'Documents',
  components: {
    ToolbarTitle
  },
  data: self => ({
    loading: true,
    search: '',
    title: {
      key1: 'vehicle_dashboard.vehicle',
      key2: 'vehicle_dashboard.documents',
      subtitle: self.$route.params.vehicle
    },
    vehicle: '',
    headers: [
      {
        key: 'common.date',
        align: 'left',
        sortable: true,
        value: 'date'
      },
      {
        key: 'vehicle_dashboard.type',
        align: 'left',
        sortable: true,
        value: 'type'
      },
      {
        key: 'common.actions',
        align: 'left',
        sortable: false,
        value: 'actions'
      }
    ],
    vehicle_documents: []
  }),
  created() {
    let url = `/vehicle/documents/${this.vehicle}`
    this.$http
      .get(url)
      .then(response => {
        this.vehicle_documents = response.data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    deleteDoc(item) {
      alert(`Deleting item at ${item.download}`)
    },
    downloadDoc(item) {
      alert(`Downloading item at ${item.download}`)
    }
  }
}
</script>

<style>

</style>