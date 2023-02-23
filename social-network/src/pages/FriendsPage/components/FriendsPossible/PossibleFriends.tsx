import { FC } from 'react'

import styles from './PossibleFriends.module.scss'

const PossibleFriends: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>possible friends</div>
      <div className={styles.friends}></div>
    </div>
  )
}

export default PossibleFriends
