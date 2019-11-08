<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="true"
    transition="slide-y-transition"
    z-index="3"
    left
  >
    <template #activator="{ on }">
      <v-btn color="rgba(255, 255, 255, 0.8)" dark icon v-on="on">
        <v-icon v-text="'mdi-dots-horizontal'" />
      </v-btn>
    </template>
    <v-list nav dense>
      <slot name="actions"></slot>
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
  })
}
</script>

<style>

</style>