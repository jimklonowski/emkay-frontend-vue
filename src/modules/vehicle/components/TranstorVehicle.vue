<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card :loading="loading" elevation="1">
          <v-card-title class="info white--text">Current Vehicle</v-card-title>
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
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
        console.error(error)
        this.errorMessage = 'error occurred!!'
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style>

</style>