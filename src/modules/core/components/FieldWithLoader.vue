<template>
  <v-col :cols="schema.cols" :sm="schema.sm">
    <v-skeleton-loader v-if="schema.isInitializing" type="list-item-two-line" tile />
    <v-text-field
      v-else-if="schema.isEditing && schema.mask"
      v-model="modelProp"
      v-mask="schema.mask"
      v-bind="schema"
    />
    <v-text-field v-else-if="schema.isEditing && !schema.mask" v-model="modelProp" v-bind="schema" />
    <display-field v-else :aria-label="schema.label" :value="modelProp" />
  </v-col>
</template>

<script>
//import { mask } from 'vue-the-mask'
import DisplayField from '@/modules/core/components/DisplayField'

export default {
  components: { DisplayField },
  //directives: { mask },
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
      default: () => { return { height: '72px' } }
    },
    //isInitializing: Boolean,
    //isEditing: Boolean,
    model: {
      type: String,
      default: ''
    },
    schema: {
      type: Object,
      default: () => { return { label: '', type: 'text', dense: true }}
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

</style>