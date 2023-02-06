import {
  FC,
  useState,
  useEffect,
  useRef,
  MouseEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Avatar, TextField } from '@mui/material'

import NewsCreator from '../../components/NewsCreator'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { PATHS } from '../../router/paths'

import { userNews } from '../NewsPage/NewsPageComponents/userNews'
import Modal from '../../components/Modal'

import { FIELD_INTO, BG_IMAGES } from './constants'
import styles from './Profile.module.scss'

const ProfilePage: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [isErrorImg, setIsErrorImg] = useState<boolean>(false)
  const [bgImage, setBgImage] = useState<string>(BG_IMAGES[0])

  useEffect(() => {
    setBgImage(JSON.parse(window.localStorage.getItem("bgImage")));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("bgImage", JSON.stringify(bgImage));
  }, [bgImage]);


  const { t } = useTranslation()

  const errorImg = (e: SyntheticEvent) => {
    setIsErrorImg(true)
    const img = (e.target) as HTMLImageElement
    img.onerror = null
    setBgImage(BG_IMAGES[0]);
    img.src = bgImage
  }

  return (
    <Layout>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        title={t('backgroundTitle')}
        content={<ModalContent setBgImage={setBgImage} isErrorImg={isErrorImg} setIsErrorImg={setIsErrorImg}/>}
        isDialogActions={false}
      />
      <div className={styles.container}>
        <div className={styles.pofileHeader}>
          <div className={styles.wrapperCover}>
            <img
              className={styles.bgProfile}
              src={bgImage}
              alt="background"
              onError={(e) => errorImg(e)}
            />
            <Button
              className={styles.editCoverPhoto}
              onClick={() => setIsOpen(true)}
            >
              {t('editCoverPhoto')}
            </Button>
          </div>
          <Avatar
            alt="Remy Sharp"
            src={userNews[4].avatarImg}
            className={styles.profileAvatar}
          />
          <div className={styles.wrapper}>
            <div className={styles.userInfo}>
              <div className={styles.nameUser}>{userNews[4].name}</div>
              <div className={styles.workUser}>UI Designer</div>
            </div>
            <NavLink to={PATHS.SETTINGS}>
              <Button className={styles.editInfo}>{t('settings')}</Button>
            </NavLink>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.intro}>
            <div className={styles.title}>{t('intro')}</div>
            {FIELD_INTO.map(({ icon, label }, index) => (
              <div key={index} className={styles.intoItem}>
                {icon}
                <div>{t(label)}</div>
              </div>
            ))}
          </div>
          <NewsCreator
            name={userNews[4].name}
            avatarImg={userNews[4].avatarImg}
            avatarColor={userNews[4].avatarColor}
          />
        </div>
      </div>
    </Layout>
  )
}

interface IModalContent {
  setBgImage: Dispatch<SetStateAction<string>>
  isErrorImg: boolean
  setIsErrorImg: Dispatch<SetStateAction<boolean>>
}

const ModalContent: FC<IModalContent> = ({ setBgImage, isErrorImg,  setIsErrorImg}) => {
  const inputRef = useRef<HTMLInputElement>()
  const { t } = useTranslation()

  const handleClickImg = (e: MouseEvent) => {
    setBgImage((e.target as HTMLImageElement).src)
  }

  const handleClickBtn = () => {
    setBgImage(inputRef.current.value.trim())
    console.log(inputRef.current.value)
  }

  return (
    <div className={styles.modal}>
      <div className={styles.imgContainer}>
        {BG_IMAGES.map((img, index) => (
          <img
            key={index}
            src={img}
            className={styles.imgItem}
            onClick={(e) => handleClickImg(e)}
          ></img>
        ))}
      </div>
      <div className={styles.addingImg}>
        <TextField
          id="outlined-basic"
          label={t('addImgLabel')}
          variant="standard"
          className={styles.imgInput}
          inputRef={inputRef}
          onChange={()=> setIsErrorImg(false)}
        />
        <Button onClick={handleClickBtn}>
          {t('addImg').toLocaleUpperCase()}
        </Button>
      </div>
      {isErrorImg && <div className={styles.errMessage}>{t('errMessage')}</div>}
    </div>
  )
}

export default ProfilePage
