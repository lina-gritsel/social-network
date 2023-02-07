import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './Page404.module.scss'

const Page404: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t('notFound')}</h1>
      <p className={styles.text}>{t('keepCalm')}</p>
    </div>
  )
}

export default Page404
