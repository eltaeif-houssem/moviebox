import React from "react";
import "@styles/pages/home/backdropTrailer.css";
import { IMovieItem } from "@interfaces/movie.interface";

interface Props {
  movie: IMovieItem;
  onClose: () => void;
}

const BackdropTrailer: React.FC<Props> = (props) => {
  const { movie, onClose } = props;
  return (
    <div className="backdrop-trailer">
      <div className="backdrop-trailer-overlay" />
      <div className="backdrop-trailer-content">
        <i className="fa-solid fa-xmark" onClick={onClose} />
      </div>
    </div>
  );
};

export default BackdropTrailer;
