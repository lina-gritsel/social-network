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

  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUsers()
      setUsers(res.users)

      setIsLoading(false)
    }
    getUsers()
  }, [])

  return { isLoading, users }
}