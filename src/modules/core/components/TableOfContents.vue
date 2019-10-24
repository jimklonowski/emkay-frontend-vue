<template>
  <div v-scroll="onScroll" class="mb-12" v-on="$listeners">
    <slot name="top" />
    <ul class="toc my-5">
      <li v-t="'common.contents'" class="pl-4 mb-2 body-1" />
      <li v-for="(item, index) in toc" :key="index" class="mb-2">
        <a
          :href="item.target"
          :class="{ 'grey--text': activeIndex !== index }"
          :style="{ borderColor: activeIndex === index ? 'inherit' : null }"
          class="body-2 d-block"
          @click.stop.prevent="goTo(`#${item.id}`, options)"
          v-text="$t(item.key)"
        />
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
import goTo from 'vuetify/lib/services/goto'
import { clearTimeout, setTimeout } from 'timers'
export default {
  props: {
    tocItems: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    activeIndex: 0,
    currentOffset: 0,
    toc: []
  }),
  computed: {
    options() {
      return {
        duration: 500,
        offset: 48,
        easing: 'easeInOutCubic'
      }
    }
  },
  mounted() {
    if (this.tocItems) {
      this.toc = this.tocItems
    }
  },
  methods: {
    goTo,
    onScroll() {
      this.currentOffset =
        window.pageYOffset || document.documentElement.offsetTop
      clearTimeout(this.timeout)
      this.timeout = setTimeout(this.findActiveIndex, 50)
    },
    findActiveIndex() {
      const list = this.toc.slice().reverse()
      if (this.currentOffset < 100) {
        this.activeIndex = 0
        return
      }
      const index = list.findIndex(item => {
        const section = document.getElementById(item.id)
        if (!section) return false
        return section.offsetTop - 100 < this.currentOffset
      })
      const lastIndex = list.length
      this.activeIndex = index > -1 ? lastIndex - 1 - index : lastIndex
    }
  }
}
</script>
<style>
.toc {
  list-style-type: none !important;
  margin: 0;
  padding: 0 !important;
  text-align: left;
  width: 100%;
  white-space: nowrap;
}
.toc li {
  list-style: none;
}
.toc li a {
  text-decoration: none;
  border-left: 2px solid transparent;
  padding-left: 16px;
  transition: color 0.1s ease-in;
}
</style>