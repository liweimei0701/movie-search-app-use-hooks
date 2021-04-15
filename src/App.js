import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movies";
import Search from "./components/Search";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const getMovies = async (searchValue) => {
    const res = await axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=4b954c0f`);
    // console.log(res);
    if (res.data.Response === "True") {
      setMovies(res.data.Search);
      setLoading(false);
    } else {
      setErrorMessage('sorry can not find it');
      setLoading(false);
    }
  }

  useEffect(() => getMovies('world'),[])

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    getMovies(searchValue)

  	};
 
    return (
     <div className="Movie-App">
      <Header text="SEARCH YOUR FAVOURITE MOVIES" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};


export default App;