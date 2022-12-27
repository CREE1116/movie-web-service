import React from "react";
import Movie from "../components/Movie";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import useNetwork from "../userNetwork";
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [onLine, setOnLine] = useState(true);
  const getMovices = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovices();
  }, []);
  const handleNetworkChange = (online) => {
    setOnLine(online);
  };
  useNetwork(handleNetworkChange);
  return (
    <div className={styles.container}>
      {loading ? (
        onLine ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <h1>OffLine</h1>
        )
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;