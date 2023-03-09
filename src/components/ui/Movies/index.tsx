import { useEffect, useState } from 'react';
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
  const [movieInfo, setMovieInfo] = useState<movieDetailType | undefined>();
  const [switchPickData, setSwitchPickData] = useState();

  const onMovieDetail = (selectId: number) => {
    const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${selectId}?api_key=${API_KEY}&language=ko-KR`;
    setMovieModalState(!movieModalState);
    setMovieId(selectId);

    const movieRef = ref(database, `admins/${currentUser}/${selectId}`);
    get(movieRef).then((snapshot) => {
      if (snapshot.exists()) {
        //데이터가 있으면
        setMovieInfo(snapshot.val());
      } else {
        //없으면
        axios.get(MOVIE_DETAIL).then((response) => {
          const obj = {
            ...response.data,
            userMovieState: { pick: false },
          };
          setMovieInfo(obj);
        });
      }
    });
  };
  useEffect(() => {}, [switchPickData]);
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
      {movieModalState && (
        <MovieModal
          movieId={movieId}
          movieInfo={movieInfo}
          switchPickData={setSwitchPickData}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Movies;
