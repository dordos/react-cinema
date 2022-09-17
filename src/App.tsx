import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// type User = {
//   id: number;
//   name: string;
// };

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

function App() {
  // const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [test, setTest] = useState("");
  const a = axios
    .get(API_URL)
    .then((response) => {
      console.log("-> response", response);
    })
    .catch((error) => {
      console.log("-> error", error);
    });

  useEffect(() => {
    // list();
  }, []);

  return (
    <div>
      <p>{test}</p>
    </div>
  );
}

export default App;
