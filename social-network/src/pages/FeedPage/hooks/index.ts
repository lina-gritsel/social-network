import { useEffect, useState } from 'react'

import { useAppDispatch } from '../../../store'
import { getAllUsers, User } from '../../../api'
import { fetchUser } from '../../../store/actions'

type UseFetchAllUsers = () => {
  isLoading: boolean
  userswWithoutMe: User[]
}

export const useNewsPage: UseFetchAllUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userswWithoutMe, setUserswWithoutMe] = useState<User[]>([])

  const dispatch = useAppDispatch()

  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [dispatch, userId])

  useEffect(() => {
    const getUserswWithoutMe = async () => {
      const res = (await getAllUsers()).users
      setUserswWithoutMe(res.filter(({ id }) => id !== userId))

      setIsLoading(false)
    }
    getUserswWithoutMe()
  }, [userId])

  return { isLoading, userswWithoutMe }
}
