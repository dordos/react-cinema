import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/ui/MenuBar';
import Movies from '../../components/ui/Movies';
import { addMovies } from '../../api/firebase';
import axios from 'axios';
import { API_URL } from '../../api/theMovieAPI';

const Home = () => {
  const [movieInfo, setMovieInfo] = useState([]);

  useEffect(() => {
    async function movieData() {
      const response = await axios.get(API_URL);
      let movieId = response.data.results.map((result: any, ...list: any[]) => result.id);
      addMovies(movieId, response.data.results);
      // console.log(response.data.results);
      // setMovieInfo(response.data.results);
    }
    movieData();
  }, []);

  return (
    <>
      <MenuBar />
      <Movies />
    </>
  );
};

export default Home;
