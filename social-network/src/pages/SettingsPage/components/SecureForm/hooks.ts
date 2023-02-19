import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { deleteUser } from '../../../../api'
import { PATHS } from '../../../../router/paths'

export const useSecureForm = () => {
  const navigate = useNavigate()

  const {
    visible: visibleDeleteAccountModal,
    open: openDeleteAccountModal,
    close: closeDeleteAccountModal,
  } = useDeleteAccountModal()

  const userId = JSON.parse(localStorage.getItem('userId')) as string

  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const deleteAccount = async () => {
    const { status } = await deleteUser(userId)

    if (status === 204) {
      navigate(PATHS.REGISTRATION)
      localStorage.removeItem('userId')
    }
  }

  return {
    open,
    userId,
    visibleDeleteAccountModal,
    handleOpen,
    handleClose,
    deleteAccount,
    openDeleteAccountModal,
    closeDeleteAccountModal,
  }
}

export const useDeleteAccountModal = () => {
  const [visible, setVisible] = useState<boolean>(false)

  return {
    visible,
    open: () => setVisible(true),
    close: () => setVisible(false),
  }
}
