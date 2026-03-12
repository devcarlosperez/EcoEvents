export interface UserData {
  id: number
  name: string
  surname: string
  email: string
  role: string
  token: string
}

export interface LoginData {
  email: string
  password: string
}

export interface SignupData {
  name: string
  surname: string
  email: string
  password: string
}