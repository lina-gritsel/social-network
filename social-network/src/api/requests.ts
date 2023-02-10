import { CreatePostParams, Registration, User } from './types'

const BASE_URL = 'https://panicky-cyan-tweed-jacket.cyclic.app/api'

const USERS_URL = `${BASE_URL}/users`

export const createUser = async (user: User): Promise<Registration> => {
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
    throw new Error(`${error}`)
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
