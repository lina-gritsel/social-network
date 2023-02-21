import { User } from '../../api'

import { GET_USER_INFO, SELECT_THEME } from '../actions'

interface IgetUserInfo {
  type: typeof GET_USER_INFO
  payload: User
}

interface ISelectTheme {
  type: typeof SELECT_THEME
  payload: string
}

type AllActionTypes = IgetUserInfo | ISelectTheme

interface IinitialState {
  userInfo: User
  theme: string
}

const initialState = {
  userInfo: {} as User,
  theme: 'light',
}

const users = (
  state: IinitialState = initialState,
  action: AllActionTypes,
): IinitialState => {
  switch (action.type) {
    case GET_USER_INFO: {
      return {
        ...state,
        userInfo: action.payload,
      }
    }
    case SELECT_THEME: {
      return {
        ...state,
        theme: action.payload,
      }
    }
    default:
      return state
  }
}

export default users
