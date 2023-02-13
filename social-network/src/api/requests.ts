import {
  CreatePostParams,
  RegistrationData,
  LoginStatus,
  LoginUser,
  User,
} from './types'

const BASE_URL = 'https://panicky-cyan-tweed-jacket.cyclic.app/api'

const USERS_URL = `${BASE_URL}/users`
const LOGIN_URL = `${BASE_URL}/login`
const POSTS_URL = `${BASE_URL}/posts`

export const createUser = async (user: User): Promise<RegistrationData> => {
  try {
    const data = await fetch(USERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const response = data.json()
    const result = await response
    return result
  } catch (error) {
    throw new Error(`${error}`)
  }
}

export const loginUser = async (user: LoginUser): Promise<LoginStatus> => {
  try {
    const data = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    return { status: data.status }
  } catch (error) {
    throw new Error(`${error}`)
  }
}

export const getUser = async (id: string): Promise<RegistrationData> => {
  try {
    return await (await fetch(`${USERS_URL}/${id}`)).json()
  } catch (error) {
    throw new Error(`${error}`)
  }
}

export const createPost = async (content: CreatePostParams) => {
  try {
    const response = await fetch(POSTS_URL, {
      method: 'POST',
      body: JSON.stringify(content),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.json()
  } catch (error) {
    throw new Error(`${error}`)
  }
}

export const getAllPosts = async () => {
  try {
    const response = await fetch(POSTS_URL)

    return response.json()
  } catch (error) {
    throw new Error(`${error}`)
  }
}