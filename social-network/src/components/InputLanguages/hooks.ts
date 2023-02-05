import { useTranslation } from 'react-i18next'

export const useInputLanguages = () => {
  const { i18n } = useTranslation()
  const actualLanguage = localStorage.getItem('i18nextLng')

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return {
    actualLanguage,
    changeLanguage,
  }
}
