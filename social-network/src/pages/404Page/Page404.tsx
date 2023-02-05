import { FC } from 'react'

import styles from './Page404.module.scss'

const Page404: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404 NOT FOUND</h1>
      <p className={styles.text}>
        Please, keep calm and return to the previous page
      </p>
    </div>
  )
}

export default Page404
