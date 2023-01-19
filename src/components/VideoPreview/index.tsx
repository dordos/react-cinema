import React, { useEffect } from 'react';
import './style.scss';

const MOIVE_VIDEO = `https://api.themoviedb.org/3/movie/${76600}/videos?api_key=${
  process.env.REACT_APP_TMDB_API_KEY
}&language=en-US`;

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const VideoPreview = () => {
  useEffect(() => {}, []);
  return (
    <div className='videoPreview'>
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
    </div>
  );
};

export default VideoPreview;
