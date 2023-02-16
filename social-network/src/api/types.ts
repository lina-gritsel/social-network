export interface User {
  id: string
  email: string
  name: string
  password: string
  date: number
  gender: string
  avatar: string | null
  bio: string
  location: string | null
  isFriend: boolean
  instagram: string
  facebook: string
  twitter: string
  createdAt: string
  updatedAt: string
  followers: string | null
  following: string | null
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

export interface LoginStatus {
  status: number
}

export interface DeleteUserStatus {
  status: number
}

export interface CreatePostParams {
  content: string
  username: string
  image: string
}

export interface ChangePostParams {
  content: string
  image: string
}
