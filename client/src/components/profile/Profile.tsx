import { getPayload } from "../helpers/Auth"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"


import { UserProfile, Video } from "./Interfaces"
import Error from "../error/Error"
import MediaPlayerWrapper from "../mediaPlayerWrapper/MediaPlayerWrapper"
import AddVideo from "../addVideo/AddVideo"

import Logout from "../logout/Logout"


const spinnerGIF = require('../../images/spinner.gif')
const placeholderPic = require('../../images/meditation.png')


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
    console.log('VALUE ', event.target.value)
    if (event.target.value === 'All') {
      setFilteredVideos(userProfile!.videos!)
    } else if (event.target.value === 'Guided') {
      setFilteredVideos(userProfile!.videos!.filter(video => video.genre.includes(1)))
    } else if (event.target.value === "Ambient") {
      setFilteredVideos(userProfile!.videos!.filter(video => video.genre.includes(2)))
    } else if (event.target.value === "Body scan") {
      setFilteredVideos(userProfile!.videos!.filter(video => video.genre.includes(3)))
    } else if (event.target.value === "Sleep") {
      setFilteredVideos(userProfile!.videos!.filter(video => video.genre.includes(4)))
    } else if (event.target.value === "ASMR") {
      setFilteredVideos(userProfile!.videos!.filter(video => video.genre.includes(5)))
    }
  };

  const openPlayerModal = (e: React.MouseEvent<HTMLDivElement>, url: string, id: number, video: Video) => {
    e.preventDefault()
    setVideoForModal(video)
    setIsPlayerOpen(true)
  }

  const closePlayerModal = () => {
    setIsPlayerOpen(false)
  }

  const openAddVideoModal = (e: React.MouseEvent<HTMLDivElement>) => {
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
          <div className='hero-wrapper'>
            <div className="message-and-count-wrapper">
              <h1>Hey {userProfile.username},</h1>
              <h2>Complete a meditation to add to your tally</h2>
              <Logout />
            </div>
            <div className="streak-count-container">
              <h3>{userProfile.streak_count}</h3>  
            </div>
            
          </div>
          <div className='content-wrapper'>
            {isAddVideoOpen && <AddVideo closeAddVideoModal={closeAddVideoModal} setUpdatedVideos={setUpdatedVideos} />}


            <div className='radio-wrapper'>
              <label>
                <input
                  type="radio"
                  value="All"
                  checked={radioButton === 'All'}
                  onChange={handleRadioChange}
                />
                <p>All</p>
              </label>

              <label>
                <input
                  type="radio"
                  value="Guided"
                  checked={radioButton === "Guided"}
                  onChange={handleRadioChange}
                />
                <p>Guided</p>
              </label>

              <label>
                <input
                  type="radio"
                  value="Ambient"
                  checked={radioButton === "Ambient"}
                  onChange={handleRadioChange}
                />
                <p>Ambient</p>
              </label>

              <label>
                <input
                  type="radio"
                  value="Body scan"
                  checked={radioButton === "Body scan"}
                  onChange={handleRadioChange}
                />
                <p>Body scan</p>
              </label>

              <label>
                <input
                  type="radio"
                  value="Sleep"
                  checked={radioButton === "Sleep"}
                  onChange={handleRadioChange}
                />
                <p>Sleep</p>
              </label>

              <label>
                <input
                  type="radio"
                  value="ASMR"
                  checked={radioButton === "ASMR"}
                  onChange={handleRadioChange}
                />
                <p>ASMR</p>
              </label>
            </div>

            {isPlayerOpen && <MediaPlayerWrapper closeModal={closePlayerModal} videoForModal={videoForModal} sub={sub} setUpdatedVideos={setUpdatedVideos} setStreakCount={setStreakCount} streakCount={streakCount} />}
            <div className='master-tile-container'>
              <div className='video-tile' onClick={(e) => openAddVideoModal(e)}>
                <div className='video-tile-image-container' style={{ backgroundImage: `url(${placeholderPic})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '150px' }}></div>
                <div className='video-tile-text-container'>
                  <p>Click to add meditation videos</p>
                </div>
              </div>
              {filteredVideos!.length > 0 && filteredVideos?.map(video => (
                <div key={video.id} onClick={(e) => openPlayerModal(e, video.url, video.id, video)} className='video-tile'>
                  <div className='video-tile-image-container' style={{ backgroundImage: `url(${video.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '150px' }}></div>
                  <div className='video-tile-text-container'>
                    <p>{video.title}</p>
                    <p>{video.artist}</p>
                    <p>Length: {video.length}</p>
                  </div>
                </div>
              ))
              }
              
            </div>
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