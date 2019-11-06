<template>
  <v-row>
    <v-col cols="12">
      <v-breadcrumbs :items="breadcrumbs" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'breadcrumb-row',
  computed: {
    breadcrumbs() {
      let currentPaths = this.$route.path.split("/")
      currentPaths.shift() // first path is empty /, so omit it from array
      let self = this
      let crumbs = []
      currentPaths.forEach(function(path, index) {
        //console.log(path)
        if (index >= self.$route.matched.length) return
        let breadcrumb = self.$route.matched[index].meta.breadcrumb
        crumbs.push({
          exact: true,
          text: breadcrumb.useParam ? self.$route.params.vehicle : self.$t(breadcrumb.key),
          to: breadcrumb.path,
          disabled: self.$route.name === self.$route.matched[index].name
        })
      })
      //debugger
      return crumbs
    }
  }
}
</script>

<style>

</style>