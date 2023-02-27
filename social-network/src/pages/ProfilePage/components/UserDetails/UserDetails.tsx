import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { FIELD_INTO } from '../../constants'

import styles from './UserDetails.module.scss'

const UserDetails: FC<{ userInfo: any }> = ({ userInfo }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.intro}>
      <div className={styles.title}>{t('intro')}</div>
      {FIELD_INTO.map(({ icon, label, link, value }, index) => (
        <div key={index} className={styles.intoItem}>
          <Field
            icon={icon}
            label={label}
            link={link}
            value={userInfo[value]}
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
}: {
  icon: JSX.Element
  label: string
  value: string | number
  link?: string
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

  return <FieldValue />
}
