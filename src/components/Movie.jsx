import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Movie(props) {
  const movie = props.movie;
  return (
    <div key={movie.id} className={styles.movie}>
      <LazyLoadImage
        src={movie.medium_cover_image}
        alt={movie.title}
        className={styles.movie__img}
        effect="blur"
      />
      <div>
        <h2 className={styles.movie__title}>
          <Link to={`movie-web-service/Movie/${movie.id}`}>{movie.title}</Link>
        </h2>
        <h3 className={styles.movie__year}>{movie.year}</h3>
        <p>
          {movie.summary.length > 235
            ? `${movie.summary.slice(0, 235)}...`
            : movie.summary}
        </p>
      </div>
      <ul className={styles.movie__genres}>
        {movie.genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
      <ul className={styles.movie__genres}>
        {movie.torrents.map((torrent, index) => (
          <li key={index}>
            <a href={torrent.url}>torrent Download: {index}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default Movie;
