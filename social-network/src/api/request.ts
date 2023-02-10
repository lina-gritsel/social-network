const BASE_URL = 'https://panicky-cyan-tweed-jacket.cyclic.app/api'

interface CreatePostParams {
  content: string
  username: string
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