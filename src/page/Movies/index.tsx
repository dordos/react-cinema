import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import './style.scss';
import MovieModal from '../../components/MovieModal';
import axios from 'axios';

const Movies = () => {
  const [movieModalOnOff, setMovieModalOnOff] = useState(false);
  const [movieDetail, setMovieDetail] = useState('');
  const [selectMovieData, setSelectMovieData] = useState({});

  const [movieInfo, setMovieInfo] = useState([]);
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    async function movieData() {
      const response = await axios.get(API_URL);
      setMovieInfo(response.data.results);
    }
    movieData();
    // writeUserData('eieie', 'eieiei', 'eie');
  }, []);

  const selectMovie = useCallback(() => {}, []);

  const onMovieDetail = (id: any) => {
    // console.log(id);
    setMovieModalOnOff(true);
    const selectMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
    const response = axios.get(selectMovie);
    // console.log(response.data);
    // setSelectMovieData(response.data);
    // setSelectMovieData(response.data);
    setMovieDetail(id);
  };
  return (
    <ul className='moviesContainer'>
      {movieInfo.map((movie: any) => (
        <li
          key={movie.id}
          onMouseOver={() => {
            onMovieDetail(movie.id);
          }}
        >
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' />
          {movieModalOnOff && (
            <MovieModal movieDetail={movieDetail} selectMovieData={selectMovieData} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Movies;
