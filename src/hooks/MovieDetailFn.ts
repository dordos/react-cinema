import axios from 'axios';
import { useEffect, useState } from 'react';
import {} from '../api/firebase';
import { API_KEY } from '../api/theMovieAPI';
import { movieDetailType } from '../types/movieType';

export async function MovieDetailFn(movieId: number) {
  const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
  const [movieDetailInfo, setMovieDetailInfo] = useState<movieDetailType | undefined>();
  // console.log('e');
  // return Object.values(snapshot.val());
  // console.log(snapshot.val());

  useEffect(() => {
    async function movieData() {
      const response = await axios.get(MOVIE_DETAIL);
      setMovieDetailInfo(response.data);
      // addMovieDetail(movieId, response.data);
    }
    movieData();
  }, []);
  console.log(movieDetailInfo);
  return movieDetailInfo;
}
