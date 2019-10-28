<template>
  <v-container>
    <v-row>
      <header class="display-3 col-12">Transport/Storage Quote:</header>
      <v-col>
        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, name, key) in quote" :key="key">
                <td>{{ $t(`transtor.${name}`) }}</td>
                <td>{{ item }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <!-- <v-col v-for="(item, name, key) in quote" cols="12" :key="key">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>       -->
    </v-row>
    <v-row>
      <v-col>
        <v-btn block color="success" :to="{ name: 'transtor-order', params: getParams }">
          {{ $t('vehicle_dashboard.create_order') }}
        </v-btn>
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
  // props: {
  //   vehicle: {
  //     type: String,
  //     default: ''
  //   },
  //   transport_method: {
  //     type: String,
  //     default: ''
  //   },
  //   from: {
  //     type: String,
  //     default: ''
  //   },
  //   to: {
  //     type: String,
  //     default: ''
  //   },
  //   estimated_distance: {
  //     type: String,
  //     default: ''
  //   },
  //   estimated_cost: {
  //     type: String,
  //     default: ''
  //   }
  // },
  
}
</script>

<style>

</style>