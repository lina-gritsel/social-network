import { AppStateType } from '../types'

export const getUserInfoSelector = (state: AppStateType) => {
  return state.users.userInfo
}
