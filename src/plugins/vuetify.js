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
        anchor: '#4F286C',  // emkay purple
        primary: '#4F286C',
        accent: '#4F286C',
        //secondary: '',
        //success: '',
        //info: '',
        warning: '#F68820'  // emkay orange
        //error: ''
      },
      dark: {
        anchor: '#BF8CF8',  // even lighter purple
        primary: '#7A57A5', // lighter purple
        accent: '#BF8CF8',  // even lighter purple
        // secondary: '',
        // success: '',
        // info: '',
        warning: '#F68820'  // emkay orange
        // error: ''
      }
    }
  },
  icons: {
    //iconfont: 'md'
    iconfont: 'mdi'
  }
})
