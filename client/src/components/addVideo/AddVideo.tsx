import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AddVideo(): JSX.Element {

  const [urlField, setURLField] = useState('');
  const [apiKey, setApiKey] = useState('');

  const [videoInfoFields, setVideoInfoFields] = useState({
    title: '',
    artist: '',
    genre: '',
    length: '',
    thumbnail: '',
    url: '',
    owner: 0
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVideoInfoFields({ ...videoInfoFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('FORM SUBMITTED');
    console.log('Video info fields:', videoInfoFields);

    try {
      const response = await axios.post('/api/add/', videoInfoFields);
      console.log('Response:', response);


    } catch (error) {
      console.error(error);
      return error;
    }
  }

  return (
    <main>
      <h1>ADD VIDEO</h1>
      <button type="button">
        <Link to="/">Home</Link>
      </button>
      <form onSubmit={processLink}>
        <input type="text" placeholder="Insert video URL here" onChange={handleChange}></input>
        <button type="submit">Process video</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          value={videoInfoFields.title}
          onChange={handleFieldChange}
        />
        <input
          type="text"
          id="artist"
          name="artist"
          value={videoInfoFields.artist}
          onChange={handleFieldChange}
        />
        <select value={videoInfoFields.genre} onChange={handleSelectChange} name="genre">
          <option disabled value="">Select genre</option>
          <option value="Guided">Guided</option>
          <option value="Ambient">Ambient</option>
          <option value="Body scan">Body scan</option>
          <option value="Sleep">Sleep</option>
        </select>
        <button type="submit">Save video</button>
      </form>
    </main>
  );
}

export default AddVideo;



// const getVideo = async (vidId: string, key: string) => {
//   try {
//     console.log('Making API call with key:', key);
//     console.log('REQUEST URL ', `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${vidId}&key=${key}&maxResults=1`)
//     const requestUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${vidId}&key=${key}&maxResults=1`
//     const { data } = await axios.get(requestUrl);
//     console.log('YT RESPONSE', data);
//   } catch (err) {
//     console.error('Error fetching video data:', err);
//   }
// }
