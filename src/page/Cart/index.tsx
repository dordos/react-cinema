import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/ui/MenuBar';
import './style.scss';
import axios from 'axios';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineClose } from 'react-icons/ai';

import { FaEquals, FaPlus } from 'react-icons/fa';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '../../api/firebase';
import { get, ref } from 'firebase/database';

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
    spoken_languages: Array<{ iso_639_1: string }>;
    vote_average: number;
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
  // const [detailData, setDetailData] = useState<movieDetail>();

  const [starAverage, setStarAverage] = useState([
    <BsStar size='20' color='#888888' />,
    <BsStar size='20' color='#888888' />,
    <BsStar size='20' color='#888888' />,
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const cartData = ref(database, `admins/${user.uid}`);
        get(cartData).then((snapshot) => {
          const data = Object.entries(snapshot.val()).filter(
            ([key, vlaue]: any) => vlaue.userMovieState.cartState
          );
          console.log(data);
        });
      }
    });
  }, []);

  return (
    <>
      <MenuBar />
      <div className='cartWrap'>
        <div className='boxControl'>
          <div className='box-all-select'>
            <input type='checkbox' />
            <p>전체선택</p>
          </div>
          <button>
            <AiOutlineClose />
            <p>선택삭제</p>
          </button>
        </div>

        <ul className='cart'>
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
              <div className='cartAverage'>
                <div className='averageImg'>{starAverage}</div>
                <div className='avaerageNum'>{movieDetail?.vote_average}</div>
              </div>
              <div className='cartInfo__metaData'>
                <div className='moviedDte'>{movieDetail?.release_date}</div>
                <div className='movieTime'>•{movieDetail?.runtime}분</div>
              </div>
              <p className='genres'>
                장르 :
                {movieDetail?.genres.map((item, idx) => (
                  <span key={idx}>{item.name}</span>
                ))}
              </p>
              <p className='language'>
                지원 언어 :
                {movieDetail?.spoken_languages.map((language, idx) => (
                  <span key={idx}>{language.iso_639_1}</span>
                ))}
              </p>
            </div>

            <div className='rentalTime'>
              <h2>대여시간</h2>
              <div className='addRentalTime'>
                <AiOutlineMinusCircle />
                <p>23일</p>
                <AiOutlinePlusCircle />
              </div>
              <div className='retalDate'>
                <p>
                  <span>시작일 : </span>2022.02.12
                </p>
                <p>
                  <span>종료일 : </span> 2022.02.13
                </p>
              </div>
            </div>

            <div className='rentalPrice'>
              <h2>대여 금액</h2>
              <div>
                <p>10,000</p>
                <span>원</span>
              </div>
            </div>
            <div className='listClose'>
              <AiOutlineClose />
            </div>
          </li>

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
              <div className='cartAverage'>
                <div className='averageImg'>{starAverage}</div>
                <div className='avaerageNum'>{movieDetail?.vote_average}</div>
              </div>
              <div className='cartInfo__metaData'>
                <div className='moviedDte'>{movieDetail?.release_date}</div>
                <div className='movieTime'>•{movieDetail?.runtime}분</div>
              </div>
              <p className='genres'>
                장르 :
                {movieDetail?.genres.map((item, idx) => (
                  <span key={idx}>{item.name}</span>
                ))}
              </p>
              <p className='language'>
                지원 언어 :
                {movieDetail?.spoken_languages.map((language, idx) => (
                  <span key={idx}>{language.iso_639_1}</span>
                ))}
              </p>
            </div>

            <div className='rentalTime'>
              <h2>대여시간</h2>
              <div className='addRentalTime'>
                <AiOutlineMinusCircle />
                <p>23일</p>
                <AiOutlinePlusCircle />
              </div>
              <div className='retalDate'>
                <p>
                  <span>시작일 : </span>2022.02.12
                </p>
                <p>
                  <span>종료일 : </span> 2022.02.13
                </p>
              </div>
            </div>

            <div className='rentalPrice'>
              <h2>대여 금액</h2>
              <div>
                <p>10,000</p>
                <span>원</span>
              </div>
            </div>
            <div className='listClose'>
              <AiOutlineClose />
            </div>
          </li>

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
              <div className='cartAverage'>
                <div className='averageImg'>{starAverage}</div>
                <div className='avaerageNum'>{movieDetail?.vote_average}</div>
              </div>
              <div className='cartInfo__metaData'>
                <div className='moviedDte'>{movieDetail?.release_date}</div>
                <div className='movieTime'>•{movieDetail?.runtime}분</div>
              </div>
              <p className='genres'>
                장르 :
                {movieDetail?.genres.map((item, idx) => (
                  <span key={idx}>{item.name}</span>
                ))}
              </p>
              <p className='language'>
                지원 언어 :
                {movieDetail?.spoken_languages.map((language, idx) => (
                  <span key={idx}>{language.iso_639_1}</span>
                ))}
              </p>
            </div>

            <div className='rentalTime'>
              <h2>대여시간</h2>
              <div className='addRentalTime'>
                <AiOutlineMinusCircle />
                <p>23일</p>
                <AiOutlinePlusCircle />
              </div>
              <div className='retalDate'>
                <p>
                  <span>시작일 : </span>2022.02.12
                </p>
                <p>
                  <span>종료일 : </span> 2022.02.13
                </p>
              </div>
            </div>

            <div className='rentalPrice'>
              <h2>대여 금액</h2>
              <div>
                <p>10,000</p>
                <span>원</span>
              </div>
            </div>
            <div className='listClose'>
              <AiOutlineClose />
            </div>
          </li>

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
              <div className='cartAverage'>
                <div className='averageImg'>{starAverage}</div>
                <div className='avaerageNum'>{movieDetail?.vote_average}</div>
              </div>
              <div className='cartInfo__metaData'>
                <div className='moviedDte'>{movieDetail?.release_date}</div>
                <div className='movieTime'>•{movieDetail?.runtime}분</div>
              </div>
              <p className='genres'>
                장르 :
                {movieDetail?.genres.map((item, idx) => (
                  <span key={idx}>{item.name}</span>
                ))}
              </p>
              <p className='language'>
                지원 언어 :
                {movieDetail?.spoken_languages.map((language, idx) => (
                  <span key={idx}>{language.iso_639_1}</span>
                ))}
              </p>
            </div>

            <div className='rentalTime'>
              <h2>대여시간</h2>
              <div className='addRentalTime'>
                <AiOutlineMinusCircle />
                <p>23일</p>
                <AiOutlinePlusCircle />
              </div>
              <div className='retalDate'>
                <p>
                  <span>시작일 : </span>2022.02.12
                </p>
                <p>
                  <span>종료일 : </span> 2022.02.13
                </p>
              </div>
            </div>

            <div className='rentalPrice'>
              <h2>대여 금액</h2>
              <div>
                <p>10,000</p>
                <span>원</span>
              </div>
            </div>
            <div className='listClose'>
              <AiOutlineClose />
            </div>
          </li>

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
              <div className='cartAverage'>
                <div className='averageImg'>{starAverage}</div>
                <div className='avaerageNum'>{movieDetail?.vote_average}</div>
              </div>
              <div className='cartInfo__metaData'>
                <div className='moviedDte'>{movieDetail?.release_date}</div>
                <div className='movieTime'>•{movieDetail?.runtime}분</div>
              </div>
              <p className='genres'>
                장르 :
                {movieDetail?.genres.map((item, idx) => (
                  <span key={idx}>{item.name}</span>
                ))}
              </p>
              <p className='language'>
                지원 언어 :
                {movieDetail?.spoken_languages.map((language, idx) => (
                  <span key={idx}>{language.iso_639_1}</span>
                ))}
              </p>
            </div>

            <div className='rentalTime'>
              <h2>대여시간</h2>
              <div className='addRentalTime'>
                <AiOutlineMinusCircle />
                <p>23일</p>
                <AiOutlinePlusCircle />
              </div>
              <div className='retalDate'>
                <p>
                  <span>시작일 : </span>2022.02.12
                </p>
                <p>
                  <span>종료일 : </span> 2022.02.13
                </p>
              </div>
            </div>

            <div className='rentalPrice'>
              <h2>대여 금액</h2>
              <div>
                <p>10,000</p>
                <span>원</span>
              </div>
            </div>
            <div className='listClose'>
              <AiOutlineClose />
            </div>
          </li>

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
              <div className='cartAverage'>
                <div className='averageImg'>{starAverage}</div>
                <div className='avaerageNum'>{movieDetail?.vote_average}</div>
              </div>
              <div className='cartInfo__metaData'>
                <div className='moviedDte'>{movieDetail?.release_date}</div>
                <div className='movieTime'>•{movieDetail?.runtime}분</div>
              </div>
              <p className='genres'>
                장르 :
                {movieDetail?.genres.map((item, idx) => (
                  <span key={idx}>{item.name}</span>
                ))}
              </p>
              <p className='language'>
                지원 언어 :
                {movieDetail?.spoken_languages.map((language, idx) => (
                  <span key={idx}>{language.iso_639_1}</span>
                ))}
              </p>
            </div>

            <div className='rentalTime'>
              <h2>대여시간</h2>
              <div className='addRentalTime'>
                <AiOutlineMinusCircle />
                <p>23일</p>
                <AiOutlinePlusCircle />
              </div>
              <div className='retalDate'>
                <p>
                  <span>시작일 : </span>2022.02.12
                </p>
                <p>
                  <span>종료일 : </span> 2022.02.13
                </p>
              </div>
            </div>

            <div className='rentalPrice'>
              <h2>대여 금액</h2>
              <div>
                <p>10,000</p>
                <span>원</span>
              </div>
            </div>
            <div className='listClose'>
              <AiOutlineClose />
            </div>
          </li>

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
              <div className='cartAverage'>
                <div className='averageImg'>{starAverage}</div>
                <div className='avaerageNum'>{movieDetail?.vote_average}</div>
              </div>
              <div className='cartInfo__metaData'>
                <div className='moviedDte'>{movieDetail?.release_date}</div>
                <div className='movieTime'>•{movieDetail?.runtime}분</div>
              </div>
              <p className='genres'>
                장르 :
                {movieDetail?.genres.map((item, idx) => (
                  <span key={idx}>{item.name}</span>
                ))}
              </p>
              <p className='language'>
                지원 언어 :
                {movieDetail?.spoken_languages.map((language, idx) => (
                  <span key={idx}>{language.iso_639_1}</span>
                ))}
              </p>
            </div>

            <div className='rentalTime'>
              <h2>대여시간</h2>
              <div className='addRentalTime'>
                <AiOutlineMinusCircle />
                <p>23일</p>
                <AiOutlinePlusCircle />
              </div>
              <div className='retalDate'>
                <p>
                  <span>시작일 : </span>2022.02.12
                </p>
                <p>
                  <span>종료일 : </span> 2022.02.13
                </p>
              </div>
            </div>

            <div className='rentalPrice'>
              <h2>대여 금액</h2>
              <div>
                <p>10,000</p>
                <span>원</span>
              </div>
            </div>
            <div className='listClose'>
              <AiOutlineClose />
            </div>
          </li>

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
              <div className='cartAverage'>
                <div className='averageImg'>{starAverage}</div>
                <div className='avaerageNum'>{movieDetail?.vote_average}</div>
              </div>
              <div className='cartInfo__metaData'>
                <div className='moviedDte'>{movieDetail?.release_date}</div>
                <div className='movieTime'>•{movieDetail?.runtime}분</div>
              </div>
              <p className='genres'>
                장르 :
                {movieDetail?.genres.map((item, idx) => (
                  <span key={idx}>{item.name}</span>
                ))}
              </p>
              <p className='language'>
                지원 언어 :
                {movieDetail?.spoken_languages.map((language, idx) => (
                  <span key={idx}>{language.iso_639_1}</span>
                ))}
              </p>
            </div>

            <div className='rentalTime'>
              <h2>대여시간</h2>
              <div className='addRentalTime'>
                <AiOutlineMinusCircle />
                <p>23일</p>
                <AiOutlinePlusCircle />
              </div>
              <div className='retalDate'>
                <p>
                  <span>시작일 : </span>2022.02.12
                </p>
                <p>
                  <span>종료일 : </span> 2022.02.13
                </p>
              </div>
            </div>

            <div className='rentalPrice'>
              <h2>대여 금액</h2>
              <div>
                <p>10,000</p>
                <span>원</span>
              </div>
            </div>
            <div className='listClose'>
              <AiOutlineClose />
            </div>
          </li>

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
              <div className='cartAverage'>
                <div className='averageImg'>{starAverage}</div>
                <div className='avaerageNum'>{movieDetail?.vote_average}</div>
              </div>
              <div className='cartInfo__metaData'>
                <div className='moviedDte'>{movieDetail?.release_date}</div>
                <div className='movieTime'>•{movieDetail?.runtime}분</div>
              </div>
              <p className='genres'>
                장르 :
                {movieDetail?.genres.map((item, idx) => (
                  <span key={idx}>{item.name}</span>
                ))}
              </p>
              <p className='language'>
                지원 언어 :
                {movieDetail?.spoken_languages.map((language, idx) => (
                  <span key={idx}>{language.iso_639_1}</span>
                ))}
              </p>
            </div>

            <div className='rentalTime'>
              <h2>대여시간</h2>
              <div className='addRentalTime'>
                <AiOutlineMinusCircle />
                <p>23일</p>
                <AiOutlinePlusCircle />
              </div>
              <div className='retalDate'>
                <p>
                  <span>시작일 : </span>2022.02.12
                </p>
                <p>
                  <span>종료일 : </span> 2022.02.13
                </p>
              </div>
            </div>

            <div className='rentalPrice'>
              <h2>대여 금액</h2>
              <div>
                <p>10,000</p>
                <span>원</span>
              </div>
            </div>
            <div className='listClose'>
              <AiOutlineClose />
            </div>
          </li>

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
              <div className='cartAverage'>
                <div className='averageImg'>{starAverage}</div>
                <div className='avaerageNum'>{movieDetail?.vote_average}</div>
              </div>
              <div className='cartInfo__metaData'>
                <div className='moviedDte'>{movieDetail?.release_date}</div>
                <div className='movieTime'>•{movieDetail?.runtime}분</div>
              </div>
              <p className='genres'>
                장르 :
                {movieDetail?.genres.map((item, idx) => (
                  <span key={idx}>{item.name}</span>
                ))}
              </p>
              <p className='language'>
                지원 언어 :
                {movieDetail?.spoken_languages.map((language, idx) => (
                  <span key={idx}>{language.iso_639_1}</span>
                ))}
              </p>
            </div>

            <div className='rentalTime'>
              <h2>대여시간</h2>
              <div className='addRentalTime'>
                <AiOutlineMinusCircle />
                <p>23일</p>
                <AiOutlinePlusCircle />
              </div>
              <div className='retalDate'>
                <p>
                  <span>시작일 : </span>2022.02.12
                </p>
                <p>
                  <span>종료일 : </span> 2022.02.13
                </p>
              </div>
            </div>

            <div className='rentalPrice'>
              <h2>대여 금액</h2>
              <div>
                <p>10,000</p>
                <span>원</span>
              </div>
            </div>
            <div className='listClose'>
              <AiOutlineClose />
            </div>
          </li>

          <div className='totalPrice'>
            <div>
              <div className='selectAllMovieWrap'>
                <h2>총 선택 영화</h2>
                <div>
                  <p>2</p>
                  <span>편</span>
                </div>
              </div>
              <div>
                <FaPlus />
              </div>
              <div className='selectAllTimeWrap'>
                <h2>총 대여 시간</h2>
                <div>
                  <p>292</p>
                  <span>일</span>
                </div>
              </div>
              <div>
                <FaEquals />
              </div>
              <div className='selectAllPriceWrap'>
                <h2>총 결제 금액</h2>
                <div>
                  <p>24,000</p>
                  <span>원</span>
                </div>
              </div>
              <div>
                <button>결제하기</button>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Cart;
