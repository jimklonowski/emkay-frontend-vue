import i18n from '@/plugins/i18n'
import { helpers } from 'vuelidate/lib/validators'

/**
 * isLength(n) validator for vuelidate
 */
export const isLength = length => value => helpers.len(value) === length


/**
 * 
 * @param {String} msgKey message i18n key
 * @param {String} fieldKey field name i18n key
 */
export const translateError = (msgKey, fieldKey) => {
  let attribute = typeof fieldKey === 'string' ? i18n.t(fieldKey) : fieldKey
  return i18n.t(msgKey, { attribute })
}