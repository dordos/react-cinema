import React from "react";
import "./style.scss";
import { Link, Route, Routes } from "react-router-dom";
import MovieDetail from "../MovieDetail";

const Movies = ({ movieInfo }: any) => {
  const focus = () => {
    // e.target.style.width = '200px';
    console.log("-> dd");
  };

  return (
    <ul className="moviesContainer">
      <Route element={<MovieDetail />} />
      {movieInfo.map((movie: any) => (
        <li key={movie.id} onMouseOver={focus}>
          {/*<p>{movie.title}</p>*/}
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt=""
          />
        </li>
      ))}
    </ul>
  );
};

export default Movies;
