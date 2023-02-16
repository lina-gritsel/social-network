import {
  User,
  LoginUser,
  LoginStatus,
  RegistrationData,
  CreatePostParams,
  DeleteUserStatus,
  ChangePostParams,
  UsersInfo,
  ChangeComment,
} from './types'

const BASE_URL = 'https://panicky-cyan-tweed-jacket.cyclic.app/api'

const USERS_URL = `${BASE_URL}/users`
const LOGIN_URL = `${BASE_URL}/login`
const POSTS_URL = `${BASE_URL}/posts`
const COMMETS_URL = `${POSTS_URL}/comments`

export const createUser = async (user: User): Promise<RegistrationData> => {
  try {
    const data = await fetch(USERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const result = await data.json()
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
export const getAllUsers = async (): Promise<UsersInfo> => {
  try {
    return await (await fetch(`${USERS_URL}`)).json()
  } catch (error) {
    throw new Error(`${error}`)
  }
}

export const updateUser = async (user: User): Promise<User> => {
  try {
    const data = await fetch(`${USERS_URL}/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const result = await data.json()
    return result
  } catch (error) {
    throw new Error(`${error}`)
  }
}

export const deleteUser = async (id: string): Promise<DeleteUserStatus> => {
  try {
    const data = await fetch(`${USERS_URL}/${id}`, {
      method: 'DELETE',
    })

    return { status: data.status }
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

    const result = await response.json()
    console.log(result)
    return result
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

export const changePost = async (content: ChangePostParams, id: string) => {
  try {
    await fetch(`${POSTS_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(content),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const getPost = async (id: string) => {
  try {
    const response = await fetch(`${POSTS_URL}/${id}`)

    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = async (id: string) => {
  try {
    await fetch(`${POSTS_URL}/${id}`, { method: 'DELETE' })
  } catch (error) {
    console.log(error)
  }
}

export const createComment = async (content: ChangeComment) => {
  try {
    const response = await fetch(`${COMMETS_URL}/${content.postId}`, {
      method: 'PATCH',
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
