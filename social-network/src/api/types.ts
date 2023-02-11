export interface RegistrationUser {
  email: string
  name: string
  password: string
  date: number
  gender: string
}

export interface LoginUser {
  name: string
  password: string
}

export interface RegistrationSuccess {
  success: boolean
}

export interface LoginStatus {
  status: number
}


export interface CreatePostParams {
  content: string
  username: string
}
