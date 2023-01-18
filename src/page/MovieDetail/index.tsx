import React, { useState } from 'react';
import MenuBar from '../MenuBar';
import './style.scss';
import axios from 'axios';
import { useEffect } from 'react';

const MovieDetail = () => {
  const API_URL = `https://api.themoviedb.org/3/movie/${76600}?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }&language=ko-KR`;

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  type movieType = {
    title: string;
    poster_path: string;
  };

  const [movieDetail, setMovieDetail] = useState<String | any>([]);

  useEffect(() => {
    async function movieData() {
      const response = await axios.get(API_URL);
      const results = response.data;
      console.log(results);
      setMovieDetail(results);
    }
    movieData();
  }, []);
  // console.log(movieDetail);

  return (
    <>
      <MenuBar />
      <div className='movieDetail'>
        <div className='detail__wrap'>
          <div className='detail__poster'>
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`} alt='' />
          </div>
          <div className='detail__info'>
            <h1>{movieDetail.title}</h1>
            <div>
              <ul className='detail__subInfo'>
                <h3>{movieDetail.release_date}</h3>
                {movieDetail.genres.map((item: any) => (
                  <li key={item.id}>{item.name}</li>
                ))}
                <span>•{movieDetail.runtime}분</span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
