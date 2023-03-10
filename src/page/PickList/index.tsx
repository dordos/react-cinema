import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieModal from '../../components/ui/MovieModal';
import MenuBar from '../../components/ui/MenuBar';
import './style.scss';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
import { auth, currentUser, database } from '../../api/firebase';
import { get, ref } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const PickList = () => {
  const [movieModalState, setMovieModalState] = useState(false);
  const [selectMovie, setSelectMovie] = useState();

  const [movieInfo, setMovieInfo] = useState([]);
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const closeModal = () => setMovieModalState(false);

  const onMovieDetail = (id: any) => {
    const selectMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`;
    const response = axios.get(selectMovie);
    setMovieModalState(!movieModalState);
    setSelectMovie(id);
  };

  const [starAverage, setStarAverage] = useState([
    <BsStarFill size='14' color='#e22232' />,
    <BsStarFill size='14' color='#e22232' />,
    <BsStarFill size='14' color='#e22232' />,
    <BsStar size='14' color='#888888' />,
    <BsStar size='14' color='#888888' />,
  ]);

  const star = (average: number) => {
    const [first, second] = ((average / 10) * 5).toFixed(1).split('.');
    const averageCopy = [...starAverage];

    for (let i = 0; i < Number(first); i++) {
      averageCopy[i] = <BsStarFill size='20' color='#3beb12' />;
    }
    if (Number(second) >= 5) {
      averageCopy[Number(first)] = <BsStarHalf size='20' color='#3beb12' />;
    }
    setStarAverage(averageCopy);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const pickMovieData = ref(database, `admins/${user.uid}`);
        get(pickMovieData).then((snapshot) => {
          if (snapshot.exists()) {
            const data = Object.keys(snapshot.val());
            const selectPickObj = data.reduce((result: any, key: any) => {
              if (snapshot.val()[key].userMovieState.pick === true) {
                result[key] = data[key];
              }
              return result;
            }, {});
            console.log(selectPickObj);
          }
        });
      }
    });

    // const keys = Object.keys(data);
    // const foundKey = keys.find((key) => data[key].useState.pick === true);
    // console.log(foundKey);

    // get(userId).then((snapshot) => {
    //   console.log(snapshot.exists());
    //   if (snapshot.exists()) {
    //     //데이터가 있으면
    //     setMovieInfo(snapshot.val());
    //   }
    // });
  }, []);

  return (
    <>
      <MenuBar />
      <ul className='pickList'>
        {movieInfo.map((movie: any, idx) => (
          <li
            key={idx}
            onClick={() => {
              onMovieDetail(movie.id);
            }}
          >
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' />
            <div className='pickListInfo'>
              <h3>{movie.title}</h3>
              <div>{starAverage}</div>
            </div>
          </li>
        ))}
      </ul>
      {movieModalState && (
        <MovieModal
          selectMovie={selectMovie}
          movieModalState={movieModalState}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default PickList;
