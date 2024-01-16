import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as vi from '~/language/vi'
import * as en from '~/language/en'
import * as kr from '~/language/kr'

export const defaultNS = 'vi'
export const resources = {
  en,
  vi,
  kr
} as const

i18n.use(initReactI18next).init({
  lng: 'vi',
  ns: ['vi', 'en', 'kr'],
  fallbackLng: 'en',
  defaultNS,
  resources
})

export default i18n
