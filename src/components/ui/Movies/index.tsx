import { useEffect, useRef, useState } from 'react';
import { addMovieDetailDefault } from '../../../api/firebase';
import MovieModal from '../MovieModal';
import './style.scss';
import { ref, get } from 'firebase/database';
import { currentUser, database } from '../../../api/firebase';
import { movieDetailType, movieType } from '../../../types/movieType';
import { API_KEY } from '../../../api/theMovieAPI';
import axios from 'axios';

const Movies = () => {
  const [movieModalState, setMovieModalState] = useState(false);
  const closeModal = () => setMovieModalState(false);

  const [movieId, setMovieId] = useState<number | undefined>();
  const [modalDetail, setModalDetail] = useState<movieDetailType | undefined>();

  //page reload
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<movieType[]>([]);
  const observer = useRef<IntersectionObserver>();

  const nowDateFn = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1 > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
    let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
    return `${todayYear}-${todayMonth}-${todayDate}`;
  };

  const onMovieDetail = (selectId: number) => {
    const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${selectId}?api_key=${API_KEY}&language=ko-KR`;
    setMovieModalState(!movieModalState);
    setMovieId(selectId);

    const movieRef = ref(database, `admins/${currentUser}/${selectId}`);
    get(movieRef).then((snapshot) => {
      if (snapshot.exists()) {
        //데이터가 있으면
        setModalDetail(snapshot.val());
      } else {
        //없으면

        axios.get(MOVIE_DETAIL).then((response) => {
          const obj = {
            ...response.data,
            userMovieState: {
              pick: false,
              cartState: false,
              ordered: false,
              count: 0,
              startDate: nowDateFn(),
              endDate: nowDateFn(),
            },
          };
          setModalDetail(obj);
          addMovieDetailDefault(selectId, obj);
        });
      }
    });
  };

  const getMovies = async (page: number) => {
    let API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;

    const getData = await axios.get(API_URL);
    setMovies((prev) => [...prev, ...getData.data.results]);
  };

  const pageCallback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getMovies(page);
  }, [page]);

  useEffect(() => {
    observer.current = new IntersectionObserver(pageCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });
    return () => {
      observer.current?.disconnect();
    };
  });

  useEffect(() => {
    if (observer.current) {
      const pageRef = document.querySelector('#pageLoading');
      pageRef && observer.current.observe(pageRef);
    }
  }, [movies]);

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
        <MovieModal movieId={movieId} modalDetail={modalDetail} closeModal={closeModal} />
      )}
      <div id='pageLoading'></div>
    </>
  );
};

export default Movies;
