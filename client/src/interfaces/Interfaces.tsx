export interface RegisterFormInfo {
  username: string,
  email: string,
  first_name: string,
  password: string,
  password_confirmation: string,
  videos: []
}

export interface RegisterRequestError {
  email?: string[],
  first_name?: string[],
  password?: string[],
  password_confirmation?: string[],
  username?: string[]
}

export interface LoginFormInfo {
  email: string,
  password: string,
}

export type LoginRequestError = string
