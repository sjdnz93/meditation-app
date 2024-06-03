import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { YTResponse } from './Interfaces';

function AddVideo(): JSX.Element {

  const [urlField, setURLField] = useState('');
  const [apiKey, setApiKey] = useState('');

  const [videoInfoFields, setVideoInfoFields] = useState({
    title: '',
    artist: '',
    genre: '',
    //length: '',
    thumbnail: '',
    url: '',
    videoId: ''
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

  const getVideo = async (vidId: string, key: string) => {
    try {
      console.log('Making API call with key:', key);
      console.log('REQUEST URL ', `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${vidId}&key=${key}&maxResults=1`);
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${vidId}&key=${key}&maxResults=1`);
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
    const genre = data.items[0].snippet.tags[0];
    //const length = data.items[0].contentDetails.duration;
    const thumbnail = data.items[0].snippet.thumbnails.medium.url;
    const url = `https://www.youtube.com/watch?v=${data.items[0].id}`;
    const videoId = data.items[0].id;
    setVideoInfoFields({
      title,
      artist,
      genre,
      //length,
      thumbnail,
      url,
      videoId
    });
  }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoInfoFields({ ...videoInfoFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('FORM SUBMITTED');
    console.log('Video info fields:', videoInfoFields);
  }

  return (
    <main>
      <h1>ADD VIDEO</h1>
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
        <input
          type="text"
          id="genre"
          name="genre"
          value={videoInfoFields.genre}
          onChange={handleFieldChange}
        />
        <button type="submit">Save video</button>
      </form>
    </main>
  );
}

export default AddVideo;
