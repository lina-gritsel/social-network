import { getUser } from '../../api'

import { AppDispatch } from '../types'

export const GET_USER_INFO = 'GET_USER_INFO'

export const fetchUser =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const user = await getUser(id)
      dispatch({ type: GET_USER_INFO , payload: user })
    } catch (error) {
      throw new Error(`${error}`)
    }
  }