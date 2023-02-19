import { User } from '../../../api/types'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../../api'

type UseFetchAllUsers = () => {
  isLoading: boolean
  users: User[]
}

export const useFetchAllUsers: UseFetchAllUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [users, setUsers] = useState<User[]>([])

  const userId = JSON.parse(localStorage.getItem('userId')) as string || ''

  useEffect(() => {
    const getUsers = async () => {
      const res = (await getAllUsers()).users
      setUsers(res.filter(({id})=> id !== userId))

      setIsLoading(false)
    }
    getUsers()
  }, [userId])

  return { isLoading, users }
}