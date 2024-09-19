import React from "react";
import { IMovieItem } from "@/interfaces/movie.interface";
import { TMDB_V3_IMAGE_API } from "@constants/apiUrls.constant";
import * as stringUtil from "@utils/string.util";
import imdbLogo from "@assets/imdb.png";
import tomatoLogo from "@assets/tomato.png";

interface Props {
  movie: IMovieItem;
  onClick: (movie: IMovieItem) => void;
}

const BackdropItem: React.FC<Props> = ({ movie, onClick }) => {
  return (
    <div
      className="backdrop-item"
      style={{
        backgroundImage: `url(${TMDB_V3_IMAGE_API}${movie.backdrop_path})`,
      }}
    >
      <h1>{movie.title || movie.original_title}</h1>

      <div>
        <div>
          <img src={imdbLogo} alt="imdb" />{" "}
          <span>{movie.vote_average.toFixed(2)}/10</span>
        </div>

        <div>
          <img src={tomatoLogo} alt="tomato" /> <span>{movie.vote_count}</span>
        </div>
      </div>

      <p>{stringUtil.verifyStringLength(`${movie.overview}`)}</p>

      <button onClick={() => onClick(movie)}>
        <i className="fa-solid fa-circle-play" /> <span>Watch Trailer</span>
      </button>
    </div>
  );
};

export default BackdropItem;
