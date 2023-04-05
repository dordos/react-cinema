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
import SeriesModal from '../../components/ui/SeriesModal';

const PickList = () => {
  const [movieId, setMovieId] = useState<number | undefined>();

  const [movieInfo, setMovieInfo] = useState<movieType[] | seriesType[] | any[]>();
  const [movieModalDetail, setMovieModalDetail] = useState<movieDetailType | undefined>();
  const [seriesModalDetail, setSeriesModalDetail] = useState<seriesDetailType | undefined>();

  const [movieModalState, setMovieModalState] = useState(false);
  const [seriesModalState, setSeriesModalState] = useState(false);
  const movieCloseModal = () => setMovieModalState(false);
  const seriesCloseModal = () => setSeriesModalState(false);

  const deliveryDetail = (selectId: number) => {
    setMovieId(selectId);
    movieInfo?.filter((item: any) => {
      if (item.id === selectId && item.userMovieState) {
        setMovieModalState(!movieModalState);
        setMovieModalDetail(item);
      }
      if (item.id === selectId && item.userSeriesState) {
        setSeriesModalState(!seriesModalState);
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
  }, [movieModalState]);
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
      {movieModalState && (
        <MovieModal movieId={movieId} modalDetail={movieModalDetail} closeModal={movieCloseModal} />
      )}
      {seriesModalState && (
        <SeriesModal
          seriesId={movieId}
          modalDetail={seriesModalDetail}
          closeModal={seriesCloseModal}
        />
      )}
    </>
  );
};

export default PickList;
