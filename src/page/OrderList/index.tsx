import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/ui/MenuBar';
import './style.scss';
import { BiDownArrow } from 'react-icons/bi';

const OrderList = () => {
  const API_URL = `https://api.themoviedb.org/3/movie/${505642}?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }&language=ko-KR`;

  type movieType = {
    title: string;
    release_date: string;
    runtime: number;
    overview: string;
    genres: Array<{ id: number; name: string }>;
    poster_path: string | undefined;
    spoken_languages: Array<{ iso_639_1: string }>;
    vote_average: number;
  };

  const [movieDetail, setMovieDetail] = useState<movieType>();

  useEffect(() => {
    async function movieData() {
      const response = await axios.get(API_URL);
      const results = response.data;
      setMovieDetail(results);
    }
    movieData();
  }, []);

  return (
    <>
      <MenuBar />
      <div className='orderList'>
        <div className='orderList__rentalListWrap'>
          <div>
            <h1>대여중인 목록</h1>
            <BiDownArrow />
          </div>
          <ul className='onRentalList'>
            <li>
              <div className='orderList__rentalInfoWrap'>
                <div className='orderLIst__imgBox'>
                  <img src={`https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`} alt='' />
                </div>
                <div className='orderList__rentalInfo'>
                  <h2>{movieDetail?.title}</h2>
                  <div>
                    <p>
                      대여 날짜 : <span>2022.02.02</span>
                    </p>
                    <p>
                      만료 날짜 : <span>2022.03.02</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className='orderList__rentalPriceWrap'>
                <h2>총 결제 금액</h2>
                <p>
                  10,000<span>원</span>
                </p>
              </div>
            </li>
            <li>
              <div className='orderList__rentalInfoWrap'>
                <div className='orderLIst__imgBox'>
                  <img src={`https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`} alt='' />
                </div>
                <div className='orderList__rentalInfo'>
                  <h2>{movieDetail?.title}</h2>
                  <div>
                    <p>
                      대여 날짜 : <span>2022.02.02</span>
                    </p>
                    <p>
                      만료 날짜 : <span>2022.03.02</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className='orderList__rentalPriceWrap'>
                <h2>총 결제 금액</h2>
                <p>
                  10,000<span>원</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className='orderList__rentalListWrap'>
          <div>
            <h1>대여만료 목록</h1>
            <BiDownArrow />
          </div>
          <ul className='outRentalList'>
            <li>
              <div className='orderList__rentalInfoWrap'>
                <div className='orderLIst__imgBox'>
                  <img src={`https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`} alt='' />
                </div>
                <div className='orderList__rentalInfo'>
                  <h2>{movieDetail?.title}</h2>
                  <div>
                    <p>
                      대여 날짜 : <span>2022.02.02</span>
                    </p>
                    <p>
                      만료 날짜 : <span>2022.03.02</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className='orderList__rentalExpire'>
                <h2>만료</h2>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderList;
