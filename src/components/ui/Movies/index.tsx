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
  //디테일 url

  const [movieInfo, setMovieInfo] = useState<movieDetailType | undefined>();
  const [temporary, setTemporary] = useState();

  const onMovieDetail = (selectId: number) => {
    const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${selectId}?api_key=${API_KEY}&language=ko-KR`;
    setMovieModalState(!movieModalState);
    setMovieId(selectId);

    const movieRef = ref(database, `admins/${currentUser}/${movieId}`);
    get(movieRef).then((snapshot) => {
      if (snapshot.exists()) {
        //데이터가 있으면
        setMovieInfo(snapshot.val());
        console.log('데이터가 있다');
        console.log(snapshot.val());
      } else {
        //데이터가 없으면
        axios.get(MOVIE_DETAIL).then((response) => {
          const obj = {
            ...response.data,
            userMovieState: { pick: false },
          };
          setMovieInfo(obj);
        });
      }
      // setMovieDetail({ ...snapshot.val(), userMovieState: { pick: false } });
    });
  };

  // useEffect(() => {
  //   // const prepareMovieInfo = async () => {
  //   //   const response = await axios.get(MOVIE_DETAIL);
  //   //   console.log(response);
  //   //   // setPickDB(movieId, response.data, false);
  //   // };
  //   // prepareMovieInfo();
  // }, [movieInfo, temporary]);

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
        <MovieModal movieId={movieId} movieInfo={movieInfo} closeModal={closeModal} />
      )}
    </>
  );
};

export default Movies;
