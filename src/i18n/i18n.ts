import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import * as vi from '~/language/vi'
import * as en from '~/language/en'
import * as ko from '~/language/ko'

export const defaultNS = 'vi'

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
  convertDetectedLanguage: () => {
    const defaultLanguage = localStorage.getItem('i18nextLng')
    if (defaultLanguage === null || defaultLanguage === 'en-US') {
      return 'vi'
    }
    return defaultLanguage
  }
}

export const resources = {
  en,
  vi,
  ko
} as const

i18n.use(initReactI18next).use(LanguageDetector).init({
  detection: DETECTION_OPTIONS,
  resources,
  defaultNS,
  fallbackLng: 'en'
})

export default i18n
