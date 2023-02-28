import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { AiOutlineCloseCircle, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { setPickDB, getPickDB, getMovies } from '../../../api/firebase';
import MovieAverage from '../../MovieAverage';
import { useQuery } from 'react-query';
import { movieType } from '../../../types/movieType';
import { API_KEY } from '../../../api/theMovieAPI';

const MovieModal = ({ movieId, closeModal }: any) => {
  const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;

  const [movieDetailInfo, setMovieDetailInfo] = useState<any>();
  const [movieModalInfo, setMovieModalInfo] = useState<movieType>();

  const { data } = useQuery(['movies'], getMovies);

  const modalRef = useRef<HTMLDivElement>(null);

  const closeBtn = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current == e.target) closeModal();
  };

  //찜목록
  const [heartState, setHeartState] = useState(false);
  const [pickState, setPickState] = useState(false);
  const pickStateFn = (e: any) => {
    setPickDB(movieId, !pickState);
  };
  useEffect(() => {
    async function movieData() {
      const response = await axios.get(MOVIE_DETAIL);
      console.log(response.data);
      setMovieDetailInfo(response.data);
      console.log(movieDetailInfo);
    }
    movieData();
  }, [heartState]);

  console.log(movieDetailInfo);

  return (
    <div className='moviePreviewContainer' onClick={closeBtn} ref={modalRef}>
      <div className='previewContent'>
        <div className='previewLeft'>
          <Link to='/MovieDetail'>
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetailInfo?.poster_path}`} alt='' />
          </Link>
        </div>
        <div className='previewRight'>
          <div className='closeBtn'>
            <AiOutlineCloseCircle size='36' color='#a3a3a3' onClick={closeModal} />
          </div>
          <div className='previeTitle'>
            <Link to='/MovieDetail' state={{ movieDetailInfo }}>
              <h1>{movieDetailInfo?.title}</h1>
            </Link>
          </div>
          <div className='previewInfo'>
            <div className='metaData'>
              <span>{movieDetailInfo?.release_date}</span>
              <div>
                <MovieAverage
                  movieAverage={movieDetailInfo?.vote_average}
                  key={movieDetailInfo?.id}
                />
              </div>
            </div>

            <div className='overview'>
              <p>{movieDetailInfo?.overview}</p>
            </div>
            <div className='metaDataDetail'>
              <div>
                <p className='language'>
                  지원 언어 :
                  {movieDetailInfo?.spoken_languages.map((language, idx) => (
                    <span key={idx}>{language.iso_639_1}</span>
                  ))}
                </p>
                <p className='genres'>
                  장르 :
                  {movieDetailInfo?.genres.map((item, idx) => (
                    <span key={idx}>{item.name}</span>
                  ))}
                </p>
              </div>
            </div>
            <div className='myPageInfo'>
              <button
                className='pickHeart'
                onClick={() => {
                  setHeartState(!heartState);
                  pickStateFn(!pickState);
                }}
              >
                {!heartState ? <AiOutlineHeart color='#e5e5e5' /> : <AiFillHeart color='#f91f1f' />}
              </button>

              <button>
                <BsCartPlus className='addcart' color='#e5e5e5' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
