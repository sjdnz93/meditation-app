import { getPayload } from "../helpers/Auth"


function Profile(): JSX.Element {

  const payload = getPayload()
  console.log('PAYLOAD FROM FUNCTION CALL', payload)

  


  

  return (
    <main>
      <h1>PROFILE PAGE</h1>
    </main>
  )

}

export default Profile