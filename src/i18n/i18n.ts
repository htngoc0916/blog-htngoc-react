import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import ns1 from './en/ns1.js'
import ns2 from './en/ns2.js'

//https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
export const defaultNS = 'ns1'
export const resources = {
  en: {
    ns1,
    ns2
  }
} as const

i18next.use(initReactI18next).init({
  lng: 'en',
  defaultNS,
  resources
})
