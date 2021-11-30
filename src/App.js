import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FilmContainer from "./components/FilmContainer";

function App() {
  // add styling later
  // Add a read me - how to run your app

  const [films, setFilms] = useState([]);
  const [firstFilm, setFirstFilm] = useState({});
  
  const getFilms = async () => {
    const apiResponse = await axios.get(
      `https://ghibliapi.herokuapp.com/films/`
    );
    setFilms(apiResponse.data);
  };

  useEffect(() => {
  if (films.length === 0) {
      getFilms();
    }
    setFirstFilm(films[0]);
  }, [films]);

  return (
    <div>
      <header>
        <p>Films from Studio Ghibli API</p>
      </header>
      <FilmContainer firstFilm={firstFilm} />
    </div>
  );
}

export default App;
