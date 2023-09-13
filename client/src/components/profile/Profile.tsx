import { getPayload, isAuthenticated } from "../helpers/Auth"
import { useEffect, useState } from "react"
import axios from "axios"


function Profile(): JSX.Element {

  const { sub } = getPayload()
  const authenticated: boolean = isAuthenticated()
  //console.log('PAYLOAD FROM FUNCTION CALL', sub)
  //console.log('EXPIRY DATE FOR LOGIN SESSION', exp)


  const [userProfile, setUserProfile] = useState()

  useEffect(() => {

    const getProfile = async () => {

      if (!authenticated) return

      try {

        const { data } = await axios.get(`/api/profile/${sub}`)
        console.log('LOGGED USER DATA', data)
        setUserProfile(data)





      } catch (err) {

      }
    }

    getProfile()

  }, [sub, authenticated])

  


  

  return (
    <main>
      <h1>PROFILE PAGE</h1>
    </main>
  )

}

export default Profile