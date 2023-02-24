import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Tabs } from '../../types'

import styles from './FriendsMenu.module.scss'

interface FriendsMenuProps {
  activeMenuItem: string
  setActiveMenuItem: (value) => void
}

const FriendsMenu: FC<FriendsMenuProps> = ({
  activeMenuItem,
  setActiveMenuItem,
}) => {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.menuItem, {
          [styles.active]: activeMenuItem === Tabs.FRIENDS,
        })}
        onClick={() => setActiveMenuItem(Tabs.FRIENDS)}
      >{t('myFriends')}
      </div>
      <div
        className={classNames(styles.menuItem, {
          [styles.active]: activeMenuItem === Tabs.FOLLOWERS,
        })}
        onClick={() => setActiveMenuItem(Tabs.FOLLOWERS)}
      >
        {t('followers')}
      </div>
      <div
        className={classNames(styles.menuItem, {
          [styles.active]: activeMenuItem === Tabs.FOLLOWINGS,
        })}
        onClick={() => setActiveMenuItem(Tabs.FOLLOWINGS)}
      >
        {t('following')}
      </div>
    </div>
  )
}

export default FriendsMenu
