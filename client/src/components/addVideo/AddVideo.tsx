import { url } from 'inspector'
import { useState } from 'react'



function AddVideo(): JSX.Element {

  const [urlField, setURLField] = useState('')
  const [videoUniqueID, setVideoUniqueID] = useState('')

  const APIKey = process.env.REACT_APP_YT_API_KEY


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setURLField(e.target.value)
  }

  const processLink = (e: React.FormEvent) => {
    e.preventDefault()
    const splitURL = urlField.split('=')
    const vidID = splitURL[1]
    console.log(vidID)
    setVideoUniqueID(vidID) 
    console.log('API KEY', APIKey)
    
  }

  return (
    <main>
      <h1>ADD VIDEO</h1>
      <form onSubmit={processLink}>
        <input type="text" placeholder="Insert video URL here" onChange={handleChange}></input>
        <button type="submit">Process video</button>
      </form>
    </main>

  )
}

export default AddVideo