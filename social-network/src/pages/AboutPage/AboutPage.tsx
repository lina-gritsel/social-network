import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import copyright from '../../assets/icons/copyright.svg'
import logo from '../../assets/icons/rsSchool.svg'
import Layout from '../../components/Layout'

import { GITHUB_LINKS } from './constants'

import styles from './AboutPage.module.scss'

const AboutPage: FC = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.authors}>
          {t('authors')}
          <Link to={GITHUB_LINKS.PASHA} target="_blank">
            Pavel Shchuka
          </Link>
          <div className={styles.line}></div>
          <Link to={GITHUB_LINKS.LINA} target="_blank">
            Anhelina Gritsel
          </Link>
          <div className={styles.line}></div>
          <Link to={GITHUB_LINKS.ALINA} target="_blank">
            Alina Maksimovich
          </Link>
        </div>
        <div className={styles.year}>
          {t('year')}
          <img className={styles.copyright} src={copyright} alt="copyright" />
          <div className={styles.year}>2023</div>
        </div>
        <div className={styles.rsSchool}>
          <div>{t('support')}</div>
          <Link to={GITHUB_LINKS.RS_SCHOOL} target="_blank">
            <img className={styles.logo} src={logo} />
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
