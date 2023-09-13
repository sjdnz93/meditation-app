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

export interface UserProfile {
  id: number,
  email: string,
  first_name: string,
  username: string,
  videos?: Video[]
}

export interface Video {
  id: number, 
  title: string,
  artist: string,
  genre: string,
  length: string,
  thumbnail: string,
  url: string,
  owner: number
}
