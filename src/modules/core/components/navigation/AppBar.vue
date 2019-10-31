<template>
  <v-app-bar :class="$config.APP_BAR_CLASS" v-bind="{height}" app dark>
    <v-app-bar-nav-icon class="hidden-lg-and-up" @click.stop="" />
    <v-toolbar-items class="hidden-md-and-down">
      <template v-for="(item, i) in items">
        <v-btn
          v-if="item.categories"
          :key="i"
          :ref="item.ref"
          @mouseover="showMenu(item)"
          @mouseleave="hideMenu(item)"
          small
          text
          dark
        >
          <span>
            {{ $t(item.key) }}
            <v-icon>arrow_drop_down</v-icon>
          </span>
          <transition name="fade">
            <mega-menu
              v-show="item.visible"
              :categories="item.categories"
            />
          </transition>
        </v-btn>
        <v-btn v-else :key="i" :to="item.to" small text dark>
          {{ $t(item.key) }}
        </v-btn>
      </template>
    </v-toolbar-items>
    <v-spacer />
    <v-text-field
      append-icon="search"
      :hint="$t('common.search')"
      :placeholder="$t('common.search_placeholder')"
      hide-details
      style="min-width:300px;max-width:40%;"
    />
  </v-app-bar>
</template>

<script>
import MegaMenu from '@/modules/core/components/navigation/MegaMenu'
export default {
  components: {
    MegaMenu
  },
  props: {
    height: {
      type: [String,Number],
      default: 64
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    showMenu(item) {
      item.visible = true
    },
    hideMenu(item) {
      item.visible = false
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>