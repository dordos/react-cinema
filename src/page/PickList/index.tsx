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
import { seriesDetailType, seriesType } from '../../types/seriesType';

const PickList = () => {
  type dd = {
    movie: boolean;
    series: boolean;
    closeBtn: boolean;
  };

  const [deliveryModalState, setDeliveryModalState] = useState({
    movie: false,
    series: false,
    closeBtn: false,
  });
  const [movieId, setMovieId] = useState<number | undefined>();

  const [movieInfo, setMovieInfo] = useState<movieType[] | seriesType[] | any[]>();
  const [movieModalDetail, setMovieModalDetail] = useState<movieDetailType | undefined>();
  const [seriesModalDetail, setSeriesModalDetail] = useState<seriesDetailType | undefined>();

  const closeModal = () => setDeliveryModalState({ ...deliveryModalState, closeBtn: false });

  const deliveryDetail = (selectId: number) => {
    // setDeliveryModalState(!deliveryModalState.movie);
    setMovieId(selectId);
    movieInfo?.filter((item: any) => {
      if (item.id === selectId && item.userMovieState) {
        setMovieModalDetail(item);
      } else {
        setSeriesModalDetail(item);
      }
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const pickMovieData = ref(database, `admins/${user.uid}`);
        get(pickMovieData).then((snapshot) => {
          if (snapshot.exists()) {
            const data = Object.entries(snapshot.val())
              .filter(
                ([key, value]: any) =>
                  (value.userMovieState && value.userMovieState.pick) ||
                  (value.userSeriesState && value.userSeriesState.pick)
              )
              .map(([key, value]) => ({ [key]: value }))
              .reduce((acc, cur) => Object.assign(acc, cur), []);
            const result = Object.values(data);
            setMovieInfo(result);
          }
        });
      }
    });
  }, [deliveryModalState]);
  return (
    <>
      <MenuBar />
      <ul className='pickList'>
        {movieInfo?.map((movie: any, idx) => (
          <li
            key={idx}
            onClick={() => {
              deliveryDetail(movie.id);
            }}
          >
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' />
            <div className='pickListInfo'>
              <h3>{movie.title || movie.name}</h3>
              <MovieAverage movieAverage={movie?.vote_average} key={movie?.id} />
            </div>
          </li>
        ))}
      </ul>
      {deliveryModalState && (
        <MovieModal movieId={movieId} modalDetail={movieModalDetail} closeModal={closeModal} />
      )}
    </>
  );
};

export default PickList;
