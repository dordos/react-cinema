import React from 'react';
import './style.scss';

const PaymentWindow = () => {
  return (
    <div className='paymentContainer'>
      <div className='paymentWrap'>
        <div className='payment__text'>
          <h2>결제하시겠습니까?</h2>
        </div>
        <div className='payment__button'>
          <button>결제</button>
          <button>취소</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentWindow;
