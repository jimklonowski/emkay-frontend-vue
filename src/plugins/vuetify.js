import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { en, fr, en as en_CA } from 'vuetify/lib/locale'

import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { en, fr, en_CA },
    current: 'en'
  },
  theme: {
    themes: {
      light: {
        primary: '#2d1258'
      },
      dark: {
        primary: '#212121'
      }
      // light: {
      //   anchor: '#4F286C',  // emkay purple
      //   primary: '#4F286C',
      //   accent: '#4F286C',
      //   warning: '#F68820'  // emkay orange
      // },
      // dark: {
      //   anchor: '#BF8CF8',  // even lighter purple
      //   primary: '#7A57A5', // lighter purple
      //   accent: '#BF8CF8',  // even lighter purple
      //   warning: '#F68820'  // emkay orange
      // }
    }
  },
  icons: {
    //iconfont: 'md'
    iconfont: 'mdi'
  }
})
