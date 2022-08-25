import React from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const test =  axios.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
  )
console.log("-> test", test);
  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
