import {
  CreatePostParams,
  RegistrationSuccess,
  LoginStatus,
  RegistrationUser,
  LoginUser,
} from './types'

const BASE_URL = 'https://panicky-cyan-tweed-jacket.cyclic.app/api'

const USERS_URL = `${BASE_URL}/users`
const LOGIN_URL = `${BASE_URL}/login`

export const createUser = async (
  user: RegistrationUser,
): Promise<RegistrationSuccess> => {
  try {
    const data = await fetch(`${USERS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    return data.status !== 201 ? { success: false } : { success: true }
  } catch (error) {
    console.log(error)
  }
}

export const loginUser = async (user: LoginUser): Promise<LoginStatus> => {
  try {
    const data = await fetch(`${LOGIN_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    return { status: data.status }
  } catch (error) {
    console.log(error)
  }
}

export const createPost = async (content: CreatePostParams) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify(content),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`)

    return response.json()
  } catch (error) {
    console.log(error)
  }
}
