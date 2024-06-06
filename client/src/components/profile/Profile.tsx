import { getPayload } from "../helpers/Auth"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"


import { UserProfile, Video } from "./Interfaces"
import Error from "../error/Error"
import MediaPlayerWrapper from "../mediaPlayerWrapper/MediaPlayerWrapper"
import AddVideo from "../addVideo/AddVideo"

const spinnerGIF = require('../../images/spinner.gif')


function Profile(): JSX.Element {

  const payload = getPayload()
  const { sub } = payload

  const [userProfile, setUserProfile] = useState<UserProfile>()
  const [error, setError] = useState<string>('')
  const [updatedVideos, setUpdatedVideos] = useState<Video[]>([])
  const [radioButton, setRadioButton] = useState<string>('All')
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([])
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false)
  const [isAddVideoOpen, setIsAddVideoOpen] = useState<boolean>(false)
  const [streakCount, setStreakCount] = useState<number>(0)
  const [videoForModal, setVideoForModal] = useState<Video>({} as Video)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data }: AxiosResponse<UserProfile> = await axios.get(`/api/profile/${sub}`)
        console.log('LOGGED IN USER DATA', data)
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
  }, [sub, updatedVideos, streakCount])

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

  const openPlayerModal = (e: React.MouseEvent<HTMLDivElement>, url: string, id: number, video: Video) => {
    e.preventDefault()
    //setUrl(url)
    //setId(id)
    setVideoForModal(video)
    setIsPlayerOpen(true)
  }

  const closePlayerModal = () => {
    setIsPlayerOpen(false)
  }

  const openAddVideoModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsAddVideoOpen(true)
  }

  const closeAddVideoModal = () => {
    setIsAddVideoOpen(false)
  }


  return (
    <main>
      {userProfile && userProfile.email !== '' ?
        <>
          <h1>Welcome, {userProfile.username}</h1>
          <h2>You've completed {userProfile.streak_count} meditations</h2>
          <div>
            {isAddVideoOpen && <AddVideo closeAddVideoModal={closeAddVideoModal} setUpdatedVideos={setUpdatedVideos} />}
            <button onClick={openAddVideoModal}>
              Click to add meditation videos
            </button>

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

            {isPlayerOpen && <MediaPlayerWrapper closeModal={closePlayerModal} videoForModal={videoForModal} sub={sub} setUpdatedVideos={setUpdatedVideos} setStreakCount={setStreakCount} streakCount={streakCount} />}

            {filteredVideos!.length > 0 && filteredVideos?.map(video => (
              <div key={video.id} onClick={(e) => openPlayerModal(e, video.url, video.id, video)} className='video-tile'>
                <p>{video.title}</p>
                <p>{video.artist}</p>
                <p>Length: {video.length}</p>
                <img src={video.thumbnail} alt={`Thumbnail for the video titled ${video.title} by ${video.artist}`} />
              </div>
            ))
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