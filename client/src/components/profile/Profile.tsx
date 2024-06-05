import { getPayload } from "../helpers/Auth"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Link } from "react-router-dom"

import { UserProfile, Video } from "./Interfaces"
import Error from "../error/Error"
import MediaPlayerWrapper from "../mediaPlayerWrapper/MediaPlayerWrapper"

const spinnerGIF = require('../../images/spinner.gif')


function Profile(): JSX.Element {

  const payload = getPayload()
  const { sub } = payload

  const [userProfile, setUserProfile] = useState<UserProfile>()
  const [error, setError] = useState<string>('')
  const [updatedVideos, setUpdatedVideos] = useState<Video[]>([])
  const [radioButton, setRadioButton] = useState<string>('All')
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data }: AxiosResponse<UserProfile> = await axios.get(`/api/profile/${sub}`)
        console.log('LOGGED USER DATA', data)
        setUserProfile(data)
        setFilteredVideos(data.videos!)
      } catch (err: any) {
        console.log(err)
        if (axios.isAxiosError(err)) {
          setError(err.message)
        }
      }
    }
    getProfile()
  }, [sub, updatedVideos])

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault()
    console.log('ID NUMBER FOR REMOVAL', id)
    try {
      const res = window.confirm('Are you sure you want to delete this video?')
      if (res) {
        await axios.delete(`/api/videos/${id}`)
        const { data }: AxiosResponse<UserProfile> = await axios.get(`/api/profile/${sub}`)
        setUpdatedVideos(data.videos!)
      }
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioButton(event.target.value);
    if (event.target.value === 'All') {
      setFilteredVideos(userProfile!.videos!)
    } else if (event.target.value === 'Guided') {
      setFilteredVideos(userProfile!.videos!.filter(video => video.genre === 'Guided'))
    } else if (event.target.value === 'Ambient') {
      setFilteredVideos(userProfile!.videos!.filter(video => video.genre === 'Ambient'))
    } else if (event.target.value === 'Body scan') {
      setFilteredVideos(userProfile!.videos!.filter(video => video.genre === 'Body scan'))
    } else if (event.target.value === 'Sleep') {
      setFilteredVideos(userProfile!.videos!.filter(video => video.genre === 'Sleep'))
    }
  };

  const openModal = (e: React.MouseEvent<HTMLDivElement>, url: string) => {
    e.preventDefault()
    setUrl(url)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }


  return (
    <main>
      {userProfile && userProfile.email !== '' ?
        <>
          <h1>Welcome, {userProfile.username}</h1>
          <h2>You've completed {userProfile.streak_count} meditations</h2>
          <div>
            <Link to={'/add-video'}>
              Click to add meditation videos
            </Link>
            {/* <button onClick={openModal}>OPEN THE FRICKEN MODAL</button> */}

            <div>
              <label>
                <input
                  type="radio"
                  value="All"
                  checked={radioButton === 'All'}
                  onChange={handleRadioChange}
                />
                All
              </label>

              <label>
                <input
                  type="radio"
                  value="Guided"
                  checked={radioButton === 'Guided'}
                  onChange={handleRadioChange}
                />
                Guided
              </label>

              <label>
                <input
                  type="radio"
                  value="Ambient"
                  checked={radioButton === 'Ambient'}
                  onChange={handleRadioChange}
                />
                Ambient
              </label>

              <label>
                <input
                  type="radio"
                  value="Body scan"
                  checked={radioButton === 'Body scan'}
                  onChange={handleRadioChange}
                />
                Body scan
              </label>

              <label>
                <input
                  type="radio"
                  value="Sleep"
                  checked={radioButton === 'Sleep'}
                  onChange={handleRadioChange}
                />
                Sleep
              </label>
            </div>

            {filteredVideos!.length > 0 && filteredVideos?.map(video => (
              <div key={video.id} onClick={(e) => openModal(e, video.url)}>
                <p>{video.title}</p>
                <p>{video.artist}</p>
                <p>Length: {video.length}</p>
                <img src={video.thumbnail} alt={`Thumbnail for the video titled ${video.title} by ${video.artist}`} />
                <button onClick={(e) => handleDelete(e, video.id)}>Remove</button>
              </div>
            ))
            }
          </div>
          {isOpen && <MediaPlayerWrapper closeModal={closeModal} url={url} />}
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