import React, { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';

const MovieCast = () => {
  const MOVIE_CAST = `https://api.themoviedb.org/3/movie/${505642}/credits?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;

  type movieCastType = {
    cast: Array<{
      profile_path: string;
      character: string;
      original_name: string;
    }>;
  };

  // /movie/{movie_id}/reviews
  const [movieCast, setMovieCast] = useState<movieCastType>();

  useEffect(() => {
    async function castData() {
      const response_cast = await axios.get(MOVIE_CAST);
      setMovieCast(response_cast.data);
    }
    castData();
  }, []);

  return (
    <div className='movieCastContainer'>
      <h2>배우 / 출연진</h2>
      <ul>
        {movieCast?.cast.map((item, idx) => (
          <li key={idx}>
            <img src={`https://image.tmdb.org/t/p/w300/${item.profile_path}`} alt='' />
            <h3>{item.character}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
