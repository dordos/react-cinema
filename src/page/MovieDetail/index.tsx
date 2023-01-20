import React, { useState } from 'react';
import MenuBar from '../MenuBar';
import './style.scss';
import axios from 'axios';
import { useEffect } from 'react';
import ImagePreview from '../../components/ImagePreview';
import VideoPreview from '../../components/VideoPreview';

const MovieDetail = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const API_URL = `https://api.themoviedb.org/3/movie/${505642}?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }&language=ko-KR`;

  const MOIVE_IMG = `https://api.themoviedb.org/3/movie/${505642}/images?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;

  const MOVIE_CAST = `https://api.themoviedb.org/3/movie/${505642}/credits?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;

  // /movie/{movie_id}/credits

  type movieType = {
    title: string;
    release_date: string;
    runtime: number;
    overview: string;
    genres: Array<{ id: number; name: string }>;
    poster_path: string | undefined;
  };

  type movieImgType = {
    backdrops: Array<{
      aspect_ratio: number;
      file_path: string;
      height: number;
      width: number;
    }>;
    posters: Array<{
      file_path: string;
      height: number;
      width: number;
    }>;
  };

  type movieCastType = {
    cast: Array<{
      profile_path: string;
    }>;
  };

  const [movieDetail, setMovieDetail] = useState<movieType>();

  const [images, setImages] = useState<movieImgType>();
  const [movieCast, setMovieCast] = useState<movieCastType>();

  useEffect(() => {
    async function movieData() {
      const response = await axios.get(API_URL);
      const results = response.data;
      setMovieDetail(results);

      const response_img = await axios.get(MOIVE_IMG);
      setImages(response_img.data);

      const response_cast = await axios.get(MOVIE_CAST);
      setMovieCast(response_cast.data);
    }
    movieData();
  }, []);
  console.log(movieCast);
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
              <h1>{movieDetail?.title}</h1>
              <div className='detail__subInfo'>
                <h3>{movieDetail?.release_date}</h3>
                <ul>
                  {movieDetail?.genres.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
                <span>•{movieDetail?.runtime}분</span>
              </div>
              <div className='detail__overview'>
                <h3>개요</h3>
                <p>{movieDetail?.overview}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='movieCastContainer'>
          <ul>
            {movieCast?.cast.map((item, idx) => (
              <li key={idx}>
                <img src={`https://image.tmdb.org/t/p/w300/${item.profile_path}`} alt='' />
              </li>
            ))}
          </ul>
        </div>

        <div className='detailMediaContainer'>
          <div className='selectMedia'>
            <span>미디어</span>
            <button onClick={onMedia}>포토</button>
            <button onClick={onMedia}>동영상</button>
          </div>
          {onPhoto && <ImagePreview />}
          {onVideo && <VideoPreview />}
          {/* <ul>
            {images?.backdrops.map((item: any, idx) => (
              <li key={idx}>
                <img src={`https://image.tmdb.org/t/p/w500/${item?.file_path}`} alt='' />
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
