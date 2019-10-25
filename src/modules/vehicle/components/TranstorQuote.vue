<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, name, key) in quote" cols="12" :key="key">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>      
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['quote'],
  created() {
    console.log('quote in child component:')
    console.log(this.quote)
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