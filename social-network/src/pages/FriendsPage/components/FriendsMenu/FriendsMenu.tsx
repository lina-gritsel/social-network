import classNames from 'classnames'
import { FC, useState } from 'react'

import styles from './FriendsMenu.module.scss'

enum Tabs {
  FRIENDS = 'friedns',
  FOLLOWINGS = 'followings',
  FOLLOWERS = 'followers',
}

const FriendsMenu: FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<Tabs>(Tabs.FRIENDS)

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
