import { AppStateType } from '../types'

export const getUserInfoSelector = (state: AppStateType) => {
  return state.users.userInfo
}

export const selectTheme = (state: AppStateType): string => {
  return state.users.theme
}
