<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-toolbar elevation="0">
            <v-toolbar-title class="display-1 font-weight-light justify-center">Your Quote</v-toolbar-title>
          </v-toolbar>
          <v-divider />
          <v-row>
            <v-col cols="12" sm="6">
              <v-list two-line flat>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>drive_eta</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle v-text="$t('vehicle_dashboard.vehicle')" />
                    <v-list-item-title v-text="quote.vehicle_description" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>flight_takeoff</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle v-text="$t('transtor.pickup_postal_code')" />
                    <v-list-item-title v-text="quote.pickup_postal_code" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>flight_land</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle v-text="$t('transtor.delivery_postal_code')" />
                    <v-list-item-title v-text="quote.delivery_postal_code" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" sm="6">
              <v-list two-line flat>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>local_shipping</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle v-text="$t('transtor.transport_method')" />
                    <v-list-item-title>
                      <v-chip small color="accent lighten-2" class="overline" v-text="quote.transport_method" />
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>directions</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle v-text="$t('transtor.estimated_distance')" />
                    <v-list-item-title v-text="quote.estimated_distance" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>attach_money</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle v-text="$t('transtor.estimated_cost')" />
                    <v-list-item-title v-text="quote.estimated_cost" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
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
    //debugger
    //console.log(this.$props.quote)
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