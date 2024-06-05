import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"


const spinnerGIF = require('../../images/spinner.gif')

type MediaPlayerWrapperProps = {
  closeModal: () => void,
  url: string
}

function MediaPlayerWrapper({ closeModal, url }: MediaPlayerWrapperProps): JSX.Element {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

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
            <ReactPlayer
              playing={false}
              url={url}
            />
          </div>
        </div>
      }
    </section>
  )
}

export default MediaPlayerWrapper