import { useNavigate } from 'react-router-dom'

import { PATHS } from '../../router/paths'

export const useLogoutPage = () => {
  const navigate = useNavigate()

  const onCancel = () => {
    navigate(PATHS.FEED)
  }

  const onLogout = () => {
    localStorage.removeItem('userId')
    navigate(PATHS.LOGIN)
  }

  return {
    onCancel,
    onLogout,
  }
}
