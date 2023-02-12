import React from 'react';
import './style.scss';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

const Reviews = () => {
  return (
    <div className='reviews'>
      <div className='addReviews'>
        <div className='moviePoint'>
          <p>별점을 입력해 주세요.</p>
          <div>
            <button>-</button>
            <span>0</span>
            <button>+</button>
          </div>
        </div>
        <div className='addReviewBox'>
          <textarea placeholder='감상평을 등록해주세요.' />
          <button>등록</button>
        </div>
        <div>
          <div className='socialReview'>
            <div>
              <BsStar />
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis maiores non quas
                incidunt? Dolorum, quisquam, perspiciatis esse tempora saepe et minus rerum non,
                doloremque officiis ipsum illum nobis sapiente placeat!
              </p>
            </div>
            <div>2022.02.02</div>
          </div>
        </div>
      </div>
      <div className='reviewsList'>
        <div>
          <p>ddd</p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
