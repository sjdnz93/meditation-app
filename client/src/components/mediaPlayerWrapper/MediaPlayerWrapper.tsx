import axios, { AxiosResponse } from "axios"
import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { UserProfile, Video } from "../profile/Interfaces"


const spinnerGIF = require('../../images/spinner.gif')

type MediaPlayerWrapperProps = {
  closeModal: () => void,
  sub: number | (() => string)
  setUpdatedVideos: React.Dispatch<React.SetStateAction<Video[]>>
  setStreakCount: React.Dispatch<React.SetStateAction<number>>
  streakCount: number
  videoForModal: Video
}


function MediaPlayerWrapper({ closeModal, sub, setUpdatedVideos, setStreakCount, streakCount, videoForModal }: MediaPlayerWrapperProps): JSX.Element {

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

  const extractGenres = (genres: number[]): string => {
    console.log('genres   ',  genres);
  
    const genreNames: { [key: number]: string } = {
      1: 'Guided',
      2: 'Ambient',
      3: 'Body scan',
      4: 'Sleep',
      5: 'ASMR',
    };  
    return genres.map((genre) => genreNames[genre] || '').join(', ');
  };

  return (
    <section>
      {isLoading ?
        <div className='modal-backdrop'>
          <div className='modal-container video-player-modal'>
            <img src={spinnerGIF} alt="loading spinner" />
          </div>
        </div>
        :
        <div className='modal-backdrop'>
          <div className='modal-container video-player-modal'>
            <button className='close-modal-button' onClick={closeModal} type='button'>x</button>
            <h2>{videoForModal.title}</h2>
            <p><strong>Channel:</strong> {videoForModal.artist}</p>
            <p><strong>Genre:</strong> {extractGenres(videoForModal.genre)}</p>
            <p><strong>Duration:</strong> {videoForModal.length}</p>
            <ReactPlayer
              playing={false}
              url={videoForModal.url}
              controls={true}
              onEnded={updatePlayCount}
              width='100%' height='100%'
              className='react-player'
            />
            <div className='delete-button-container'>
              <button className='delete-button' onClick={(e) => handleDelete(e, videoForModal.id, sub)}>Delete meditation?</button>
            </div>
          </div>
        </div>
      }
    </section>
  )
}

export default MediaPlayerWrapper