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
import { useLocation } from 'react-router-dom';
import { movieImg, movieType } from '../../types/movieType';
import { BsCartPlus } from 'react-icons/bs';
import { currentUser, database, setSeriesCart, setSeriesPickDB } from '../../api/firebase';
import { get, ref } from 'firebase/database';
import ModalCartAlert from '../../components/ModalCartAlert';
import { seriesDetailType, seriesType } from '../../types/seriesType';
import { API_KEY } from '../../api/theMovieAPI';

const SeriesDetail = () => {
  let { state } = useLocation();

  const API_URL = `https://api.themoviedb.org/3/tv/${state.seriesId}?api_key=${API_KEY}&language=en-US`;
  const MOIVE_IMG = `https://api.themoviedb.org/3/tv/${state.seriesId}/images?api_key=${API_KEY}`;

  const [seriesDetail, setSeriesDetail] = useState<seriesDetailType>();
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
    setSeriesPickDB(state.seriesId, state.modalDetail, !heartState);
  }

  console.log('d');
  function addCart() {
    setCartAlert(true);
    setTimeout(() => {
      setCartAlert(false);
    }, 2000);

    get(ref(database, `admins/${currentUser}/${state.seriesId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setSeriesCart(state.seriesId, state.setseriesDB, snapshot.val().userSeriesState);
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

  const [abc, abcc] = useState<any>();
  useEffect(() => {
    async function movieData() {
      const response = await axios.get(API_URL);
      const results = response.data;
      setSeriesDetail(results);

      const a = `https://api.themoviedb.org/3/tv/${82552}/episode_groups?api_key=${API_KEY}&language=en-US`;
      const bb = await axios.get(a);
      abcc(bb);

      const response_img = await axios.get(MOIVE_IMG);
      setImages(response_img.data);
      star(response.data.vote_average);
    }
    movieData();
    setHeartState(state.modalDetail.userSeriesState.pick);
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
      <div className='seriesDetail'>
        <div className='mainDetailContainer'>
          <img
            src={`https://image.tmdb.org/t/p/original/${images?.backdrops[0].file_path}`}
            alt=''
          />

          <div className='detail__wrap'>
            <div className='detail__poster'>
              <img src={`https://image.tmdb.org/t/p/w500/${seriesDetail?.poster_path}`} alt='' />
            </div>
            <div className='detail__info'>
              <div>
                <h1>{seriesDetail?.name}</h1>
                <div className='detail__subInfo'>
                  <span className='releaseData'>{seriesDetail?.first_air_date}</span>
                  <ul>
                    {seriesDetail?.genres.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                  <span className='movieTime'>•{seriesDetail?.episode_run_time[0]}분</span>
                  <div>{starAverage}</div>
                </div>
                <div className='detail__overview'>
                  <h3>개요</h3>
                  <p>{seriesDetail?.overview}</p>
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
        <div>
          <div className='episodeContainer'>
            <ul>
              {seriesDetail?.seasons.map((item) => (
                <li>
                  <div>
                    <h2>{item.name}</h2>
                    <p>{item.air_date}</p>
                  </div>
                  <div className='seriesDetailImg'>
                    <img
                      src={
                        item?.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${item?.poster_path}`
                          : `https://image.tmdb.org/t/p/w500/${seriesDetail.poster_path}`
                      }
                      alt=''
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeriesDetail;
