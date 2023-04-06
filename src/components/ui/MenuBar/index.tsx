import React, { useEffect, useState } from 'react';
import './style.scss';
import { BiSearchAlt2 } from 'react-icons/bi';
import LogInModal from '../LogInModal';
import { Link } from 'react-router-dom';
import LogOutModal from '../LogOutModal';
import { onUserStateChange } from '../../../api/firebase';
import { API_KEY } from '../../../api/theMovieAPI';
import axios from 'axios';
import { movieType } from '../../../types/movieType';
import SearchItems from '../../SearchItems';

const logo = require('../../../img/logo.png');
const smile_icon1 = require('../../../img/smile_icon1.png');

const MenuBar = () => {
  const [modalOnOff, setModalOnOff] = useState(false);
  const [user, setUser] = useState();
  const onMouseOver = () => setModalOnOff(true);
  const offMouseOut = () => setModalOnOff(false);

  const [searchClose, setSearchClose] = useState(false);
  const closeState = () => setSearchClose(false);

  const [query, setQuery] = useState('');
  const [searchData, setSearchData] = useState<movieType[]>([]);
  async function searchItem() {
    const search_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    const response = await axios.get(search_URL);

    const results = await response.data.results;
    const onlyGetPosterData = results.filter((el: any) => el.poster_path !== null);
    setSearchData(onlyGetPosterData);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchClose(true);
    searchItem();
  }

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <>
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
              <Link to='/Series'>
                <p>시리즈</p>
              </Link>
            </div>
          </li>
          <form onSubmit={handleSubmit}>
            <li className='search'>
              {/* <Link to='/SearchItems'> */}
              <BiSearchAlt2 />
              {/* </Link> */}
              <input
                type='text'
                placeholder='찾고싶은 영화를 입력해주세요.'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </li>
          </form>
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
      {searchClose && searchData.length > 0 ? (
        <SearchItems searchData={searchData} closeState={closeState} />
      ) : (
        ''
      )}
    </>
  );
};

export default MenuBar;
