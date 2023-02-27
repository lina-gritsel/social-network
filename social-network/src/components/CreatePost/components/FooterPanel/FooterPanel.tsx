import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { MoodOutlined, InsertPhotoOutlined } from '@mui/icons-material'
import styles from './FooterPanel.module.scss'

interface FooterPanelProps {
  openAddImageModal: () => void
  openEmojiModal: () => void
}

const FooterPanel: FC<FooterPanelProps> = ({
  openAddImageModal,
  openEmojiModal,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.createIcons}>
      <div className={styles.createItem} onClick={openAddImageModal}>
        <InsertPhotoOutlined fontSize="medium" className={styles.icon} />
        {t('photo')}
      </div>
      <div className={styles.createItem} onClick={openEmojiModal}>
        <MoodOutlined fontSize="medium" className={styles.icon} />
        {t('feeling')}
      </div>
    </div>
  )
}

export default FooterPanel