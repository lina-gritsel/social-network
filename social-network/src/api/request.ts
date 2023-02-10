export const BASE_URL = 'https://panicky-cyan-tweed-jacket.cyclic.app/api'

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`)
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
