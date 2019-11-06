<template>
  <v-footer dark>
    <v-container>
      <v-row justify="center">
        <v-col v-for="(category, i) in categories" :key="i" cols="12" sm="4" lg="2" :class="category.class">
          <div class="overline mb-2">
            {{ $t(category.key) }}
          </div>
          <ul class="pl-0" style="list-style:none;">
            <li v-for="(item, j) in category.items" :key="j">
              <a href="#" class="white--text caption font-weight-light" style="text-decoration:none;">{{ $t(item.key) }}</a>
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-divider class="mb-8 my-md-12" />
      <v-row class="caption font-weight-light">
        <v-col cols="6" class="text-right">&copy; 2019 EMKAY, Inc.</v-col>
        <v-col cols="6">simple. better. different.</v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    categories: [
      {
        key: 'navigation.about',
        class: 'text-left',
        items: [
          {
            key: 'navigation.about_emkay'
          },
          {
            key: 'navigation.blog'
          },
          {
            key: 'navigation.careers'
          },
          {
            key: 'navigation.contact'
          }
        ]
      },
      {
        key: 'navigation.more',
        class: 'text-center',
        items: [
          {
            key: 'navigation.press_releases'
          },
          {
            key: 'navigation.leadtime_guides'
          },
          {
            key: 'navigation.fleet_incentives'
          },
          {
            key: 'navigation.automotive_links'
          }
        ]
      },
      {
        key: 'navigation.technology',
        class: 'text-right',
        items: [
          {
            key: 'navigation.celsius'
          },
          {
            key: 'navigation.driver_360'
          },
          {
            key: 'navigation.fleet_360'
          },
          {
            key: 'navigation.fleet_exchange'
          },
          {
            key: 'navigation.geotab'
          }
        ]
      }
    ]
  })
}
</script>

<style>

</style>