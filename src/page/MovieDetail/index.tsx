import React, { useState } from 'react';
import MenuBar from '../../components/ui/MenuBar';
import './style.scss';
import axios from 'axios';
import { useEffect } from 'react';
import ImagePreview from '../../components/ui/ImagePreview';
import VideoPreview from '../../components/ui/VideoPreview';
import MovieCast from '../../components/ui/MovieCast';
import MovieRec from '../../components/ui/MovieRec';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Social from '../../components/ui/MovieReviews';
import { useLocation } from 'react-router-dom';
import { movieImg, movieType } from '../../types/movieType';
import { BsCartPlus } from 'react-icons/bs';
import { currentUser, database, setCart, setPickDB } from '../../api/firebase';
import { get, ref } from 'firebase/database';
import ModalCartAlert from '../../components/ModalCartAlert';

const MovieDetail = () => {
  let { state } = useLocation();

  const API_URL = `https://api.themoviedb.org/3/movie/${state.movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR`;

  const MOIVE_IMG = `https://api.themoviedb.org/3/movie/${state.movieId}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  const [movieDetail, setMovieDetail] = useState<movieType>();
  const [heartState, setHeartState] = useState(false);
  const [images, setImages] = useState<movieImg>();
  const [cartAlert, setCartAlert] = useState(false);

  const [starAverage, setStarAverage] = useState([
    <BsStar size='20' color='#888888' />,
    <BsStar size='20' color='#888888' />,
    <BsStar size='20' color='#888888' />,
    <BsStar size='20' color='#888888' />,
    <BsStar size='20' color='#888888' />,
  ]);

  function pickStateFn() {
    setHeartState(!heartState);
    setPickDB(state.movieId, state.modalDetail, !heartState);
  }

  function addCart() {
    setCartAlert(true);
    setTimeout(() => {
      setCartAlert(false);
    }, 2000);

    get(ref(database, `admins/${currentUser}/${state.movieId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setCart(state.movieId, state.setMovieDB, snapshot.val().userMovieState);
      }
    });
  }

  const star = (average: number) => {
    const [first, second] = ((average / 10) * 5).toFixed(1).split('.');
    const averageCopy = [...starAverage];

    for (let i = 0; i < Number(first); i++) {
      averageCopy[i] = <BsStarFill size='20' color='#e22232' />;
    }
    if (Number(second) >= 5) {
      averageCopy[Number(first)] = <BsStarHalf size='20' color='#e22232' />;
    }
    setStarAverage(averageCopy);
  };

  useEffect(() => {
    async function movieData() {
      const response = await axios.get(API_URL);
      const results = response.data;
      setMovieDetail(results);

      const response_img = await axios.get(MOIVE_IMG);
      setImages(response_img.data);
      star(response.data.vote_average);
    }
    movieData();
    setHeartState(state.modalDetail.userMovieState.pick);
  }, []);
  const [onPhoto, setOnPhoto] = useState(true);
  const [onVideo, setOnVideo] = useState(false);

  const onMedia = () => {
    setOnPhoto(!onPhoto);
    setOnVideo(!onVideo);
  };

  return (
    <>
      <MenuBar />
      <div className='movieDetail'>
        <div className='mainDetailContainer'>
          <img
            src={`https://image.tmdb.org/t/p/original/${images?.backdrops[0].file_path}`}
            alt=''
          />

          <div className='detail__wrap'>
            <div className='detail__poster'>
              <img src={`https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`} alt='' />
            </div>
            <div className='detail__info'>
              <div>
                <h1>{movieDetail?.title}</h1>
                <div className='detail__subInfo'>
                  <span className='releaseData'>{movieDetail?.release_date}</span>
                  <ul>
                    {movieDetail?.genres.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                  <span className='movieTime'>•{movieDetail?.runtime}분</span>
                  <div>{starAverage}</div>
                </div>
                <div className='detail__overview'>
                  <h3>개요</h3>
                  <p>{movieDetail?.overview}</p>
                </div>
              </div>
              {cartAlert && <ModalCartAlert />}

              <div className='detailclickInfo'>
                <button onClick={pickStateFn}>
                  {heartState ? (
                    <AiFillHeart color='#f91f1f' />
                  ) : (
                    <AiOutlineHeart color='#e5e5e5' />
                  )}
                </button>
                <button onClick={addCart}>
                  <BsCartPlus className='addcart' color='#e5e5e5' />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <Social /> */}
        <MovieCast movieId={state.movieId} />
        <div className='detailMediaContainer'>
          <div className='selectMedia'>
            <h2>미디어</h2>
            <button onClick={onMedia}>포토</button>
            <button onClick={onMedia}>동영상</button>
          </div>
          {onPhoto && <ImagePreview movieId={state.movieId} />}
          {onVideo && <VideoPreview movieId={state.movieId} />}
        </div>
        <MovieRec />
      </div>
    </>
  );
};

export default MovieDetail;
