<template>
  <v-card :loading="loading">
    <v-form ref="form" @submit.prevent="onSubmit">
      test form
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    onSubmit() {}
  },
}
</script>
