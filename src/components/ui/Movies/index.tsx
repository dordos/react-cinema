import React, { SetStateAction, useCallback, useEffect } from 'react';
import { useState } from 'react';
import './style.scss';
import axios from 'axios';
import MovieModal from '../MovieModal';
import { useQuery } from 'react-query';
import { API_URL } from '../../../api/theMovieAPI';
import useMoviesInfo from '../../../hooks/useMoviesInfo';

const Movies = () => {
  const [movieModalState, setMovieModalState] = useState(false);
  const [selectMovie, setSelectMovie] = useState();
  const [movieInfo, setMovieInfo] = useState([]);
  // const { isLoading, error, data } = useQuery(['movies'], MoviesInfo);

  const onMovieDetail = (id: SetStateAction<undefined>) => {
    setMovieModalState(!movieModalState);
    setSelectMovie(id);
  };
  // console.log(data);

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
      {movieModalState && (
        <MovieModal selectMovie={selectMovie} closeModal={closeModal} movieInfo={movieInfo} />
      )}
    </>
  );
};

export default Movies;
