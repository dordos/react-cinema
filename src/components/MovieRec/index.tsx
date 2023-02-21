import React, { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';

const MovieRec = () => {
  const MOVIE_RECOMMENDATIONS = `https://api.themoviedb.org/3/movie/${505642}/recommendations?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;

  type movieRecType = {
    results: Array<{
      title: string;
      backdrop_path: string;
      release_date: string;
    }>;
    // cast: Array<{
    //   profile_path: string;
    //   character: string;
    //   original_name: string;
    // }>;
  };

  const [movieRec, setMovieRec] = useState<movieRecType>();

  useEffect(() => {
    async function recData() {
      const response_rec = await axios.get(MOVIE_RECOMMENDATIONS);
      setMovieRec(response_rec.data);
    }
    recData();
  }, []);

  const mouseOverEven = () => {
    console.log('dd');
  };

  return (
    <div className='movieRec'>
      <h2>비슷한 작품</h2>
      <ul>
        {movieRec?.results.map((item, idx) => (
          <li key={idx} onMouseOver={mouseOverEven}>
            <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt='' />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieRec;
