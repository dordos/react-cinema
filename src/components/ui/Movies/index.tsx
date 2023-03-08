import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../../../api/firebase';
import MovieModal from '../MovieModal';
import './style.scss';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import { currentUser, database, getPickDB, setPickDB } from '../../../api/firebase';
import { movieDetailType } from '../../../types/movieType';
import axios from 'axios';
import { API_KEY } from '../../../api/theMovieAPI';

const Movies = () => {
  const [movieModalState, setMovieModalState] = useState(false);
  const closeModal = () => setMovieModalState(false);

  const [movieId, setMovieId] = useState<number | undefined>();
  const { data: movies } = useQuery(['movies'], getMovies);
  //디테일 url
  const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
  const [movieInfo, setMovieInfo] = useState<movieDetailType | undefined>();

  const onMovieDetail = (selectId: number) => {
    setMovieModalState(!movieModalState);
    setMovieId(selectId);

    const movieRef = ref(database, `admins/${currentUser}/${movieId}`);
    get(movieRef).then((snapshot) => {
      if (snapshot.exists()) {
        setMovieInfo({ ...snapshot.val(), userMovieState: { pick: false } });
        console.log(snapshot.val());
      } else {
        axios.get(MOVIE_DETAIL).then((response) => {
          console.log(response.data);
          setPickDB(selectId, response.data, false);
        });

        // setMovieDetail({ ...snapshot.val(), userMovieState: { pick: false } });
      }
    });
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
