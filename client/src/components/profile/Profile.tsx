import { getPayload, isAuthenticated } from "../helpers/Auth"
import { useEffect, useState } from "react"
import axios from "axios"

import { UserProfile } from "../../interfaces/Interfaces"


function Profile(): JSX.Element {

  const { sub } = getPayload()
  const authenticated: boolean = isAuthenticated()
  //console.log('PAYLOAD FROM FUNCTION CALL', sub)
  //console.log('EXPIRY DATE FOR LOGIN SESSION', exp)


  const [userProfile, setUserProfile] = useState<UserProfile>()
  const [error, setError] = useState<string>()

  useEffect(() => {

    const getProfile = async () => {

      if (!authenticated) return setError('You need to login')

      try {

        const { data } = await axios.get(`/api/profile/${sub}`)
        console.log('LOGGED USER DATA', data)
        setUserProfile(data)

      } catch (err: any) {
        console.log(err)
        setError(err.message)
      }
    }

    getProfile()

  }, [sub, authenticated])

  


  

  return (
    <main>
      {userProfile && <h1>Welcome, {userProfile.first_name}</h1>}
      
    </main>
  )

}

export default Profile