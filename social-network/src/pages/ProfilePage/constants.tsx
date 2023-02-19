import CakeIcon from '@mui/icons-material/Cake'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'

export const FIELD_INTO = [
  {
    icon: <PermIdentityIcon />,
    label: 'profileGender',
  },
  {
    icon: <CakeIcon />,
    label: 'born',
  },
  {
    icon: <LocationOnIcon />,
    label: 'profileLocation',
  },
  {
    icon: <FacebookIcon />,
    label: 'facebook',
  },
  {
    icon: <TwitterIcon />,
    label: 'twitter',
  },
  {
    icon: <InstagramIcon />,
    label: 'instagram',
  },
  {
    icon: <GroupsOutlinedIcon />,
    label: 'followers',
  },
  {
    icon: <PeopleAltOutlinedIcon />,
    label: 'following',
  },
]

export enum LINKS {
  twitter = 'http://www.twitter.com/',
  instagram = 'http://www.instagram.com/',
  facebook = 'http://www.facebook.com/',
}

export const DEFAULT_WALLPAPER =
  'https://images.unsplash.com/photo-1450387635522-8ecb968079bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2017&q=80'

