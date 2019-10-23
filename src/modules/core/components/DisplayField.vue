<template>
  <v-list-item-content class="py-0 px-3">
    <v-list-item-subtitle :class="$config.LABEL_CLASS" v-text="label" />
    <v-list-item-title :class="$config.FIELD_CLASS" v-text="value" />
  </v-list-item-content>
</template>

<script>
export default {
  props: ['label','value']
}
</script>
<style>
.theme--light .display-label {
  color: rgba(0,0,0,0.54) !important;
  font-size: 12px !important;
}
.theme--light .display-field {
  color: rgba(0, 0, 0, 0.87) !important;
  font-size: 16px !important;
}
.theme--dark .display-label {
  color: rgba(255, 255, 255, 0.54) !important;
  font-size: 12px !important;
}
.theme--dark .display-field {
  color: rgba(255, 255, 255, 0.87) !important;
  font-size: 16px !important;
}
</style>
