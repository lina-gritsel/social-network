import { User } from '../../api'

import { GET_USER_INFO } from '../actions'

interface IgetUserInfo {
  type: typeof GET_USER_INFO
  payload: User
}

type AllActionTypes = IgetUserInfo

interface IinitialState {
  userInfo: User
}

const initialState = {
  userInfo: {} as User,
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
    default:
      return state
  }
}

export default users
