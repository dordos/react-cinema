import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { AiOutlineCloseCircle, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { setPickDB } from '../../../api/firebase';
import useMoviesInfo from '../../../hooks/useMoviesInfo';
import MovieAverage from '../../MovieAverage';

const MovieModal = ({ selectMovie, closeModal }: any) => {
  const [movieInfo] = useMoviesInfo({ selectMovie });

  const modalRef = useRef<HTMLDivElement>(null);

  const closeBtn = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current == e.target) closeModal();
  };

  //찜목록
  const [heartState, setHeartState] = useState(false);
  const [pickState, setPickState] = useState(false);
  const pickStateFn = (e: any) => {
    setPickState(e);
    setPickDB(selectMovie, !pickState);
  };

  useEffect(() => {}, [heartState]);

  return (
    <div className='moviePreviewContainer' onClick={closeBtn} ref={modalRef}>
      <div className='previewContent'>
        <div className='previewLeft'>
          <Link to='/MovieDetail'>
            <img src={`https://image.tmdb.org/t/p/w500/${movieInfo?.poster_path}`} alt='' />
          </Link>
        </div>
        <div className='previewRight'>
          <div className='closeBtn'>
            <AiOutlineCloseCircle size='36' color='#a3a3a3' onClick={closeModal} />
          </div>
          <div className='previeTitle'>
            <Link to='/MovieDetail' state={{ movieInfo }}>
              <h1>{movieInfo?.title}</h1>
            </Link>
          </div>
          <div className='previewInfo'>
            <div className='metaData'>
              <span>{movieInfo?.release_date}</span>
              <MovieAverage selectMovie={selectMovie} />
            </div>

            <div className='overview'>
              <p>{movieInfo?.overview}</p>
            </div>
            <div className='metaDataDetail'>
              <div>
                <p className='language'>
                  지원 언어 :
                  {movieInfo?.spoken_languages.map((language, idx) => (
                    <span key={idx}>{language.iso_639_1}</span>
                  ))}
                </p>
                <p className='genres'>
                  장르 :
                  {movieInfo?.genres.map((item, idx) => (
                    <span key={idx}>{item.name}</span>
                  ))}
                </p>
              </div>
            </div>
            <div className='myPageInfo'>
              {!heartState && (
                <AiOutlineHeart
                  className='OutlineHeart'
                  onClick={() => {
                    setHeartState(!heartState);
                    pickStateFn(!pickState);
                  }}
                />
              )}

              {heartState && (
                <AiFillHeart
                  className='fillHeart'
                  onClick={() => {
                    setHeartState(!heartState);
                    pickStateFn(!pickState);
                  }}
                />
              )}
              <BsCartPlus className='addcart' color='#e5e5e5' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
