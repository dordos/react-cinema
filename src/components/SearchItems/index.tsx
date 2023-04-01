import React from 'react';
import { movieType } from '../../types/movieType';
import './style.scss'

const SearchItems = ({ searchData }: any) => {
  console.log(searchData);
  return (
    <ul className='pickList'>
        {movieInfo?.map((movie: any, idx) => (
          <li
            key={idx}
            onClick={() => {
              onMovieDetail(movie.id);
            }}
          >
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' />
            <div className='pickListInfo'>
              <h3>{movie.title}</h3>
              <MovieAverage movieAverage={movie?.vote_average} key={movie?.id} />
            </div>
          </li>
        ))}
      </ul>
      {movieModalState && (
        <MovieModal movieId={movieId} modalDetail={modalDetail} closeModal={closeModal} />
      )}
  );
};

export default SearchItems;
