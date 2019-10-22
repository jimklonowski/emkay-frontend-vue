import Vue from 'vue'
import VueI18n from 'vue-i18n'
//import store from '@/store'

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

// First language will be used as default language
const supportedLanguages = ['en', 'en_CA', 'fr']
const defaultLanguage = supportedLanguages[0]

const i18n = new VueI18n({
  locale: defaultLanguage,
  fallbackLocale: defaultLanguage
})

export default i18n

const loadedLanguages = []

function setI18nLanguage(lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang, forceLoad = false) {
  lang = supportedLanguages.includes(lang) ? lang : defaultLanguage

  if (forceLoad || i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(`@/locales/${lang}.json`).then(messages => {
        debugger
        i18n.setLocaleMessage(lang, messages.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

(function() {
  loadLanguageAsync(defaultLanguage, true)
})()

// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// //import store from '@/store'
// Vue.use(VueI18n)

// import en from '@/locales/en.json'

// export const defaultLanguage = 'en'


// export const languages = [
//   {
//     name: 'English',
//     locale: 'en',
//     country: 'us',
//     fallback: true
//   },
//   {
//     name: 'English (Metric)',
//     locale: 'en_CA',
//     country: 'ca',
//     alternate: 'en'
//   },
//   {
//     name: 'Français',
//     locale: 'fr',
//     country: 'fr'
//   }
// ]

// const options = {
//   locale: process.env.VUE_APP_I18N_LOCALE || defaultLanguage,
//   fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || defaultLanguage,
//   messages: { en }
// }

// const i18n = new VueI18n(options)
// export default i18n

// const loadedLanguages = [defaultLanguage]

// if (localStorage.getItem('lang') !== null && defaultLanguage !== localStorage.getItem('lang')) {
//   loadLanguageAsync(localStorage.lang)
// }

// function setI18nLanguage(lang) {
//   i18n.locale = lang
//   document.querySelector('html').setAttribute('lang', lang)
//   return lang
// }

// export function loadLanguageAsync(lang = defaultLanguage) {
//   return new Promise(resolve => {
//     localStorage.setItem('lang', lang)
//     if (i18n.locale !== lang) {
//       if (!loadedLanguages.includes(lang)) {
//         return import(/* webpackChunkName: "lang-[request]" */ `@/locales/${lang}.json`).then(msg => {
//           i18n.setLocaleMessage(lang, msg)
//           loadedLanguages.push(lang)
//           return setI18nLanguage(lang)
//         })
//       }
//       return resolve(setI18nLanguage(lang))
//     }
//     return resolve(lang)
//   })
// }






// // export async function loadMessages(locale) {
// //   debugger
// //   if (Object.keys(i18n.getLocaleMessage(locale)).length === 0) {
// //     const messages = await import(/* webpackChunkName: '[request]' */ `@/locales/${locale}.json`)
// //     i18n.setLocaleMessage(locale, messages)
// //   }
// //   if (i18n.locale !== locale) {
// //     i18n.locale = locale
// //   }
// // }

// // (async function() {
// //   await loadMessages(store.getters['auth/currentLocale'])
// // })()




// // function setI18nLanguage(lang) {
// //   i18n.locale = lang
// //   //axios.defaults.headers.common['Accept-Language'] = lang
// //   document.querySelector('html').setAttribute('lang', lang)
// //   return lang
// // }

// // export function loadLanguageAsync(lang = defaultLanguage) {
// //   return new Promise(resolve => {
// //     if (i18n.locale !== lang) {
// //       if (!loadedLanguages.includes(lang)) {
// //         return import(/* */ `@/locales/${lang}.json`).then(msg => {
// //           i18n.setLocaleMessage(lang, msg.default)
// //           loadedLanguages.push(lang)
// //           return setI18nLanguage(lang)
// //         })
// //       }
// //       return resolve(setI18nLanguage(lang))
// //     }
// //     return resolve(lang)
// //   })
// // }


// // const loadedLanguages = ['en']  //default preloaded language

// // function setI18nLanguage(lang) {
// //   i18n.locale = lang
// //   //axios.defaults.headers.common['Accept-Language'] = lang
// //   document.querySelector('html').setAttribute('lang', lang)
// //   return lang
// // }

// // export async function loadLanguageAsync(lang) {
// //   debugger
// //   // If the same language
// //   if (i18n.locale === lang) {
// //     return Promise.resolve(setI18nLanguage(lang))
// //   }

// //   // If the language was already loaded
// //   if (loadedLanguages.includes(lang)) {
// //     return Promise.resolve(setI18nLanguage(lang))
// //   }

// //   // If the language hasn't been loaded yet
// //   return import(/* webpackChunkName: "lang-[request]" */ `@/locales/${lang}.json`).then(messages => {
// //     i18n.setLocaleMessage(lang, messages.default)
// //     loadedLanguages.push(lang)
// //     return setI18nLanguage(lang)
// //   })
// // }


// // export async function loadLanguageAsync(locale) {
// //   if (Object.keys(i18n.getLocaleMessage(locale)).length === 0) {
// //     const messages = await import(/* */ `@/locales/${locale}.json`)
// //     debugger
// //     i18n.setLocaleMessage(locale, messages.default)
// //   }
// //   if (i18n.locale !== locale) {
// //     i18n.locale = locale
// //   }
// // }

// // // eslint-disable-next-line no-unexpected-multiline
// // ;(async function() {
//   //   await loadLanguageAsync(store.getters['auth/currentLocale'])
//   // })()