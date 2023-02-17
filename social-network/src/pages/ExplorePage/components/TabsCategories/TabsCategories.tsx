import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import Button from '../../../../components/Button'

import styles from './TabsCategories.module.scss'
import { categories } from './constants'

interface TabsCategoriesProps {
  onChange: (value: string) => void
  className?: string
  category: string
}

const TabsCategories: FC<TabsCategoriesProps> = ({
  category,
  onChange,
  className,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.tabs}>
      {categories.map((option, index) => (
        <Button
          key={index}
          className={classNames(
            { [styles.activeTab]: category === option },
            className,
          )}
          onClick={() => onChange(option)}
        >
          {t(option).toUpperCase()}
        </Button>
      ))}
    </div>
  )
}

export default TabsCategories
