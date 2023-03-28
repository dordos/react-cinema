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
import { movieDetailType, movieType } from '../../types/movieType';
import MovieAverage from '../../components/MovieAverage';

const PickList = () => {
  const [movieModalState, setMovieModalState] = useState(false);
  const [movieId, setMovieId] = useState<number | undefined>();

  const [movieInfo, setMovieInfo] = useState<movieType[]>();
  const [modalDetail, setModalDetail] = useState<movieDetailType | undefined>();

  const closeModal = () => setMovieModalState(false);

  const onMovieDetail = (selectId: number) => {
    setMovieModalState(!movieModalState);
    setMovieId(selectId);
    movieInfo?.filter((item: any) => {
      if (item.id == selectId) {
        setModalDetail(item);
      }
    });
    // star();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const pickMovieData = ref(database, `admins/${user.uid}`);
        get(pickMovieData).then((snapshot) => {
          if (snapshot.exists()) {
            const data = Object.entries(snapshot.val())
              .filter(([key, value]: any) => value.userMovieState.pick)
              .map(([key, value]) => ({ [key]: value }))
              .reduce((acc, cur) => Object.assign(acc, cur), []);
            const result = Object.values(data);
            setMovieInfo(result);
          }
        });
      }
    });
  }, [movieModalState]);

  return (
    <>
      <MenuBar />
      <ul className='pickList'>
        {movieInfo?.map((movie: any, idx) => (
          <li
            key={idx}
            onClick={() => {
              onMovieDetail(movie.id);
            }}
          >
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' />
            <div className='pickListInfo'>
              <h3>{movie.title}</h3>
              <MovieAverage movieAverage={movie?.vote_average} key={movie?.id} />
            </div>
          </li>
        ))}
      </ul>
      {movieModalState && (
        <MovieModal movieId={movieId} modalDetail={modalDetail} closeModal={closeModal} />
      )}
    </>
  );
};

export default PickList;
