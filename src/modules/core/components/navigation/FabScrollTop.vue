<template>
  <v-fab-transition>
    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      aria-label="Scroll to top"
      title="Scroll to top"
      fab
      dark
      fixed
      bottom
      right
      large
      color="primary lighten-2"
      @click="toTop"
    >
      <v-icon v-text="'keyboard_arrow_up'" />
    </v-btn>
  </v-fab-transition>
</template>

<script>
/**
 * Floating Action Button for smooth scrolling to top of page
 */
export default {
  data: () => ({
    fab: false
  }),
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 100
    },
    toTop() {
      //this.$router.push({ hash: '' })
      this.$vuetify.goTo(0)
    }
  }
}
</script>

<style>

</style>