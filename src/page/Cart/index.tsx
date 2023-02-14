import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/MenuBar';
import './style.scss';
import axios from 'axios';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

const Cart = () => {
  const API_URL = `https://api.themoviedb.org/3/movie/${505642}?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }&language=ko-KR`;

  const MOIVE_IMG = `https://api.themoviedb.org/3/movie/${505642}/images?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;

  type movieType = {
    title: string;
    release_date: string;
    runtime: number;
    overview: string;
    genres: Array<{ id: number; name: string }>;
    poster_path: string | undefined;
  };

  type movieImgType = {
    backdrops: Array<{
      aspect_ratio: number;
      file_path: string;
      height: number;
      width: number;
    }>;
    posters: Array<{
      file_path: string;
      height: number;
      width: number;
    }>;
  };

  const [movieDetail, setMovieDetail] = useState<movieType>();
  const [images, setImages] = useState<movieImgType>();

  const [starAverage, setStarAverage] = useState([
    <BsStar size='20' color='#e22232' />,
    <BsStar size='20' color='#e22232' />,
    <BsStar size='20' color='#e22232' />,
    <BsStar size='20' color='#888888' />,
    <BsStar size='20' color='#888888' />,
  ]);

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
    async function movieData() {
      const response = await axios.get(API_URL);
      const results = response.data;
      setMovieDetail(results);

      const response_img = await axios.get(MOIVE_IMG);
      setImages(response_img.data);
      star(response.data.vote_average);
    }
    movieData();
  }, []);

  return (
    <>
      <MenuBar />
      <ul className='cart'>
        <div>
          <h1>장바구니</h1>
        </div>

        <li className='cartItemList'>
          <div className='orderCheck'>
            <input type='checkbox' id='check1' />
            <label htmlFor='check1'></label>
          </div>
          <div className='cartItem__img'>
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`} alt='' />
          </div>

          <div className='cartInfo'>
            <h1>{movieDetail?.title}</h1>
            <div>{starAverage}</div>
            <span className='genres'>{movieDetail?.release_date}</span>
            <span className='movieTime'>•{movieDetail?.runtime}분</span>
            <ul>
              {movieDetail?.genres.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>

          <div className='rentalTime'>
            <h2>대여시간</h2>
            <div className='addRentalTime'>
              <AiOutlineMinusCircle />
              <p>23일</p>
              <AiOutlinePlusCircle />
            </div>
            <div>
              <p>2022.02.12</p>
              <p>~</p>
              <p> 2022.02.13</p>
            </div>
          </div>

          <div>
            <h2>대여 금액</h2>
            <p>10,000원</p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Cart;
