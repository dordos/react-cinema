import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { AiOutlineCloseCircle, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsStar, BsStarHalf, BsStarFill, BsCartPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { movieDetail } from '../../types/movieType';
import { setPickDB } from '../../api/firebase';
import { API_KEY } from '../../api/theMovieAPI';
import useMoviesInfo from '../../hooks/MoviesInfo';

const MovieModal = ({ selectMovie, closeModal }: any) => {
  // const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${selectMovie}?api_key=${API_KEY}&language=ko-KR`;

  const [detailData, setDetailData] = useState<movieDetail>();
  const [starAverage, setStarAverage] = useState([
    <BsStar />,
    <BsStar />,
    <BsStar />,
    <BsStar />,
    <BsStar />,
  ]);

  const [movieInfo] = useMoviesInfo({ selectMovie });

  const modalRef = useRef<HTMLDivElement>(null);

  const closeBtn = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current == e.target) closeModal();
  };

  console.log(movieInfo);

  //찜목록
  const [heartState, setHeartState] = useState(false);
  const [pickState, setPickState] = useState(false);
  const pickStateFn = (e: any) => {
    setPickState(e);
    setPickDB(selectMovie, !pickState);
  };

  const star = (average: number) => {
    const [first, second] = ((average / 10) * 5).toFixed(1).split('.');
    const averageCopy = [...starAverage];

    for (let i = 0; i < Number(first); i++) {
      averageCopy[i] = <BsStarFill size='20' color='#e22232' />;
    }
    if (Number(second) >= 5) {
      averageCopy[Number(first)] = <BsStarHalf size='20' color='#e22232' />;
    }
    setStarAverage(averageCopy);
  };

  useEffect(() => {
    async function movieDetail() {
      // const response_detail = await axios.get(MOVIE_DETAIL);
      // star(response_detail.data.vote_average);
      // setDetailData(response_detail.data);
    }
    movieDetail();
  }, [heartState]);

  return (
    <div className='moviePreviewContainer' onClick={closeBtn} ref={modalRef}>
      <div className='previewContent'>
        <div className='previewLeft'>
          <Link to='/MovieDetail'>
            <img src={`https://image.tmdb.org/t/p/w500/${detailData?.poster_path}`} alt='' />
          </Link>
        </div>
        <div className='previewRight'>
          <div className='closeBtn'>
            <AiOutlineCloseCircle size='36' color='#a3a3a3' onClick={closeModal} />
          </div>
          <div className='previeTitle'>
            <Link to='/MovieDetail' state={{ detailData }}>
              <h1>{detailData?.title}</h1>
            </Link>
          </div>
          <div className='previewInfo'>
            <div className='metaData'>
              <span>{detailData?.release_date}</span>
              <div>{starAverage}</div>
            </div>

            <div className='overview'>
              <p>{detailData?.overview}</p>
            </div>
            <div className='metaDataDetail'>
              <div>
                <p className='language'>
                  지원 언어 :
                  {detailData?.spoken_languages.map((language, idx) => (
                    <span key={idx}>{language.iso_639_1}</span>
                  ))}
                </p>
                <p className='genres'>
                  장르 :
                  {detailData?.genres.map((item, idx) => (
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
