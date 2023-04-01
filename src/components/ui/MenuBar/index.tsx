import React, { Dispatch, useEffect, useState } from 'react';
import './style.scss';
import { BiSearchAlt2 } from 'react-icons/bi';
import LogInModal from '../LogInModal';
import { Link } from 'react-router-dom';
import LogOutModal from '../LogOutModal';
import { onUserStateChange } from '../../../api/firebase';

const logo = require('../../../img/logo.png');
const smile_icon1 = require('../../../img/smile_icon1.png');
// const smile_icon2 = require("../../img/smile_icon2.png");

const MenuBar = () => {
  const [modalOnOff, setModalOnOff] = useState(false);
  const [user, setUser] = useState();
  const onMouseOver = () => setModalOnOff(true);
  const offMouseOut = () => setModalOnOff(false);

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <nav className='menuBarContainer'>
      <ul>
        <li className='menuBar__logo'>
          <Link to='/'>
            <img src={logo} alt='' />
          </Link>
          <div className='menuBar__Lists'>
            <Link to='/'>
              <p>영화</p>
            </Link>
            <Link to='/series'>
              <p>시리즈</p>
            </Link>
          </div>
        </li>
        <li className='search'>
          <BiSearchAlt2 />
          <input type='text' placeholder='찾고싶은 영화를 입력해주세요.' />
        </li>
        <li className='menuBar__Icon' onMouseOut={offMouseOut}>
          <div
            onMouseOver={() => {
              onMouseOver();
            }}
          >
            <img src={smile_icon1} alt='' />
            {modalOnOff && !user && <LogInModal userState={setUser} />}
            {modalOnOff && user && <LogOutModal userState={setUser} />}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;
