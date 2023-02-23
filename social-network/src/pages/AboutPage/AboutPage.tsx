import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GitHubIcon from '@mui/icons-material/GitHub'

import Layout from '../../components/Layout'
import speech from '../../assets/images/speech.png'
import rsLogo from '../../assets/icons/rsSchool.svg'
import alinaPhoto from '../../assets/images/alina.jpg'
import pashaPhoto from '../../assets/images/pasha.jpg'
import linaGraph from '../../assets/images/lina-graph.jpg'
import alinaGraph from '../../assets/images/alina-graph.jpg'
import pashaGraph from '../../assets/images/pasha-graph.jpg'
import angelinaPhoto from '../../assets/images/angelina.jpg'
import linaDarkGraph from '../../assets/images/lina-graph-dark.jpg'
import alinaDarkGraph from '../../assets/images/alina-graph-dark.jpg'
import pashaDarkGraph from '../../assets/images/pasha-graph-dark.jpg'

import { LINKS } from './constants'

import styles from './AboutPage.module.scss'

const AboutPage: FC = () => {
  const { t } = useTranslation()
  const theme = localStorage.getItem('theme')

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.layout}>
          <div className={styles.line}>
            <div className={styles.block}>
              <div className={styles.authorBlock}>
                <img
                  className={styles.authorPhoto}
                  src={pashaPhoto}
                  alt="Pasha"
                />
                <div className={styles.nameBlock}>
                  <p className={styles.authorName}>Shchuka Pavel</p>
                  <NavLink to={LINKS.PASHA}>
                    <GitHubIcon className={styles.icon} />
                  </NavLink>
                </div>
              </div>
              <img className={styles.speech} src={speech} alt="" />
              <p className={styles.text}>{t('meetYou')}</p>
            </div>
            <p className={styles.description}>{t('firstAboutText')}</p>
            <div className={styles.activityBlock}>
              <p className={styles.activity}>{t('activity')}</p>
              <img
                className={styles.graph}
                src={theme === 'light' ? pashaGraph : pashaDarkGraph}
                alt="graph"
              />
            </div>
          </div>
          <div className={styles.line}>
            <div className={styles.activityBlock}>
              <p className={styles.activity}>{t('activity')}</p>
              <img
                className={styles.graph}
                src={theme === 'light' ? linaGraph : linaDarkGraph}
                alt="graph"
              />
            </div>
            <p className={styles.description}>{t('secondAboutText')}</p>
            <div className={styles.block}>
              <div className={styles.authorBlock}>
                <img
                  className={styles.authorPhoto}
                  src={angelinaPhoto}
                  alt="Angelina"
                />
                <div className={styles.nameBlock}>
                  <p className={styles.authorName}>Angelina Gritsel</p>
                  <NavLink to={LINKS.LINA}>
                    <GitHubIcon className={styles.icon} />
                  </NavLink>
                </div>
              </div>
              <img className={styles.speech} src={speech} alt="" />
              <p className={styles.text}>{t('greatDay')}</p>
            </div>
          </div>
          <div className={styles.line}>
            <div className={styles.block}>
              <div className={styles.authorBlock}>
                <img
                  className={styles.authorPhoto}
                  src={alinaPhoto}
                  alt="Alina"
                />
                <div className={styles.nameBlock}>
                  <p className={styles.authorName}>Alina Maksimovich</p>
                  <NavLink to={LINKS.ALINA}>
                    <GitHubIcon className={styles.icon} />
                  </NavLink>
                </div>
              </div>
              <img className={styles.speech} src={speech} alt="" />
              <p className={styles.text}>{t('youBest')}</p>
            </div>
            <p className={styles.description}>{t('thirdAboutText')}</p>
            <div className={styles.activityBlock}>
              <p className={styles.activity}>{t('activity')}</p>
              <img
                className={styles.graph}
                src={theme === 'light' ? alinaGraph : alinaDarkGraph}
                alt="graph"
              />
            </div>
          </div>
          <div className={styles.footerBlock}>
            <NavLink className={styles.rsLink} to={LINKS.RS_SCHOOL}>
              <img className={styles.rsLogo} src={rsLogo} alt="rsSchool" />
            </NavLink>
            <p className={styles.year}>{t('year')}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage


