import React, { useState } from 'react';
import { movieDetailType, movieType } from '../../types/movieType';
import MovieAverage from '../MovieAverage';
import MovieModal from '../ui/MovieModal';
import './style.scss';

const SearchItems = ({ searchData }: any) => {
  console.log(searchData);

  const [movieModalState, setMovieModalState] = useState(false);
  const [movieId, setMovieId] = useState<number | undefined>();
  const [modalDetail, setModalDetail] = useState<movieDetailType | undefined>();
  const closeModal = () => setMovieModalState(false);

  const onMovieDetail = (selectId: number) => {
    setMovieModalState(!movieModalState);
    setMovieId(selectId);
    searchData?.filter((item: any) => {
      if (item.id == selectId) {
        setModalDetail(item);
      }
    });
  };
  return (
    <>
      <ul className='searchItems'>
        {searchData?.map((movie: any, idx: number) => (
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
    </>
  );
};

export default SearchItems;
