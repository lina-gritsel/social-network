import { User } from './types'

const BASE_URL = 'https://panicky-cyan-tweed-jacket.cyclic.app/api'
const USERS_URL = `${BASE_URL}/users`

export const createUser = async (user: User): Promise<User> => {
  try {
    return await (
      await fetch(`${USERS_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
    ).json()
  } catch (error) {
    throw new Error(`${error}`)
  }
}
