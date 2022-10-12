import React from "react";
import "./style.scss";
// import { Link, Route, Routes } from "react-router-dom";

const Movies = ({ movieInfo }: any) => {
  // const focus = () => {
  //   // e.target.style.width = '200px';
  //   console.log("-> dd");
  // };
  // <Link to={movie.id} />

  return (
    <ul className="moviesContainer">
      {movieInfo.map((movie: any) => (
        <li key={movie.id}>
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
