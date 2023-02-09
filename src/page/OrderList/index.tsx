import React from 'react';
import MenuBar from '../../components/MenuBar';
import './style.scss';

const OrderList = () => {
  return (
    <>
      <MenuBar />
      <div className='orderList'>
        <div>대여 중인 목록</div>
        <div>만료된 대여 목록</div>
      </div>
    </>
  );
};

export default OrderList;
