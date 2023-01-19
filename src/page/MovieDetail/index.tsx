import React, { useState } from 'react';
import MenuBar from '../MenuBar';
import './style.scss';
import axios from 'axios';
import { useEffect } from 'react';

const MovieDetail = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const API_URL = `https://api.themoviedb.org/3/movie/${76600}?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }&language=ko-KR`;

  const MOIVE_IMG = `https://api.themoviedb.org/3/movie/${76600}/images?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;

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
    results: Array<{ key: string | undefined }>;
  };

  const [movieDetail, setMovieDetail] = useState<movieType>();

  const [images, setImages] = useState<movieImgType>();
  const [videos, setVideos] = useState<movieImgType | undefined>();

  useEffect(() => {
    async function movieData() {
      const response = await axios.get(API_URL);
      const results = response.data;
      setMovieDetail(results);

      const response_img = await axios.get(MOIVE_IMG);
      setImages(response_img.data);

      const response_video = await axios.get(MOIVE_VIDEO);
      setVideos(response_video.data);
    }
    movieData();
  }, []);
  // console.log(movieDetail);

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

        <div className='detailMediaContainer'>
          <div className='selectMedia'>
            <span>미디어</span>
            <button>포토</button>
            <button>동영상</button>
          </div>
          <ul>
            {images?.backdrops.map((item: any, idx) => (
              <li key={idx}>
                <img src={`https://image.tmdb.org/t/p/w500/${item?.file_path}`} alt='' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;