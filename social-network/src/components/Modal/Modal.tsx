import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
} from '@mui/material'
import { FC, ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose?: () => void
  title?: string
  content?: ReactNode
  onConfirm?: () => void
  className?: string
}

const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
  className,
}) => {
  return (
    <Dialog className={className} open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal
