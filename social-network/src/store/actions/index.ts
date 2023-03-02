import { getUser } from '../../api'

import { AppDispatch } from '../types'

export const GET_USER_INFO = 'GET_USER_INFO'
export const SELECT_THEME = 'SELECT_THEME'

export const fetchUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const user = await getUser(id)
    dispatch({ type: GET_USER_INFO, payload: user.data?.user })
  } catch (error) {
    throw new Error(`${error}`)
  }
}

export const setTheme = (payload: string) => (dispatch: AppDispatch) => {
  dispatch({ type: SELECT_THEME, payload })
}
