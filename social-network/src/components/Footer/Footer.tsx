import { FC } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/rsSchool.svg'
import copyright from '../../assets/copyright.svg'

import { GITHUB_LINKS } from './constants'

import styles from './Footer.module.scss'

const Footer: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.year}>
        <img className={styles.copyright} src={copyright} alt="copyright" />
        <div className={styles.year}>2023</div>
      </div>
      <div className={styles.authors}>
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
      <Link to={GITHUB_LINKS.RS_SCHOOL} target="_blank">
        <img className={styles.logo} src={logo} />
      </Link>
    </div>
  )
}

export default Footer
