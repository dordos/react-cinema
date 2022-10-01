import React from "react";
import "./style.scss";

const Movies = ({ movieInfo }: any) => {
  // function focus = ( e:any ) =>{
  // e.target.style.width = '200px';
  // }

  return (
    <ul className="moviesContainer">
      {movieInfo.map((movie: any) => (
        <li key={movie.id}>
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
