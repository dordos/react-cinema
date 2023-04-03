import React, { useEffect, useRef, useState } from 'react';
import MenuBar from '../../components/ui/MenuBar';
import './style.scss';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineClose } from 'react-icons/ai';

import { FaElementor, FaEquals, FaPlus } from 'react-icons/fa';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, currentUser, database } from '../../api/firebase';
import { get, ref, set } from 'firebase/database';
import { movieDetailType } from '../../types/movieType';
import MovieAverage from '../../components/MovieAverage';
import PaymentWindow from '../../components/PaymentWindow';
import { seriesDetailType } from '../../types/seriesType';

const Cart = () => {
  const [cartData, setCartData] = useState<movieDetailType[] | seriesDetailType[] | any[]>();
  const prevCartData = useRef<movieDetailType[] | seriesDetailType[] | any[]>();
  const [cartCheckList, setCartCheckList] = useState<movieDetailType[]>([]);
  const [controlData, setControlData] = useState<movieDetailType>();
  const [countData, setCountData] = useState<number>(0);
  const [endDate, setEndDate] = useState<string>();
  const [itemRemove, setItemRemove] = useState<any>();
  const [paymentAlert, setPaymentAlert] = useState(false);
  const closeModal = () => setPaymentAlert(false);

  interface Data {
    userMovieState?: { cartState: boolean };
    userSeriesState?: { cartState: boolean };
  }

  const nowDateFn = (days: number) => {
    const today = new Date();
    const calculateDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days);
    let digitDate = `${calculateDate.getFullYear()}-${(calculateDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${calculateDate.getDate().toString().padStart(2, '0')}`;
    return digitDate;
  };

  const endDateFn = (days: movieDetailType) => {
    const calculateDate: any = nowDateFn(days.userMovieState.count);
    const filterDate = cartData?.filter((el) => el.id === days.id);
    const filterEndDate = filterDate?.reduce(
      (acc, item) => (item.userMovieState.endDate = calculateDate),
      '0000-00-00'
    );
    setEndDate(filterEndDate);
  };

  const plusDate = (target: movieDetailType, increase: number) => {
    const item = { ...target };
    if (item.userMovieState.count < 99) {
      item.userMovieState.count += increase;
      setControlData(item);
      totalData();
      endDateFn(item);
    }
  };
  const minusDate = (target: movieDetailType, decrease: number) => {
    const item = { ...target };
    if (item.userMovieState.count < 99 && item.userMovieState.count > 0) {
      item.userMovieState.count += decrease;
      setControlData(item);
      totalData();
      endDateFn(item);
    }
  };

  const totalData = () => {
    const filteredCartData = cartData?.filter((item: any) => cartCheckList.includes(item.id));
    const totalCount: any = filteredCartData?.reduce(
      (acc, item) => acc + item.userMovieState.count,
      0
    );
    setCountData(totalCount);
  };

  const cartSelect = (checked: boolean, id: any) => {
    if (checked) {
      cartData?.filter((item) => {
        if (item.id === id) {
          setCartCheckList((prev) => [...prev, item]);
        }
      });
    } else {
      setCartCheckList(cartCheckList.filter((el) => el.id !== id));
    }
  };

  const averageNumber = (average: number): string => {
    const num = average;
    const formattedNum = num.toFixed(1);
    return formattedNum;
  };

  //리스트 삭제 / 파이어베이스 삭제
  const removeCart = (movieId: number) => {
    const [removeTarget]: any = cartData?.filter((el) => el.id === movieId);
    setItemRemove(
      set(ref(database, `admins/${currentUser}/${movieId}`), {
        ...removeTarget,
        userMovieState: {
          ...removeTarget?.userMovieState,
          cartState: false,
          count: 0,
          startDate: nowDateFn(0),
          endDate: nowDateFn(0),
        },
      })
    );
  };

  const openPayment = () => {
    setPaymentAlert(!paymentAlert);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const cartData = ref(database, `admins/${user.uid}`);
        get(cartData).then((snapshot) => {
          if (snapshot.exists()) {
            const data = Object.values<movieDetailType | seriesDetailType>(snapshot.val());

            const cartDB = data.filter(
              (el: Data) => el.userMovieState?.cartState || el.userSeriesState?.cartState
            );

            if (JSON.stringify(cartDB) !== JSON.stringify(prevCartData.current)) {
              setCartData(cartDB);
              prevCartData.current = cartDB;
            }
          }
        });
      }
    });
    const endDate = nowDateFn(0);
    setEndDate(endDate);
  }, [itemRemove]);

  return (
    <>
      <MenuBar />
      <div className='cartWrap'>
        <ul className='cart'>
          {cartData &&
            cartData?.map((cartItem, idx) => (
              <li className='cartItemList' key={idx}>
                <div className='orderCheck'>
                  <input
                    type='checkbox'
                    className='cartCheckBox'
                    name={`cartItemCheck${idx}`}
                    onChange={(e) => {
                      cartSelect(e.target.checked, cartItem.id);
                    }}
                  />
                  <label htmlFor='cartCheckBox'></label>
                </div>
                <div className='cartItem__img'>
                  <img src={`https://image.tmdb.org/t/p/w500/${cartItem?.poster_path}`} alt='' />
                </div>

                <div className='cartInfo'>
                  <h1>{cartItem?.title}</h1>
                  <div className='cartAverage'>
                    <MovieAverage movieAverage={cartItem?.vote_average} key={cartItem?.id} />
                    <div className='avaerageNum'>{averageNumber(cartItem?.vote_average)}</div>
                  </div>
                  <div className='cartInfo__metaData'>
                    <div className='moviedDte'>{cartItem?.release_date}</div>
                    <div className='movieTime'>
                      •{cartItem ? cartItem?.runtime : cartItem.episode_run_time[0]}분
                      {console.log(cartItem)}
                      {/* •{cartData.map((item) => item.userSeriesState) ? cartItem.episode_run_time[0] : ''}분 */}
                    </div>
                  </div>
                  <p className='genres'>
                    장르 :
                    {cartItem?.genres.slice(0, 3).map((item: any, idx: number) => (
                      <span key={idx}>{item.name}</span>
                    ))}
                  </p>
                  <p className='language'>
                    지원 언어 :
                    {cartItem?.spoken_languages.slice(0, 5).map((language: any, idx: string) => (
                      <span key={idx}>{language.iso_639_1}</span>
                    ))}
                  </p>
                </div>

                <div className='rentalTime'>
                  <h2>대여시간</h2>
                  <div className='addRentalTime'>
                    <AiOutlineMinusCircle
                      onClick={(e) => {
                        minusDate(cartItem, -1);
                      }}
                    />
                    <p>{cartItem.userMovieState?.count}일</p>
                    <AiOutlinePlusCircle
                      onClick={(e) => {
                        plusDate(cartItem, +1);
                      }}
                    />
                  </div>
                  <div className='retalDate'>
                    <p>
                      <span>시작일 : </span>
                      {nowDateFn(0)}
                    </p>
                    <p>
                      <span>종료일 : </span>
                      {cartItem.userMovieState?.endDate}
                    </p>
                  </div>
                </div>

                <div className='rentalPrice'>
                  <h2>대여 금액</h2>
                  <div>
                    <p>{cartItem?.userMovieState?.count}</p>
                    <span>{cartItem.userMovieState?.count > 0 ? ',000' : ''}</span>
                    <span>원</span>
                  </div>
                </div>
                <div
                  className='listClose'
                  onClick={(e) => {
                    removeCart(cartItem.id);
                  }}
                >
                  <AiOutlineClose />
                </div>
              </li>
            ))}
          <div className='totalPrice'>
            <div>
              <div className='selectAllMovieWrap'>
                <h2>총 선택 영화</h2>
                <div>
                  <p>{cartCheckList.length}</p>
                  <span>편</span>
                </div>
              </div>
              <div>
                <FaPlus />
              </div>
              <div className='selectAllTimeWrap'>
                <h2>총 대여 시간</h2>
                <div>
                  <p>{cartCheckList.reduce((acc, item) => acc + item.userMovieState?.count, 0)}</p>
                  <span>일</span>
                </div>
              </div>
              <div>
                <FaEquals />
              </div>
              <div className='selectAllPriceWrap'>
                <h2>총 결제 금액</h2>
                <div>
                  <p>{cartCheckList.reduce((acc, item) => acc + item.userMovieState?.count, 0)}</p>
                  <p>
                    {cartCheckList.reduce((acc, item) => acc + item.userMovieState?.count, 0) > 0
                      ? ',000'
                      : ''}
                  </p>
                  <span>원</span>
                </div>
              </div>
              <div className='cart-payment-button'>
                <button onClick={openPayment}>결제하기</button>
                {paymentAlert && (
                  <PaymentWindow closeModal={closeModal} paymentData={cartCheckList} />
                )}
              </div>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Cart;
