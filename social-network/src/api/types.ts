export interface User {
  id: string
  email: string
  name: string
  password: string
  date: number
  gender: string
  avatar?: string
  bio: string
  location?: string
  isFriend: boolean
  instagram: string
  facebook: string
  twitter: string
  createdAt: string
  updatedAt: string
  followers?: string[]
  following?: string[]
}

export interface RegistrationData {
  data: {
    user: User
  }
  status: string
}

export interface LoginUser {
  name: string
  password: string
}

export interface LoginStatus {
  status: number
}

export interface DeleteUserStatus {
  status: number
}

export interface CreatePostParams {
  content: string
  username: string
}
