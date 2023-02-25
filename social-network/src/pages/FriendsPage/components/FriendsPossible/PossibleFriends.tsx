import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './PossibleFriends.module.scss'

const PossibleFriends: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <div className={styles.header}>{t('mightLike')}</div>
      <div className={styles.friends}></div>
    </div>
  )
}

export default PossibleFriends
