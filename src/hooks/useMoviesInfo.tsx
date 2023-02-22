import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_KEY } from '../api/theMovieAPI';
import { movieType } from '../types/movieType';

const useMoviesInfo = ({ selectMovie }: any) => {
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
  const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${selectMovie}?api_key=${API_KEY}&language=ko-KR`;

  const [movieId, getMovieId] = useState();
  const [movieInfo, setMovieInfo] = useState<movieType>();

  useEffect(() => {
    async function movieData() {
      // const id = await axios.get(API_URL);
      const response = await axios.get(MOVIE_DETAIL);
      getMovieId(selectMovie);
      setMovieInfo(response.data);
    }
    movieData();
  }, []);
  return [movieInfo];
};

export default useMoviesInfo;
