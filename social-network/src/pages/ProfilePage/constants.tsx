import CakeIcon from '@mui/icons-material/Cake'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'

import styles from './components/UserDetails/UserDetails.module.scss'

export const FIELD_INTO = [
  {
    icon: <PermIdentityIcon className={styles.icon} />,
    label: 'profileGender',
    value: 'gender',
  },
  {
    icon: <CakeIcon className={styles.icon} />,
    label: 'born',
    value: 'birthday',
  },
  {
    icon: <LocationOnIcon className={styles.icon} />,
    label: 'profileLocation',
    value: 'location',
  },
  {
    icon: <FacebookIcon className={styles.icon} />,
    label: 'facebook',
    value: 'facebook',
    link: 'http://www.facebook.com/',
  },
  {
    icon: <TwitterIcon className={styles.icon} />,
    label: 'twitter',
    value: 'twitter',
    link: 'http://www.twitter.com/',
  },
  {
    icon: <InstagramIcon className={styles.icon} />,
    label: 'instagram',
    value: 'instagram',
    link: 'http://www.instagram.com/',
  },
  {
    icon: <GroupsOutlinedIcon className={styles.icon} />,
    label: 'followers',
    value: 'followers',
    navLink: true,
  },
  {
    icon: <PeopleAltOutlinedIcon className={styles.icon} />,
    label: 'followings',
    value: 'followings',
    navLink: true,
  },
]

export const FIRST_LINKS_INDEX = 3
export const LAST_LINKS_INDEX = 5

export const DEFAULT_NUMBER_PICTURES = 10

export const DEFAULT_WALLPAPER =
  'https://images.unsplash.com/photo-1450387635522-8ecb968079bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2017&q=80'
