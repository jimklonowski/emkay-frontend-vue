<template>
  <v-card :elevation="elevation" :width="width">
    <v-card-title v-text="'Login'" />
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <p>{{ text }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    elevation: {
      type: Number,
      default: 12
    },
    width: {
      type: [String,Number],
      default: '600px'
    },
    text: {
      type: String,
      default: 'default text'
    }
  }
}
</script>

<style>

</style>