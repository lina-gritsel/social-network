import classNames from 'classnames'
import { FC } from 'react'
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
  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.menuItem, {
          [styles.active]: activeMenuItem === Tabs.FRIENDS,
        })}
        onClick={() => setActiveMenuItem(Tabs.FRIENDS)}
      >
        my friends
      </div>
      <div
        className={classNames(styles.menuItem, {
          [styles.active]: activeMenuItem === Tabs.FOLLOWERS,
        })}
        onClick={() => setActiveMenuItem(Tabs.FOLLOWERS)}
      >
        followers
      </div>
      <div
        className={classNames(styles.menuItem, {
          [styles.active]: activeMenuItem === Tabs.FOLLOWINGS,
        })}
        onClick={() => setActiveMenuItem(Tabs.FOLLOWINGS)}
      >
        followings
      </div>
    </div>
  )
}

export default FriendsMenu
