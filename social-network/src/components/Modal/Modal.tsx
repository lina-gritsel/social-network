import { FC, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
} from '@mui/material'

import styles from './Modal.module.scss'

interface ModalProps {
  open: boolean
  onClose?: () => void
  title?: string
  content?: ReactNode | JSX.Element
  onConfirm?: () => void
  className?: string
  isDialogActions?: boolean
}

const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
  className,
  isDialogActions = true,
}) => {
  return (
    <Dialog className={className} open={open} onClose={onClose}>
      <DialogTitle className={styles.title}>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      {isDialogActions && (
        <DialogActions>
          <Button onClick={onConfirm} color="primary">
            Confirm
          </Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default Modal
