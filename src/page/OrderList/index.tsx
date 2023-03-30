import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/ui/MenuBar';
import './style.scss';
import { BiDownArrow, BiRightArrow } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import { setOrderList } from '../../api/firebase';
import { movieDetailType } from '../../types/movieType';

const OrderList = () => {
  let {
    state: { paymentData },
  } = useLocation();

  const [onRental, setOnRental] = useState(true);
  const [onExpiry, setOnExpiry] = useState(true);
  const [rentalData, setRentalData] = useState<movieDetailType[] | undefined>([]);
  const [expiryData, setExpiryData] = useState<movieDetailType[] | undefined>([]);

  const showRental = () => {
    setOnRental(!onRental);
  };

  const showExpiry = () => {
    setOnExpiry(!onExpiry);
  };

  useEffect(() => {
    const movieId = paymentData.map((el: any) => el.id);
    // console.log(movieId);
    setOrderList(paymentData);
    const today = new Date().toISOString().slice(0, 10);
    // paymentData.map((item: any) => {
    //   if (item.userMovieState.endDate < today) {
    //     setRentalData((item) => [item]);
    //   } else {
    //     console.log(item);
    //     setExpiryData((item) => [item]);
    //   }
    // });
    paymentData?.map((item: any) => {
      setRentalData([item.userMovieState.endDate]);
    });
  }, []);
  console.log(rentalData);

  return (
    <>
      <MenuBar />
      <div className='orderList'>
        <div className='orderList__rentalListWrap'>
          <div>
            <h1>대여중인 목록</h1>
            {onRental ? (
              <BiRightArrow onClick={showRental} />
            ) : (
              <BiDownArrow onClick={showRental} />
            )}
          </div>
          <ul className='onRentalList'>
            {rentalData?.map((item, idx) => (
              <li key={idx}>
                <div className='orderList__rentalInfoWrap'>
                  <div className='orderLIst__imgBox'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt='' />
                  </div>
                  <div className='orderList__rentalInfo'>
                    <h2>{item?.title}</h2>
                    <div>
                      <p>
                        대여 날짜 : <span>{item.userMovieState.startDate}</span>
                      </p>
                      <p>
                        만료 날짜 : <span>{item.userMovieState.endDate}</span>
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
            ))}
          </ul>
        </div>
        <div className='orderList__rentalListWrap'>
          <div>
            <h1>대여만료 목록</h1>
            {onExpiry ? (
              <BiRightArrow onClick={showExpiry} />
            ) : (
              <BiDownArrow onClick={showExpiry} />
            )}
          </div>
          <ul className='outRentalList'>
            {expiryData?.map((item) => (
              <li>
                <div className='orderList__rentalInfoWrap'>
                  <div className='orderLIst__imgBox'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt='' />
                  </div>
                  <div className='orderList__rentalInfo'>
                    <h2>{item?.title}</h2>
                    <div>
                      <p>
                        대여 날짜 : <span>{item.userMovieState.startDate}</span>
                      </p>
                      <p>
                        만료 날짜 : <span>{item.userMovieState.endDate}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='orderList__rentalExpire'>
                  <h2>만료</h2>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderList;
