import { getPayload } from "../helpers/Auth"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Link } from "react-router-dom"

import { UserProfile } from "./Interfaces"
import Error from "../error/Error"

const spinnerGIF = require('../../images/spinner.gif')  


function Profile(): JSX.Element {

  const payload = getPayload()
  const { sub } = payload





  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 0,
    email: '',
    first_name: '',
    username: '',
    streak_count: 0,
    videos: []
  })
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
      {userProfile && userProfile.email !== '' ?
        <>
          <h1>Welcome, {userProfile.first_name}</h1>
          <h2>You've completed {userProfile.streak_count} meditations</h2>
          <div>
            <div>
              <p>Click to add meditation videos</p>
            </div>
            {userProfile.videos!.length > 0 && userProfile.videos?.map(video => (
              <div key={video.id}>
                <p>{video.title}</p>
                <p>{video.artist}</p>
                <p>{video.length}</p>
                <img src={video.thumbnail} alt={`Thumbnail for the video titled ${video.title} by ${video.artist}`} />
              </div>
            )

            )

            }

          </div>

        </>
        :
        <>
          {error ?
            <>
              <Error error={error} />
            </>
            :
            <div>
              <img src={spinnerGIF} alt="spinner gif for loading screen" />
            </div>

          }

        </>
      }

    </main>
  )

}

export default Profile