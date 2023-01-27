import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.scss';
import cart from '../../img/cart.svg';
import heart from '../../img/heart.svg';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

const MoviePreview = () => {
  const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${505642}?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }&language=ko-KR`;

  type movieDetail = {
    poster_path: string;
    release_date: string;
    overview: string;
    genres: Array<{ id: number; name: string }>;
    spoken_languages: Array<{ iso_639_1: string }>;
    vote_average: number;
  };

  const [detailData, setDetailData] = useState<movieDetail>();

  const average = (e: any) => {
    console.log(e);
  };

  useEffect(() => {
    async function movieDetail() {
      const response_detail = await axios.get(MOVIE_DETAIL);
      // console.log(response_detail.data);
      average(response_detail.data);
      setDetailData(response_detail.data);
    }
    movieDetail();
  }, []);
  return (
    <div className='moviePreviewContainer'>
      <div className='previewContent'>
        <div className='previewLeft'>
          <img src={`https://image.tmdb.org/t/p/w500/${detailData?.poster_path}`} alt='' />
        </div>
        <div className='previewRight'>
          <div className='closeBtn'>
            <AiOutlineCloseCircle size='36' color='#353535' />
          </div>
          <div className='previewInfo'>
            <div className='metaData'>
              <span>{detailData?.release_date}</span>
              <div>
                <BsStarFill size='24' color='#31da3a' />
                <BsStarHalf size='24' color='#31da3a' />
                <BsStar size='24' color='#31da3a' />
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
              <div className='heartWrap'>
                <img src={heart} alt='' />
              </div>
              <div className='cartWrap'>
                <img src={cart} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePreview;
