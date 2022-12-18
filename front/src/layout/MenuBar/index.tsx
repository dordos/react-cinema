import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";

const movie_icon = require("../../img/movie_Icon.png");
const smile_icon1 = require("../../img/smile_icon1.png");
// const smile_icon2 = require("../../img/smile_icon2.png");

const MenuBar = () => {
  return (
    <nav className="menuBarContainer">
      <ul>
        <li className="menuBar__logo">
          <img src={movie_icon} alt="" />
          <p>React Cinema</p>
          <div className="menuBar__Lists">
            <p>Home</p>
            <p>series</p>
            <p>Movie</p>
            <p>Contents</p>
            <p>Recommendation</p>
          </div>
        </li>

        <li className="menuBar__Icon">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <FontAwesomeIcon icon={faBell} />
          <img src={smile_icon1} alt="" />
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;
