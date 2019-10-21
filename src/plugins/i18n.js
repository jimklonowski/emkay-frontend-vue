import Vue from 'vue'
import VueI18n from 'vue-i18n'
//import axios from 'axios'

//const en = import(/* webpackChunkName: "lang-[request]" */ `@/locales/en.json`)
//debugger
import en from '../locales/en.json'

Vue.use(VueI18n)

export const languages = [
  {
    name: 'English',
    locale: 'en',
    country: 'us',
    fallback: true
  },
  {
    name: 'English (Metric)',
    locale: 'en_CA',
    country: 'ca',
    alternate: 'en'
  },
  {
    name: 'Français',
    locale: 'fr',
    country: 'fr'
  }
]



const options = {
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  //messages: import(/* webpackChunkName: "lang-[request]" */ `@/locales/en.json`)
  messages: { en }
}

const loadedLanguages = ['en']  //default preloaded language

function setI18nLanguage(lang) {
  i18n.locale = lang
  //axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang) {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "lang-[request]" */ `@/locales/${lang}.json`).then(messages => {
    i18n.setLocaleMessage(lang, messages.default)
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  })
}

const i18n = new VueI18n(options)

export default i18n
