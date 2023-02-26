import { useState } from "react"

import { followUser, unsubsribeUser, User } from "../api"
import { useAppDispatch } from "../store"
import { fetchUser } from "../store/actions"


export const useFollowFriends = (myInfo: User, userInfoId: string) => {
    const [isLoadingFollow, setIsLoadingFollow] = useState<boolean>(false)
    const dispatch = useAppDispatch()
  
  
    const followings = myInfo?.followings
    const followingExist = followings
      ?.map(({ id }) => id)
      .includes(userInfoId)
  
    const changeFollow = async () => {
      setIsLoadingFollow(true)
      followingExist
        ? await unsubsribeUser(myInfo?.id, { currentUserId: userInfoId })
        : await followUser(myInfo?.id, { currentUserId: userInfoId })
      dispatch(fetchUser(myInfo?.id))
      setIsLoadingFollow(false)
    }
  
    return { followingExist, changeFollow, isLoadingFollow }
  }
  