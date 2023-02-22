import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { API_KEY } from '../api/theMovieAPI';

const useMoviesInfo = ({ selectMovie }: any) => {
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
  const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${selectMovie}?api_key=${API_KEY}&language=ko-KR`;

  const [movieId, getMovieId] = useState();
  const [movieInfo, setMovieInfo] = useState();

  useEffect(() => {
    async function movieData() {
      // const id = await axios.get(API_URL);
      const info = await axios.get(MOVIE_DETAIL);
      getMovieId(selectMovie);
      setMovieInfo(info.data);
    }
    movieData();
  }, []);
  return [movieInfo];
};

export default useMoviesInfo;
