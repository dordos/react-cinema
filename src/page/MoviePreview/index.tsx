import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.scss';

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
  };

  const [detailData, setDetailData] = useState<movieDetail>();

  useEffect(() => {
    async function movieDetail() {
      const response_detail = await axios.get(MOVIE_DETAIL);
      console.log(response_detail.data);
      setDetailData(response_detail.data);
    }
    movieDetail();
  }, []);
  return (
    <div className='moviePreviewContainer'>
      <div className='previewContent'>
        <div className='previewImg'>
          <img src={`https://image.tmdb.org/t/p/w500/${detailData?.poster_path}`} alt='' />
        </div>
        <div>
          <div className='metaData'>
            <span>{detailData?.release_date}</span>
          </div>
          <div className='overview'>
            <p>{detailData?.overview}</p>
          </div>
          <div className='metaDataDetail'>
            <div>
              <p className='language'>
                지원 언어 :
                {detailData?.spoken_languages.map((language) => (
                  <span>{language.iso_639_1}</span>
                ))}
              </p>
              <p className='genres'>
                <span>장르 : </span>
                {detailData?.genres.map((item) => `${item.name}, `)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePreview;
