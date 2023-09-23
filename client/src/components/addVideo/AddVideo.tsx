import { url } from 'inspector'
import { useEffect, useState } from 'react'
import axios from 'axios'



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



  useEffect(() => {

    const getVideo = async () => {
      try {
        const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoUniqueID}&key=${APIKey}&maxResults=1`)
        console.log('YT RESPONSE', data)
  
      } catch (err) {
        console.log(err)
      }
    }

    if (videoUniqueID && APIKey) {
      getVideo()
    }

  }, [videoUniqueID, APIKey])

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