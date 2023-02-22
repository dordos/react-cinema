import React from 'react';
import './style.scss';
import { BsStar, BsStarFill } from 'react-icons/bs';
// import { IoChevronBackOut, IoChevronForward } from 'react-icons/io';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Reviews = () => {
  // const [starAverage, setStarAverage] = useState([
  // ]);

  return (
    <div className='reviews'>
      <div className='addReviews'>
        <div className='moviePoint'>
          <p>별점을 선택해주세요.</p>
          <div className='grade'>
            <BsStar size='20' color='#888888' />
            <BsStar size='20' color='#888888' />
            <BsStar size='20' color='#888888' />
            <BsStar size='20' color='#888888' />
            <BsStar size='20' color='#888888' />
          </div>
        </div>
        <div className='addReviewBox'>
          <textarea placeholder='감상평을 등록해주세요.' />
          <button>등록하기</button>
        </div>
      </div>
      <div className='reviewsList'>
        <ul>
          <li>
            <div className='reviewsListNumber'>1</div>
            <div className='reiviewsListContent'>
              <div className='movieListPoint'>
                <div className='grade'>
                  <BsStarFill size='14' color='#e22232' />
                  <BsStarFill size='14' color='#e22232' />
                  <BsStarFill size='14' color='#e22232' />
                  <BsStarFill size='14' color='#e22232' />
                  <BsStar size='14' color='#888888' />
                </div>
                <div className='reviewScore'>5</div>
              </div>

              <p className='reviewText onClickReview '>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eum
                laudantium optio vero voluptatum quisquam saepe architecto illum harum porro,
                mollitia
              </p>
              <div>
                <span className='reviewNickname'>test@test.com</span>
                <span className='reviewDate'>2022.02.22 08:02</span>
              </div>
            </div>
          </li>
          <li>
            <div className='reviewsListNumber'>2</div>
            <div className='reiviewsListContent'>
              <div className='movieListPoint'>
                <div className='grade'>
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                </div>
                <div className='reviewScore'>5</div>
              </div>

              <p className='reviewText'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eum
                laudantium optio vero voluptatum quisquam saepe architecto illum harum porro,
                mollitia
              </p>
              <div>
                <span className='reviewNickname'>test@test.com</span>
                <span className='reviewDate'>2022.02.22 08:02</span>
              </div>
            </div>
          </li>
          <li>
            <div className='reviewsListNumber'>3</div>
            <div className='reiviewsListContent'>
              <div className='movieListPoint'>
                <div className='grade'>
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                </div>
                <div className='reviewScore'>5</div>
              </div>
              <p className='reviewText'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eum
                laudantium optio vero voluptatum quisquam saepe architecto illum harum porro,
              </p>
              <div>
                <span className='reviewNickname'>test@test.com</span>
                <span className='reviewDate'>2022.02.22 08:02</span>
              </div>
            </div>
          </li>
          <li>
            <div className='reviewsListNumber'>4</div>
            <div className='reiviewsListContent'>
              <div className='movieListPoint'>
                <div className='grade'>
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                </div>
                <div className='reviewScore'>5</div>
              </div>
              <p className='reviewText'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eum
                laudantium optio vero voluptatum quisquam saepe architecto illum harum porro,
              </p>
              <div>
                <span className='reviewNickname'>test@test.com</span>
                <span className='reviewDate'>2022.02.22 08:02</span>
              </div>
            </div>
          </li>
          <li>
            <div className='reviewsListNumber'>5</div>
            <div className='reiviewsListContent'>
              <div className='movieListPoint'>
                <div className='grade'>
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                  <BsStar size='14' color='#888888' />
                </div>
                <div className='reviewScore'>5</div>
              </div>
              <p className='reviewText'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eum
                laudantium optio vero voluptatum quisquam saepe architecto illum harum porro,
              </p>
              <div>
                <span className='reviewNickname'>test@test.com</span>
                <span className='reviewDate'>2022.02.22 08:02</span>
              </div>
            </div>
          </li>
        </ul>
        <ul className='listCount'>
          <IoIosArrowBack size='18' />
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <IoIosArrowForward size='18' />
        </ul>
      </div>
    </div>
  );
};

export default Reviews;
