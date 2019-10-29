<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-card-title class="display-2 font-weight-light justify-center">Transport/Storage Quote</v-card-title>
          <v-simple-table dense>
            <template #default>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, name, key) in quote" :key="key">
                  <td class="text-right">{{ $t(`transtor.${name}`) }}</td>
                  <td>{{ item }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-card-actions>
            <v-btn block color="success" :to="{ name: 'transtor-order', params: getParams }">
              {{ $t('vehicle_dashboard.create_order') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['quote'],
  created() {
    console.log('quote in child component:')
    console.log(this.$props.quote)
  },
  computed: {
    getParams() {
      return { vehicle: this.$route.params.vehicle, quote: this.$props.quote }
    }
  }  
}
</script>

<style>

</style>