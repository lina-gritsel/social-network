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
export interface UsersInfo {
  users: User[]
  status: string
  results: number
}

export interface LoginUser {
  name: string
  password: string
}

export interface LoginData {
  status: number
  id: string
}

export interface DeleteUserStatus {
  status: number
}

export interface CreatePostParams {
  content: string
  userId: string
  image: string
}

export interface ChangePostParams {
  content: string
  image: string
}

export interface ChangeComment {
  postId: string
  comment: string
  userId: string
}
