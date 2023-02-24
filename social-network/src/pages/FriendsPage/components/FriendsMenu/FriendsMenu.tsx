import { FC } from 'react'
import classNames from 'classnames'

import { Tab } from '../../../../hooks/useTabs'

import styles from './FriendsMenu.module.scss'

interface FriendsMenuProps {
  tabs: Tab[]
  value: string
  setValue: (value: string) => void
}

const FriendsMenu: FC<FriendsMenuProps> = ({ tabs, value, setValue }) => {
  return (
    <div className={styles.container}>
      {tabs.map(({ value: tabValue, label }, index) => (
        <div
          key={index}
          className={classNames(styles.menuItem, {
            [styles.active]: value === tabValue,
          })}
          onClick={() => setValue(tabValue)}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

export default FriendsMenu
