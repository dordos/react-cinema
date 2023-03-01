import axios from 'axios';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { addMovies, getMovies } from '../../../api/firebase';
import { API_URL } from '../../../api/theMovieAPI';
import MovieModal from '../MovieModal';
import './style.scss';
import { movieType } from '../../../types/movieType';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Movies = () => {
  const [movieModalState, setMovieModalState] = useState(false);
  const closeModal = () => setMovieModalState(false);

  const [movieId, setMovieId] = useState<number | undefined>();
  const { data: movies } = useQuery(['movies'], getMovies);

  const onMovieDetail = (selectId: undefined | number) => {
    setMovieModalState(!movieModalState);
    setMovieId(selectId);
  };

  return (
    <>
      <ul className='moviesContainer'>
        {movies?.map((movie: any) => (
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
      {movieModalState && <MovieModal movieId={movieId} closeModal={closeModal} />}
    </>
  );
};

export default Movies;
