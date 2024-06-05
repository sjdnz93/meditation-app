import React from "react"
import ReactPlayer from "react-player"

type MediaPlayerWrapperProps = {
  closeModal: () => void,
  url: string
}

function MediaPlayerWrapper({ closeModal, url }: MediaPlayerWrapperProps): JSX.Element {
  return (
    <div>
      <h1>MediaPlayerWrapper</h1>
      <button onClick={closeModal}>CLOSE THE FRICKEN MODAL</button>
      <ReactPlayer url={url}/>
    </div>
  )
}

export default MediaPlayerWrapper