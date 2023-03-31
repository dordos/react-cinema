// 데이터 키
export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=30&with_watch_monetization_types=flatrate`;
