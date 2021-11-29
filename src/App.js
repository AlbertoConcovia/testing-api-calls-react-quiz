import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // add styling later
  // strip out excess boiler plate .
  // consider waiting for your data to load (Hint: async and await)
  // Remember to commit
  // Add a read me explaining how to run your app when it’s done!
  // Remember to check the documentation regularly

  // App component but you are more than welcome to create another component if you like!
  // Once your App is calling the Studio Ghibli API and displaying the first film title on your page ('Castle in the Sky'),
  // add a test to mock (or “stub”) the API response.
  // check the first film title has been rendered correctly (Hint: 'Castle in the Sky' should be in the document).

  const [films, setFilms] = useState([]);
  //display the title of the first film  ('Castle in the Sky').
  const getFilms = async () => {
    const apiResponse = await axios.get(
      `https://ghibliapi.herokuapp.com/films/`
    );
    setFilms(apiResponse.data.data);
  };

  useEffect(() => {
    console.log(`useEffect here`);
  }, [films]);

  return (
    <div>
      <header>
        <p>Films from Studio Ghibli API</p>
      </header>
    </div>
  );
}

export default App;
