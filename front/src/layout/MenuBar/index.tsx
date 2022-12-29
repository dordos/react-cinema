import React, { useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";
import LogInModal from "../../components/LogInModal";

const movie_icon = require("../../img/movie_Icon.png");
const smile_icon1 = require("../../img/smile_icon1.png");
// const smile_icon2 = require("../../img/smile_icon2.png");

const MenuBar = () => {
  const [modalOnOff, setModalOnOff] = useState(false);

  const onMouseOver = () => setModalOnOff(true);
  const offMouseOut = () => setModalOnOff(false);

  return (
    <nav className='menuBarContainer'>
      <ul>
        <li className='menuBar__logo'>
          <img src={movie_icon} alt='' />
          <p>React Cinema</p>
          <div className='menuBar__Lists'>
            <p>홈</p>
            <p>시리즈</p>
            <p>영화</p>
            <p>NEW! 요즘 대세 콘텐츠</p>
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
            {modalOnOff && <LogInModal />}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;
