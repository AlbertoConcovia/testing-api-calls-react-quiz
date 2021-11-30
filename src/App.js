import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FilmContainer from "./components/FilmContainer";

function App() {


  // add styling later
  
  // Add a read me - how to run your app




  const [films, setFilms] = useState([]);
  const [firstFilm, setFirstFilm] = useState({});
  const [errorMessage, setErroMessage] = useState(null);


  const getFilms = async () => {
    try {
      const apiResponse = await axios.get(
        `https://ghibliapi.herokuapp.com/films/`
      );
      setFilms(apiResponse.data);
      setErroMessage(null);
    } catch (error) {
      if (error.response.status === 500) {
        setErroMessage(`Oops… something went wrong, try again`);
      } else {
        setErroMessage(error.message);
      }
    }
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
      <p>{errorMessage}</p>
    </div>
  );
}

export default App;
