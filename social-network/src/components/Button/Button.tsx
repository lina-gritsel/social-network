import { FC, MouseEvent, ReactNode } from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

interface ButtonProps {
  className?: string
  children: ReactNode
  isDisabled?: boolean
  outlined?: boolean
  onClick?: (args?: MouseEvent<HTMLButtonElement> | TouchEvent) => void
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  outlined,
  isDisabled = false,
  onClick,
}) => {
  return (
    <button
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
