<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <v-subheader>
          <v-icon color="info" class="mr-4">info</v-icon>
          {{ $t('vehicle_dashboard.vehicle_information') }}
          <!-- Transport/Storage for {{this.vehicle_summary.vehicle_description}} -->
        </v-subheader>
      </v-expansion-panel-header>
      <v-divider />
      <v-expansion-panel-content>
        <v-row dense>
          <v-col cols="12" md="6" lg="3" class="py-0">
            <v-list two-line>
              <v-list-item>
                <v-list-item-avatar v-if="showAvatars">
                  <v-icon>person</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle v-text="$t('transtor.driver')" />
                  <v-list-item-title v-text="vehicle_summary.driver" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar v-if="showAvatars">
                  <v-icon>drive_eta</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle v-text="$t('transtor.center')" />
                  <v-list-item-title v-text="vehicle_summary.center" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="6" lg="3" class="py-0">
            <v-list two-line>
              <v-list-item>
                <v-list-item-avatar v-if="showAvatars">
                  <v-icon>drive_eta</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle v-text="$t('transtor.vehicle_description')" />
                  <v-list-item-title v-text="vehicle_summary.vehicle_description" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar v-if="showAvatars">
                  <v-icon>color_lens</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle v-text="$t('transtor.vehicle_color')" />
                  <v-list-item-title v-text="vehicle_summary.vehicle_color" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="6" lg="3" class="py-0">
            <v-list two-line>
              <v-list-item>
                <v-list-item-avatar v-if="showAvatars">
                  <v-icon></v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle v-text="$t('transtor.vehicle_number')" />
                  <v-list-item-title v-text="vehicle_summary.vehicle_number" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar v-if="showAvatars">
                  <v-icon></v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle v-text="$t('transtor.client_vehicle_number')" />
                  <v-list-item-title v-text="vehicle_summary.client_vehicle_number" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="6" lg="3" class="py-0">
            <v-list two-line>
              <v-list-item>
                <v-list-item-avatar v-if="showAvatars">
                  <v-icon></v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle v-text="$t('transtor.vin')" />
                  <v-list-item-title v-text="vehicle_summary.vin" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar v-if="showAvatars">
                  <v-icon></v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle v-text="$t('transtor.plate')" />
                  <v-list-item-title v-text="`${vehicle_summary.plate_state_province} ${vehicle_summary.plate}`" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <!-- <v-col>
            <v-simple-table dense>
              <template #default>
                <tbody>
                  <tr v-for="(item, name, key) in vehicle_summary" :key="key">
                    <td class="text-right" style="width:50%;">{{ $t(`transtor.${name}`) }}</td>
                    <td>{{ item }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col> -->
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  data: () => ({
    panel: [],
    loading: false,
    showAvatars: false,
    vehicle_summary: {
      driver_name: '',
      center: '',
      client_vehicle_number: '',
      vehicle_number: '',
      vin: '',
      vehicle_description: '',
      vehicle_color: '',
      plate_number: '',
      plate_state_province: ''
    }
  }),
  created() {
    this.loading = true
    let url = `/vehicle/summary/${this.$route.params.vehicle}`
    this.$http
      .get(url)
      .then(response => {
        this.vehicle_summary = response.data.vehicle_summary
        //debugger
      })
      .catch(error => {
        //console.error(error)
        this.errorMessage = error.response.data.error
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style>

</style>