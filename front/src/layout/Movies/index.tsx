import React from "react";
import { useState } from "react";
import "./style.scss";
import MovieModal from "../../components/MovieModal";
import axios from "axios";
// import { Link, Route, Routes } from "react-router-dom";

const Movies = ({ movieInfo, API_KEY }: any) => {
  const [movieModalOnOff, setMovieModalOnOff] = useState(false);
  const [movieDetail, setMovieDetail] = useState();
  const [selectMovieData, setSelectMovieData] = useState({});

  const onMovieDetail = (id: any) => {
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
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt=''
          />
          {movieModalOnOff && (
            <MovieModal
              movieDetail={movieDetail}
              selectMovieData={selectMovieData}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Movies;
