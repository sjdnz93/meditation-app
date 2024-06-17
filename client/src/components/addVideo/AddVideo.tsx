import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { getPayload } from '../helpers/Auth';
import { UserProfile, Video } from '../profile/Interfaces';
const placeholderPic = require('../../images/meditation.png');

type AddVideoModalProps = {
  closeAddVideoModal: () => void;
  setUpdatedVideos: React.Dispatch<React.SetStateAction<Video[]>>
}

function AddVideo({ closeAddVideoModal, setUpdatedVideos }: AddVideoModalProps): JSX.Element {

  const [urlField, setURLField] = useState('');
  const [apiKey, setApiKey] = useState('');

  const payload = getPayload()
  const { sub } = payload

  const [videoInfoFields, setVideoInfoFields] = useState({
    title: '',
    artist: '',
    genre: [] as number[],
    length: '',
    thumbnail: placeholderPic,
    url: '',
    owner: sub
  })

  useEffect(() => {
    const key = process.env.REACT_APP_YT_API_KEY;
    if (key) {
      setApiKey(key);
      console.log('API key set:', key);
    } else {
      console.error('API key not set');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('URL field change:', e.target.value);
    setURLField(e.target.value);
  }

  const processLink = (e: React.FormEvent) => {
    e.preventDefault();
    const splitURL = urlField.split('=');
    const vidID = splitURL[1];
    console.log('Processing video ID:', vidID);
    console.log('Using API key:', apiKey);
    if (vidID && apiKey) {
      getVideo(vidID, apiKey);
    } else {
      console.error('Video ID or API key is missing');
    }
  }



  const getVideo = async (vidId: string, key: string) => {
    try {
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?id=${vidId}&key=${key}&part=snippet,contentDetails`);
      const data = await response.json();
      console.log('YT RESPONSE', data);
      extractVideoInfo(data);
    } catch (err) {
      console.error('Error fetching video data:', err);
    }
  }

  const extractVideoInfo = (data: any) => {
    const title = data.items[0].snippet.title;
    const artist = data.items[0].snippet.channelTitle;
    const length = convertISOMomentToMinutes(data.items[0].contentDetails.duration);
    const thumbnail = data.items[0].snippet.thumbnails.medium.url;
    const url = `https://www.youtube.com/watch?v=${data.items[0].id}`;

    setVideoInfoFields({
      ...videoInfoFields,
      title,
      artist,
      length,
      thumbnail,
      url
    });
  }

  const convertISOMomentToMinutes = (isoMoment: string): string => {
    console.log('isoMoment', isoMoment);
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = isoMoment.match(regex);

    if (matches) {
      const hours = parseInt(matches[1] || "0") || 0;
      const minutes = parseInt(matches[2] || "0") || 0;
      const seconds = parseInt(matches[3] || "0") || 0;

      const totalMinutes = hours * 60 + minutes;
      const remainingSeconds = seconds % 60;
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");

      console.log(totalMinutes);
      return `${totalMinutes}:${formattedSeconds}`;
    } else {
      console.log("Invalid duration string");
      return "Invalid duration string";
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoInfoFields({ ...videoInfoFields, [e.target.name]: e.target.value })
  }


  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = parseInt(event.target.value, 10);
    const isChecked = event.target.checked;
  
    if (isChecked) {
      setVideoInfoFields(prevState => ({
        ...prevState,
        genre: [...prevState.genre, selectedGenre]
      }));
    } else {
      setVideoInfoFields(prevState => ({
        ...prevState,
        genre: prevState.genre.filter(genre => genre !== selectedGenre)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('FORM SUBMITTED');
    console.log('Video info fields:', videoInfoFields);

    try {
      const response = await axios.post('/api/add/', videoInfoFields);
      console.log('Response:', response);
      const { data }: AxiosResponse<UserProfile> = await axios.get(`/api/profile/${sub}`)
      setUpdatedVideos(data.videos!)
      closeAddVideoModal()
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  return (
    <section>
      <div className='modal-backdrop'>
        <div className='modal-container add-video-modal'>
          <button className='close-modal-button' onClick={closeAddVideoModal} type="button">
            x
          </button>

          <form className='video-url-form' onSubmit={processLink}>
            <input type="text" placeholder="Enter YouTube URL here" onChange={handleChange}></input>
            <button className='submit-video-button' type="submit">LOAD</button>
          </form>

          <div className='thumbnail-container'>
            <img src={videoInfoFields.thumbnail} alt="Video thumbnail" />
          </div>



          <form className='video-details-form' onSubmit={handleSubmit}>
            <input
              type="text"
              id="title"
              name="title"
              value={videoInfoFields.title}
              placeholder='Title'
              onChange={handleFieldChange}
            />
            <input
              type="text"
              id="artist"
              name="artist"
              value={videoInfoFields.artist}
              placeholder='Channel'
              onChange={handleFieldChange}
            />

            <div className='add-video-checkboxes'>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value= '1'
                  checked={videoInfoFields.genre.includes(1)}
                  onChange={handleRadioChange}
                />
                Guided
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="2"
                  checked={videoInfoFields.genre.includes(2)}
                  onChange={handleRadioChange}
                />
                Ambient
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="3"
                  checked={videoInfoFields.genre.includes(3)}
                  onChange={handleRadioChange}
                />
                Body scan
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="4"
                  checked={videoInfoFields.genre.includes(4)}
                  onChange={handleRadioChange}
                />
                Sleep
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="5"
                  checked={videoInfoFields.genre.includes(5)}
                  onChange={handleRadioChange}
                />
                ASMR
              </label>
            </div>

            <button className='save-video-button' type="submit">Save video</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddVideo;
