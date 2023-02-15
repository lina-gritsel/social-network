const BASE_URL = 'https://panicky-cyan-tweed-jacket.cyclic.app/api'

interface CreatePostParams {
  content: string
  username: string
}

export const createPost = async (content: CreatePostParams) => {
  try {
    const response = await fetch(`${BASE_URL}/posts?limit=100`, {
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
export const changePost = async (content: string, id: string) => {
  try {
    await fetch(`${BASE_URL}/posts/${id}`, {
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

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`)

    return response.json()
  } catch (error) {
    console.log(error)
  }
}
export const getPost = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`)

    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = async (id: string) => {
  try {
    await fetch(`${BASE_URL}/posts/${id}`, { method: 'DELETE' })
  } catch (error) {
    console.log(error)
  }
}
