import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import cart from '../../../img/cart.svg';
import heart from '../../../img/heart.svg';
import clapperboard from '../../../img/clapperboard.svg';
import { logOut } from '../../../api/firebase';

const LogOutModal = ({ userState }: any) => {
  const handleLogOut = () => {
    logOut().then(() => {
      userState(false);
    });
  };

  return (
    <div className='logOutModal'>
      <div className='logOutContainer'>
        <ul>
          <Link to='/PickList'>
            <li>
              <img src={heart} />
              <p>찜 목록</p>
            </li>
          </Link>
          <Link to='/Cart'>
            <li>
              <img src={cart} />
              <p>장바구니</p>
            </li>
          </Link>
          <Link to='/OrderList'>
            <li>
              <img src={clapperboard} />
              <p>대여목록</p>
            </li>
          </Link>
        </ul>
        <button onClick={handleLogOut}>로그아웃</button>
      </div>
    </div>
  );
};

export default LogOutModal;
