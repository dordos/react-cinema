import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.scss';

const MovieModal = ({ movieDetail, selectMovieData }: any) => {
  // console.log(selectMovieData);
  // console.log(movieDetail);
  // console.log(movieDetail);
  // const ddd = `https://api.themoviedb.org/3/movie/${movieDetail}?api_key=${process.env.REACT_APP_CINEMA_API_KEY}`;
  // const [movieInfo, setMovieInfo] = useState([]);

  // useEffect(() => {
  //   const movieData = async () => {
  //     const response = await axios.get(ddd);
  //     setMovieInfo(response.data.poster_path);
  //     // console.log(response);
  //   };
  //   movieData();
  // }, []);

  return (
    <div className='movieModalContainer'>
      <div>dd</div>
    </div>
  );
};

export default MovieModal;
