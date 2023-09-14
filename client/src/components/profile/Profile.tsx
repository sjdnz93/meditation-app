import { getPayload, isAuthenticated } from "../helpers/Auth"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"

import { UserProfile } from "../../interfaces/Interfaces"
import { Payload } from "../helpers/Interfaces"


function Profile(): JSX.Element {

  const payload = getPayload()
const { sub } = payload!
  const authenticated = isAuthenticated()
  //console.log('PAYLOAD FROM FUNCTION CALL', sub)
  //console.log('EXPIRY DATE FOR LOGIN SESSION', exp)


  const [userProfile, setUserProfile] = useState<UserProfile>()
  const [error, setError] = useState<string>('')

  useEffect(() => {
    

    const getProfile = async () => {

      try {

        const { data }: AxiosResponse<UserProfile> = await axios.get(`/api/profile/${sub}`)
        console.log('LOGGED USER DATA', data)
        setUserProfile(data)

      } catch (err: any) {
        console.log(err)

        if (axios.isAxiosError(err)) {
          setError(err.message)
        }

        
      }
    }

    getProfile()

  }, [sub])

  return (
    <main>
      {userProfile ?
        <>
          <h1>Welcome, {userProfile.first_name}</h1>
          <h2>You've completed {userProfile.streak_count} meditations</h2>
          {userProfile.videos.length > 0 ? userProfile.videos?.map(video => (
            <p>{video.title}</p>
          )
          )
            :
            <p>Click to add meditation videos</p>
          }
        </>
        :
        <>
          <p>{error}</p>
        </>
      }

    </main>
  )

}

export default Profile