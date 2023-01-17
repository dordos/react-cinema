import React, { useState } from 'react';
import MenuBar from '../MenuBar';
import './style.scss';
import axios from 'axios';
import { useEffect } from 'react';

const MovieDetail = () => {
  const API_URL = `https://api.themoviedb.org/3/movie/${76600}?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }&language=en-US`;

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  type movieType = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };

  const [movieDetail, setMovieDetail] = useState<movieType[]>([]);

  useEffect(() => {
    async function movieData() {
      const response = await axios.get(API_URL);
      console.log(response.data);
      setMovieDetail(response.data.results);
    }
    movieData();
    // writeUserData('eieie', 'eieiei', 'eie');
  }, []);

  return (
    <>
      <MenuBar />
      <div className='movieDetail'>
        <h2>ddd</h2>
        <p>{movieDetail.title}</p>
        <img src={`https://image.tmdb.org/t/p/w342${movieDetail.poster_path}`} alt='' />
        <p></p>
        {/* <img src={} alt='' /> */}
      </div>
    </>
  );
};

export default MovieDetail;
