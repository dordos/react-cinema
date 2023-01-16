import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import cart from '../../img/cart.svg';

const LogOutModal = () => {
  return (
    <div className='logOutModal'>
      <div className='logOutContainer'>
        <ul>
          <cart />
          <li>찜 목록</li>
          <li>장바구니</li>
          <li>대여목록</li>
        </ul>
        <button>로그아웃</button>
      </div>
    </div>
  );
};

export default LogOutModal;
