import React, { Dispatch, useEffect, useState } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons';
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
        <li className='menuBar__Icon' onMouseOut={offMouseOut}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <FontAwesomeIcon icon={faBell} />
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
