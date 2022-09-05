import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
  const [data, setData] = useState("");
  const list = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (e) {}
  };

  useEffect(() => {
    list();
  }, []);

  // const [aa, setaa] = useState("");
  // const moviesData = axios.get().then((response) => {
  //   setaa(response.data.results[0].original_title);
  // });

  return <div>{data}</div>;
}

export default App;
