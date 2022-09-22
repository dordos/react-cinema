import React from "react";
import "./style.scss";

const Movies = ({ movieInfo }: any) => {
  console.log("-> movieInfo", movieInfo);
  return (
    <ul className="moviesContainer">
      {movieInfo.map((movie: any) => (
        <li key={movie.id}>
          {/*<p>{movie.title}</p>*/}
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt=""
          />
        </li>
      ))}
    </ul>
  );
};

export default Movies;
