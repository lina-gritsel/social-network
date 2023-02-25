import { FC } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { Tab } from '../../../../hooks/useTabs'

import styles from './FriendsMenu.module.scss'

interface FriendsMenuProps {
  tabs: Tab[]
  value: string
  setValue: (value: string) => void
}

const FriendsMenu: FC<FriendsMenuProps> = ({ tabs, value, setValue }) => {
  const { t } = useTranslation()

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
          {t(label).split(':')[0]}
        </div>
      ))}
    </div>
  )
}

export default FriendsMenu
