import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { PATHS } from '../../../../router/paths'
import { FIELD_INTO } from '../../constants'

import styles from './UserDetails.module.scss'

const UserDetails: FC<{ userInfo: any; userId: string }> = ({
  userInfo,
  userId,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.intro}>
      <div className={styles.title}>{t('intro')}</div>
      {FIELD_INTO.map(({ icon, label, link, value, navLink }, index) => (
        <div key={index} className={styles.intoItem}>
          <Field
            icon={icon}
            label={label}
            link={link}
            navLink={navLink}
            value={userInfo[value]}
            userId={userId}
          />
        </div>
      ))}
    </div>
  )
}

export default UserDetails

const Field = ({
  icon,
  label,
  link,
  value,
  navLink,
  userId,
}: {
  icon: JSX.Element
  label: string
  userId: string
  value: string | number
  link?: string
  navLink?: boolean
}) => {
  const { t } = useTranslation()

  const FieldValue = () => (
    <div className={styles.field}>
      <div>{icon}</div>
      <div className={styles.label}>{t(label)}</div>
      <div className={styles.profileInfo}>{value}</div>
    </div>
  )

  if (link)
    return (
      <a
        className={styles.intoItem}
        href={`${link}/${value}`}
        target="_blank"
        rel="noreferrer"
      >
        <FieldValue />
      </a>
    )
  if (navLink)
    return (
      <NavLink to={`${PATHS.FRIENDS}/${userId}`} className={styles.intoItem}>
        <FieldValue />
      </NavLink>
    )

  return <FieldValue />
}
