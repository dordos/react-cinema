import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Movies from "./page/Movies";
import MenuBar from "./layout/MenuBar";
import { BrowserRouter, Routes } from "react-router-dom";

// type User = {
//   id: number;
//   name: string;
// };
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
function App() {
  const [movieInfo, setMovieInfo] = useState([]);

  useEffect(() => {
    const movieData = async () => {
      const response = await axios.get(API_URL);
      setMovieInfo(response.data.results);
    };
    movieData();
  }, []);

  return (
    <BrowserRouter>
      <MenuBar />
      {/*<Routes>*/}
      <Movies movieInfo={movieInfo} />
      {/*</Routes>*/}
    </BrowserRouter>
  );
}

export default App;
