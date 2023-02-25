import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { PATHS } from '../../router/paths'

import styles from './Page404.module.scss'

const Page404: FC = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t('notFound')}</h1>
      <p onClick={() => navigate(-1)} className={styles.text}>
        {t('keepCalm')}
      </p>
    </div>
  )
}

export default Page404
