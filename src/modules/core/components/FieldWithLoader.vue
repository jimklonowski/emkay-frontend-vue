<template>
  <v-col :cols="schema.cols" :sm="schema.sm" :style="styleObject">
    <v-skeleton-loader v-if="status.isInitializing" type="list-item-two-line" tile />
    <v-text-field
      v-else-if="status.isEditing && schema.mask"
      v-model="modelProp"
      v-mask="schema.mask"
      v-bind="schema"
    />
    <v-text-field v-else-if="status.isEditing && !schema.mask" v-model="modelProp" v-bind="schema" />
    <v-list-item-content v-else class="py-0 px-3">
      <v-list-item-subtitle :class="$config.LABEL_CLASS" v-text="schema.label" />
      <v-list-item-title :class="$config.FIELD_CLASS" v-text="modelProp" />
    </v-list-item-content>
    
  </v-col>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  props: {
    cols: {
      type: [Boolean,String,Number],
      default: 12
    },
    sm: {
      type: [Boolean,String,Number],
      default: false
    },
    md: {
      type: [Boolean,String,Number],
      default: false
    },
    styleObject: {
      type: Object,
      default: () => ({}) //{ return { height: '72px' } }
    },
    model: {
      type: String,
      default: ''
    },
    schema: {
      type: Object,
      default: () => { return { label: '', type: 'text', dense: true }}
    },
    status: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    modelProp: {
      get() { return this.model },
      set(value) { this.$emit('update', value) }
    }
  }
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