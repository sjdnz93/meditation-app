export interface UserProfile {
  id: number,
  email: string,
  first_name: string,
  username: string,
  streak_count: number,
  videos: Video[]
}

export interface Video {
  id: number, 
  title: string,
  artist: string,
  genre: number[],
  length: string,
  thumbnail: string,
  url: string,
  owner: number
}