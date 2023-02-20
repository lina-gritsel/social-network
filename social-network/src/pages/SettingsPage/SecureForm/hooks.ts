import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { deleteUser } from '../../../api'
import { PATHS } from '../../../router/paths'

export const useSecureForm = () => {
  const navigate = useNavigate()

  const userId = JSON.parse(localStorage.getItem('userId')) as string

  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const deleteAccount = async (id: string) => {
    const { status } = await deleteUser(id)

    if (status === 204) {
      navigate(PATHS.REGISTRATION)
      localStorage.removeItem('userId')
    }
  }

  return {
    open,
    userId,
    handleOpen,
    handleClose,
    deleteAccount,
  }
}
