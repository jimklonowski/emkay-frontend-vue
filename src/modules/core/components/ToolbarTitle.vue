<template>
  <v-toolbar-title class="text-uppercase" style="color:rgba(255,255,255,0.8);">
    <span v-t="key1" class="font-weight-black" />
    <span v-t="key2" class="font-weight-thin" />
    <v-subheader class="d-inline" dark v-text="subtitle" />
  </v-toolbar-title>
</template>

<script>
export default {
  name: 'ToolbarTitle',
  props: {
    key1: {
      type: String,
      default: ''
    },
    key2: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>