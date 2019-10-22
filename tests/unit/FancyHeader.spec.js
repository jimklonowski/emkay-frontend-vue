import Vue from 'vue'
import FancyHeader from '@/components/FancyHeader.vue'

function mountComponentWithProps(Component, propsData) {
  const Constructor = Vue.extend(Component)
  const vm = new Constructor({ propsData }).$mount()
  return vm.$el
}

describe('FancyHeader.vue', () => {
  it('should have correct title', () => {
    const title = 'Title'
    const subtitle = 'Subtitle'
    const header = mountComponentWithProps(FancyHeader, { title, subtitle })
    const titleData = header.textContent;
    expect(titleData).toContain(title, subtitle)
  })
})