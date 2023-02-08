import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import cart from '../../img/cart.svg';
import heart from '../../img/heart.svg';
import clapperboard from '../../img/clapperboard.svg';

const LogOutModal = ({ userState }: any) => {
  return (
    <div className='logOutModal'>
      <div className='logOutContainer'>
        <ul>
          <li>
            <img src={heart} />
            <p>찜 목록</p>
          </li>
          <li>
            <img src={cart} />
            <p>장바구니</p>
          </li>
          <li>
            <img src={clapperboard} />
            <p>대여목록</p>
          </li>
        </ul>
        <button
          onClick={() => {
            userState(true);
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
