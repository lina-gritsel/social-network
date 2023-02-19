import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useAppDispatch } from '../../../../store'
import { setTheme } from '../../../../store/actions'
import { selectTheme } from '../../../../store/selectors'

export const useThemeForm = () => {
  const dispatch = useAppDispatch()
  const theme = useSelector(selectTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleThemeChange = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    dispatch(setTheme(next))
  }

  const checked = theme === 'dark'

  return {
    checked,
    handleThemeChange,
  }
}
