import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '../../components/Button'
import Layout from '../../components/Layout'

import { useLogoutPage } from './hooks'

import styles from './LogoutPage.module.scss'

const LogoutPage: FC = () => {
  const { t } = useTranslation()
  const { onLogout, onCancel } = useLogoutPage()

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.layout}>
          <p className={styles.title}>{t('logoutTitle')}</p>
          <div className={styles.btnBlock}>
            <Button className={styles.cancelBtn} outlined onClick={onCancel}>
              {t('cancel')}
            </Button>
            <Button className={styles.logoutBtn} onClick={onLogout}>
              {t('logout')}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LogoutPage
