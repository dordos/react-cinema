import React, { useState } from 'react';
import { movieDetailType, movieType } from '../../types/movieType';
import MovieAverage from '../MovieAverage';
import MovieModal from '../ui/MovieModal';
import { AiOutlineClose } from 'react-icons/ai';

import './style.scss';

const SearchItems = ({ searchData }: any) => {
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
    <div className='searchItemContainer'>
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
              <h3>{movie.title.length > 20 ? movie.title.slice(0, 18) + '...' : movie.title}</h3>
              <MovieAverage movieAverage={movie?.vote_average} key={movie?.id} />
            </div>
          </li>
        ))}
      </ul>
      <button className='searchClose'>
        <AiOutlineClose />
      </button>
      {movieModalState && (
        <MovieModal movieId={movieId} modalDetail={modalDetail} closeModal={closeModal} />
      )}
    </div>
  );
};

export default SearchItems;
