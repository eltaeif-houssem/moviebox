import React, { useEffect, useState } from "react";
import Youtube, { YouTubeProps } from "react-youtube";
import {
  IMovieItem,
  IMovieTrailer,
  IMovieTrailerList,
} from "@interfaces/movie.interface";
import movieService from "@services/movie.service";
import InfiniteSpinner from "@components/spinners/InfiniteSpinner";
import "@styles/pages/home/backdropTrailer.css";

interface Props {
  movie: IMovieItem;
  onClose: () => void;
}

const trailerListItem: YouTubeProps["opts"] = {
  width: "550",
  height: "450",
  playerVars: {
    autoplay: 0,
  },
};

const BackdropTrailer: React.FC<Props> = (props) => {
  const { movie, onClose } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [trailers, setTrailers] = useState<IMovieTrailerList>();
  const [trailer, setTrailer] = useState<IMovieTrailer>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await movieService.fetchMovieTrailers(movie.id);
      const selectedTrailer = response.results.find(
        (data) => data.type === "Trailer"
      );
      setTrailer(selectedTrailer);
      setTrailers(response);
      setLoading(true);
    };

    fetchData();
  }, []);
  return (
    <div className="backdrop-trailer">
      <div className="backdrop-trailer-overlay" onClick={onClose} />
      <div className="backdrop-trailer-content">
        {loading ? (
          <>
            <i className="fa-solid fa-xmark" onClick={onClose} />
            <div className="backdrop-trailer-content-left">
              <h3>Movie trailers</h3>
              {trailers?.results.map((item, key) => (
                <div
                  className={`movie-trailer-list-item ${
                    item.id === trailer?.id && "active"
                  }`}
                  key={key}
                  onClick={() => setTrailer(item)}
                >
                  <h4>{item.name}</h4>
                  <img
                    src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
                  />
                  <p>
                    Publish date:{" "}
                    {new Date(`${item.published_at}`)
                      .toLocaleDateString()
                      .replace("/", "-")
                      .replace("/", "-")}
                  </p>
                  <p>Language: {item.iso_639_1}</p>
                </div>
              ))}
            </div>
            <div className="backdrop-trailer-content-right">
              <h1>{movie.original_title || movie.title}</h1>
              <Youtube videoId={`${trailer?.key}`} opts={trailerListItem} />
            </div>
          </>
        ) : (
          <InfiniteSpinner />
        )}
      </div>
    </div>
  );
};

export default BackdropTrailer;
