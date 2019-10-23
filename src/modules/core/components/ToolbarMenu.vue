<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="slide-y-transition"
    z-index="3"
    left
  >
    <template #activator="{ on }">
      <v-btn color="rgba(255, 255, 255, 0.8)" dark icon v-on="on">
        <v-icon v-text="'more_vert'" />
      </v-btn>
    </template>
    <v-list nav dense>
      <template v-for="(item, key) in actions">
        <v-list-item :key="key" :color="item.color" @click="item.action">
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-t="item.key" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    actions: {
      type: Array,
      default: () => {}
    }
  },
  data: () => ({
    menu: false
  }),
  methods: {
    showForm(component) {
      let componentProps = { width: 1000, elevation: 6, text: 'This is dynamic text!omg'}
      let modalProps = { width: 1000, height: 'auto' }
      this.$modal.show(component, componentProps, modalProps)
    }
  }
}
</script>

<style>

</style>