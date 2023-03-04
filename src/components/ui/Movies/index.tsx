import axios from 'axios';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../../../api/firebase';
import MovieModal from '../MovieModal';
import './style.scss';

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
