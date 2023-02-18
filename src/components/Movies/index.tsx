import React, { SetStateAction, useCallback, useEffect } from 'react';
import { useState } from 'react';
import './style.scss';
import axios from 'axios';
import MovieModal from '../MovieModal';

const Movies = () => {
  const [movieModalState, setMovieModalState] = useState(false);
  const [selectMovie, setSelectMovie] = useState();

  const [movieInfo, setMovieInfo] = useState([]);
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

  const onMovieDetail = (id: SetStateAction<undefined>) => {
    setMovieModalState(!movieModalState);
    setSelectMovie(id);
  };

  const closeModal = () => setMovieModalState(false);

  useEffect(() => {
    async function movieData() {
      const response = await axios.get(API_URL);
      setMovieInfo(response.data.results);
    }
    movieData();
  }, []);

  return (
    <>
      <ul className='moviesContainer'>
        {movieInfo.map((movie: any) => (
          <li
            key={movie.id}
            onClick={() => {
              onMovieDetail(movie.id);
            }}
          >
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' />
          </li>
        ))}
      </ul>
      {movieModalState && <MovieModal selectMovie={selectMovie} closeModal={closeModal} />}
    </>
  );
};

export default Movies;
