<template>
  <div>
    <v-card
      color="primary"
      :style="{
        position: 'fixed',
        left: 0,
        right: 0,
        top: '64px',
        cursor: 'auto',
        width: '100vw',
        minWidth: '100vw',
        zIndex: 5,
      }"
      elevation="0"
      tile
    >
      <v-container fluid>
        <v-row>
          <v-col v-for="(category, i) in categories" :key="i" sm="4" xl="2">
            <v-subheader class="font-weight-medium" v-text="$t(category.key)" />
            <v-divider />
            <v-list color="transparent">
              <v-list-item
                v-for="(item, j) in category.items"
                :key="j"
                :to="item.to"
                class="text-capitalize caption"
                style="min-height:24px;"
                dense
                link
                v-text="$t(item.key)"
              />
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'MegaMenu',
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>