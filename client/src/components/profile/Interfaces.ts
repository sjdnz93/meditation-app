export interface UserProfile {
  id: number,
  email: string,
  first_name: string,
  username: string,
  streak_count: number,
  videos: Video[]
}

interface Video {
  id: number, 
  title: string,
  artist: string,
  genre: string,
  length: string,
  thumbnail: string,
  url: string,
  owner: number
}