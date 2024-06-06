import axios, { AxiosResponse } from "axios"
import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { UserProfile, Video } from "../profile/Interfaces"


const spinnerGIF = require('../../images/spinner.gif')

type MediaPlayerWrapperProps = {
  closeModal: () => void,
  url: string,
  videoId: number
  sub: number | (() => string)
  setUpdatedVideos: React.Dispatch<React.SetStateAction<Video[]>>
  setStreakCount: React.Dispatch<React.SetStateAction<number>>
  streakCount: number
}

function MediaPlayerWrapper({ closeModal, url, videoId, sub, setUpdatedVideos, setStreakCount, streakCount }: MediaPlayerWrapperProps): JSX.Element {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])


  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: number, sub: number | (() => string)) => {
    e.preventDefault()
    console.log('ID NUMBER FOR REMOVAL', id)
    try {
      const res = window.confirm('Are you sure you want to delete this video?')
      if (res) {
        await axios.delete(`/api/videos/${id}`)
        const { data }: AxiosResponse<UserProfile> = await axios.get(`/api/profile/${sub}`)
        setUpdatedVideos(data.videos!)
        closeModal()
      }
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const updatePlayCount = async () => {
    try {
      await axios.put(`/api/profile/${sub}/increase-streak/`)
      setStreakCount(streakCount + 1)
    } catch (err) {
      console.log(err)
      return (err)
    }

  }

  return (
    <section>
      {isLoading ?
        <div className='modal-backdrop'>
          <div className='modal-container'>
            <img src={spinnerGIF} alt="loading spinner" />
          </div>
        </div>
        :
        <div className='modal-backdrop'>
          <div className='modal-container'>
            <h1>MediaPlayerWrapper</h1>
            <button onClick={closeModal}>CLOSE THE FRICKEN MODAL</button>
            <button onClick={(e) => handleDelete(e, videoId, sub)}>Remove</button>
            <ReactPlayer
              playing={false}
              url={url}
              controls={true}
              onEnded={updatePlayCount}
            />
          </div>
        </div>
      }
    </section>
  )
}

export default MediaPlayerWrapper