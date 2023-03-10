import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import useNetwork from "../userNetwork";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Detail() {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const getDetail = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();

    setDetail(json.data.movie);
    setLoading(false);
    console.log(json.data.movie);
  };
  useEffect(() => {
    getDetail();
  }, []);
  const handleNetworkChange = (online) => {
    console.log(online ? "We just went online" : "We are offline");
  };
  const onLine = useNetwork(handleNetworkChange);
  return (
    <div>
      {loading ? (
        onLine ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <div className={styles.loader}>
            <span>offline</span>
          </div>
        )
      ) : (
        <>
          <h1 className={styles.movie__title}>{detail.title_long}</h1>
          <h3 className={styles.movie__data}>
            Year: {detail.year}, Runtime: {detail.runtime}, rating:
            {detail.rating}, like:{detail.like_count}, Download:{" "}
            {detail.download_count}
          </h3>
          <ul className={styles.movie__genres}>
            {detail.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
          <ul className={styles.movie__genres}>
            {detail.torrents.map((torrent, index) => (
              <li key={index}>
                <a href={torrent.url}>torrent Download: {index}</a>
              </li>
            ))}
          </ul>
          <div className={styles.container}>
            <div className={styles.movie__imgBox}>
              <LazyLoadImage
                src={detail.large_cover_image}
                alt={detail.title}
                effect="blur"
                className={styles.movie__img}
              />
            </div>
            <div className={styles.movie__description}>
              <p>{detail.description_full}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;
