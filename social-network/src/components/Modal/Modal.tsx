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
  ref?: any
  children?: ReactNode
}

const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
  className,
  ref,
  children,
  isDialogActions = true,
}) => {
  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: 0 },
      }}
      ref={ref}
      open={open}
      onClose={onClose}
    >
      {title && <DialogTitle className={styles.title}>{title}</DialogTitle>}
      {children && (
        <DialogContent className={className}>{children}</DialogContent>
      )}
      <DialogContent className={className}>{content}</DialogContent>
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
