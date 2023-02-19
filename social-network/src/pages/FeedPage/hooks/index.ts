import { useEffect, useState } from 'react'
import { fetchUser } from '../../../store/actions'
import { useAppDispatch } from '../../../store'

import { getAllUsers, User } from '../../../api'

type UseFetchAllUsers = () => {
  isLoading: boolean
  userswWithoutMe: User[]
}

export const useNewsPage: UseFetchAllUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userswWithoutMe, setUsers] = useState<User[]>([])

  const dispatch = useAppDispatch()

  const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''

  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [dispatch, userId])

  useEffect(() => {
    const getUsers = async () => {
      const res = (await getAllUsers()).users
      setUsers(res.filter(({ id }) => id !== userId))

      setIsLoading(false)
    }
    getUsers()
  }, [userId])

  return { isLoading, userswWithoutMe }
}
