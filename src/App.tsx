import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Posts from "./components/Posts";

// type User = {
//   id: number;
//   name: string;
// };

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
function App() {
  const [posts, setPosts] = useState([]);
  // const [users, setUsers] = useState<User[] | undefined>(undefined);
  // const [test, setTest] = useState("");
  // const a = axios
  //   .get(API_URL)
  //   .then((response) => {
  //     response.data.results.map((item: any) => {
  //       console.log("-> item.release_date", item.release_date);
  //       setTest(item.release_date);
  //     });
  //     // setTest(response.data.results);
  //   })
  //   .catch((error) => {
  //     console.log("-> error", error);
  //   });

  useEffect(() => {
    const movieData = async () => {
      const response = await axios.get(API_URL);
      // response.data.results.map((item: any) => {
      //   setPosts(item);
      // });
      setPosts(response.data.results);
    };
    movieData();
  }, []);

  return (
    <ul>
      <Posts posts={posts} />
    </ul>
  );
}

export default App;
