import { FC, ReactNode } from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

interface ButtonProps {
  className?: string
  children: ReactNode
  isDisabled?: boolean
  outlined?: boolean
  onClick?: any
  type?: 'submit'
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  outlined,
  isDisabled = false,
  onClick,
  type,
}) => {
  return (
    <button
      type={type}
      className={classNames(
        styles.primaryButton,
        { [styles.outlined]: outlined },
        { [styles.disabled]: isDisabled },
        className,
      )}
      onClick={!isDisabled ? onClick : null}
    >
      {children}
    </button>
  )
}

export default Button
