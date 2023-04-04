import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/ui/MenuBar';
import './style.scss';
import { BiDownArrow, BiRightArrow } from 'react-icons/bi';
import { auth, database, setOrderList } from '../../api/firebase';
import { movieDetailType } from '../../types/movieType';
import { onAuthStateChanged } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { seriesDetailType } from '../../types/seriesType';

const OrderList = () => {
  const [onRental, setOnRental] = useState(true);
  const [onExpiry, setOnExpiry] = useState(true);
  const [rentalData, setRentalData] = useState<movieDetailType[]>();
  const [expiryData, setExpiryData] = useState<movieDetailType[]>();

  interface Data {
    userMovieState?: { cartState: boolean };
    userSeriesState?: { cartState: boolean };
  }

  const showRental = () => {
    console.log(onRental);
    setOnRental(!onRental);
  };

  const showExpiry = () => {
    setOnExpiry(!onExpiry);
  };

  useEffect(() => {
    const todayTime = new Date().toISOString().slice(0, 10);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const orderData = ref(database, `admins/${user.uid}`);
        get(orderData).then((snapshot) => {
          if (snapshot.exists()) {
            const data = Object.values<movieDetailType | seriesDetailType>(snapshot.val());
            // const filterData = data.filter((item) => item.userMovieState.ordered === true);

            const expiryArray: movieDetailType[] | seriesDetailType[] = [];
            const rentalArray: movieDetailType[] | seriesDetailType[] = [];
            // const seriesExpiryArray: seriesDetailType[] = [];
            // const seriesRentalArray: seriesDetailType[] = [];

            const filterData = data.filter(
              (el: Data) => el.userMovieState?.cartState || el.userSeriesState?.cartState
            );

            console.log(filterData);

            // data.filter((item) => {
            //   if (item.userMovieState?.endDate < todayTime || item.userSeriesState?.endDate < todayTime) {
            //     expiryArray.push(item);
            //     setExpiryData(expiryArray);
            //   } else if (item.userMovieState.endDate >= todayTime) {
            //     movieRentalArray.push(item);
            //     setRentalData(movieRentalArray);
            //   }
            // });
          }
        });
      }
    });
  }, []);
  return (
    <>
      <MenuBar />
      <div className='orderList'>
        <div className='orderList__rentalListWrap'>
          <div>
            <h1>대여중인 목록</h1>
            {onRental ? (
              <BiDownArrow onClick={showRental} />
            ) : (
              <BiRightArrow onClick={showRental} />
            )}
          </div>
          <ul className='onRentalList'>
            {onRental &&
              rentalData?.map((item, idx) => (
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
                      {item.userMovieState.count}
                      <span>,000</span>
                      <span>원</span>
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
              <BiDownArrow onClick={showExpiry} />
            ) : (
              <BiRightArrow onClick={showExpiry} />
            )}
          </div>
          <ul className='outRentalList'>
            {onExpiry &&
              expiryData?.map((item, idx) => (
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
