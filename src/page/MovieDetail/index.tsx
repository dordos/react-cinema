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

  const abc = `https://api.themoviedb.org/3/movie/${736526}/images?api_key=4da4938becf4ad52986c62a9c6d97a79`;

  type movieType = {
    title: string;
    release_date: string;
    runtime: number;
    overview: string;
    genres: Array<{ id: number; name: string }>;
    poster_path: string | undefined;
  };

  const [movieDetail, setMovieDetail] = useState<movieType>();

  const [abcc, setAbcc] = useState<string | any>();

  useEffect(() => {
    async function movieData() {
      const response = await axios.get(API_URL);
      const results = response.data;

      setMovieDetail(results);
      // const ddd = await axios.get(abc);wj
      // const ac = ddd.data;

      // console.log(results);
      // setAbcc(ac);
    }
    movieData();
  }, []);
  console.log(movieDetail);
  // console.log(movieDetail);

  return (
    <>
      <MenuBar />
      <div className='movieDetail'>
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
            {/* {abcc.map((item: any) => (
              <li>
                <img src={item} alt='' />
              </li>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
