import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import {
  AiOutlineCloseCircle,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

const MoviePreview = ({ selectMovie, movieModalState, closeModal }: any) => {
  const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${selectMovie}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR`;

  type movieDetail = {
    poster_path: string;
    release_date: string;
    overview: string;
    genres: Array<{ id: number; name: string }>;
    spoken_languages: Array<{ iso_639_1: string }>;
    vote_average: number;
    title: string;
  };

  const [detailData, setDetailData] = useState<movieDetail>();
  const [heartState, setHeartState] = useState(false);

  const [movieAverage, setMovieAverage] = useState([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeBtn = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current == e.target) closeModal();
  };

  useEffect(() => {
    async function movieDetail() {
      const response_detail = await axios.get(MOVIE_DETAIL);
      console.log(response_detail.data);

      setDetailData(response_detail.data);
    }
    movieDetail();
  }, []);

  return (
    <div className='moviePreviewContainer' onClick={closeBtn} ref={modalRef}>
      <div className='previewContent'>
        <div className='previewLeft'>
          <img src={`https://image.tmdb.org/t/p/w500/${detailData?.poster_path}`} alt='' />
        </div>
        <div className='previewRight'>
          <div className='closeBtn'>
            <AiOutlineCloseCircle size='36' color='#a3a3a3' onClick={closeModal} />
          </div>
          <div className='previeTitle'>
            <h1>{detailData?.title}</h1>
          </div>
          <div className='previewInfo'>
            <div className='metaData'>
              <span>{detailData?.release_date}</span>
              <div>
                <BsStarFill size='20' color='#3beb12' />
                <BsStarFill size='20' color='#3beb12' />
                <BsStarFill size='20' color='#3beb12' />
                <BsStarHalf size='20' color='#3beb12' />
                <BsStar size='20' color='#3beb12' />
              </div>
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
              {/* <AiFillHeart className='fillHeart' color='#f91f1f' /> */}
              {!heartState && (
                <AiOutlineHeart
                  className='OutlineHeart'
                  color='#e5e5e5'
                  onClick={() => setHeartState(!heartState)}
                />
              )}

              {heartState && (
                <AiFillHeart
                  className='fillHeart'
                  color='#f91f1f'
                  onClick={() => setHeartState(!heartState)}
                />
              )}
              <AiOutlineShoppingCart className='addcart' color='#e5e5e5' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePreview;
