import React, { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';

const VideoPreview = ({ movieId }: any) => {
  const MOIVE_VIDEO = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

  type movieVideoType = {
    results: Array<{ key: string | undefined }>;
  };

  const [videos, setVideos] = useState<movieVideoType | undefined>();

  useEffect(() => {
    async function videoData() {
      const response_video = await axios.get(MOIVE_VIDEO);
      setVideos(response_video.data);
    }
    videoData();
  }, []);
  return (
    <ul>
      {videos?.results.map((item, idx) => (
        <li key={idx}>
          <iframe
            width='560'
            height='315'
            src={`https://www.youtube.com/embed/${item.key}`}
            title='YouTube video player'
          ></iframe>
        </li>
      ))}
    </ul>
  );
};

export default VideoPreview;
