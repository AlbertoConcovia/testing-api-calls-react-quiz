import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // add styling later
  // consider waiting for your data to load (Hint: async and await)
  // Add a read me explaining how to run your app when it’s done!

  // App - welcome to create another component if you like!
  // Once your App is calling the Studio Ghibli API and displaying the first film title on your page ('Castle in the Sky'),
  // add a test to mock (or “stub”) the API response.
  // check the first film title has been rendered correctly (Hint: 'Castle in the Sky' should be in the document).

  const [films, setFilms] = useState([]);
  const [firstFilm, setFirstFilm] = useState({});
  //display the title of the first film  ('Castle in the Sky').
  const getFilms = async () => {
    const apiResponse = await axios.get(
      `https://ghibliapi.herokuapp.com/films/`
    );
    setFilms(apiResponse.data);
  };

  useEffect(() => {
    if (films.length === 0 ) {
      getFilms();
    }
    setFirstFilm(films[0]);
  }, [films]);

  return (
    <div>

      <header>
        <p>Films from Studio Ghibli API</p>
      </header>

      <div>
          <h2>{firstFilm?.title}</h2>
{/* 
          "title": "Castle in the Sky",
          "image": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg", 
// */}
{/*      <img
             className="character-item__img"
             src={imageSrc}
             alt={character.name}
           /> */}

      </div>
    </div>
  );
}

export default App;
