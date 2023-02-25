import { FC } from 'react'

import { RandomFriend } from '../../../../components/RandomFriend'
import { useNewsPage } from '../../../FeedPage/hooks'

const PossibleFriends: FC = () => {
  const { isLoading, userswWithoutMe } = useNewsPage()

  return <RandomFriend isLoading={isLoading} allUsers={userswWithoutMe} />
}

export default PossibleFriends
