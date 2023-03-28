import React, { useRef } from 'react';
import './style.scss';

const PaymentWindow = ({ closeModal }: any) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtn = (e: React.MouseEvent<HTMLElement> | any) => {
    if (modalRef.current == e.target) {
      closeModal();
    } else if (e.target.textContent == '취소') {
      closeModal();
    }
  };

  return (
    <div className='paymentContainer' onClick={closeBtn} ref={modalRef}>
      <div className='paymentWrap'>
        <div className='payment__text'>
          <h2>결제하시겠습니까?</h2>
        </div>
        <div className='payment__button'>
          <button>결제</button>
          <button onClick={closeBtn}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentWindow;
