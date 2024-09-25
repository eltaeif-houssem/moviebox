import { IMovieTrailer } from "@/interfaces/movie.interface";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

interface Props {
  trailer: IMovieTrailer | null;
  onClose: () => void;
}

const trailerListItem: YouTubeProps["opts"] = {
  width: "550",
  height: "450",
  playerVars: {
    autoplay: 0,
  },
};

const TrailerModal: React.FC<Props> = (props) => {
  const { trailer, onClose } = props;
  return (
    <div className="trailer-modal">
      <div className="overlay" onClick={onClose} />
      <div className="content">
        <i className="fa-solid fa-xmark" onClick={onClose} />
        <h1>{trailer?.name}</h1>
        <YouTube videoId={`${trailer?.key}`} opts={trailerListItem} />
      </div>
    </div>
  );
};

export default TrailerModal;
