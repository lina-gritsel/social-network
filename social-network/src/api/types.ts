export interface User {
  email: string
  name: string
  password: string
  date: number
  gender: string
}

export interface RegistrationSuccess {
  success: boolean
}

export interface CreatePostParams {
  content: string
  username: string
}
