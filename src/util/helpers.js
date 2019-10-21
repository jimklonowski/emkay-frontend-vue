import i18n from '@/plugins/i18n'
//import { helpers } from 'vuelidate/lib/validators'

export const translateError = (msgKey, fieldKey) => {
  let attribute = typeof fieldKey === 'string' ? i18n.t(fieldKey) : fieldKey
  return i18n.t(msgKey, { attribute })
}