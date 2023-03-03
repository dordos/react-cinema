import { useCallback, useState } from 'react';
import { API_KEY } from '../api/theMovieAPI';
import { movieDetailType } from '../types/movieType';

export async function MovieDetailFn(movieId: number | undefined) {
  const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
  // const [movieDetailInfo, setMovieDetailInfo] = useState<movieDetailType | undefined>();
  console.log(MOVIE_DETAIL);
  // console.log('e');
  // return Object.values(snapshot.val());
  // console.log(snapshot.val());

  return;
}
