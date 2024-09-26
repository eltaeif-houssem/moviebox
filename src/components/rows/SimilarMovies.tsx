import React from "react";
import "@styles/components/rows.css";

interface Props {
  movieId: number;
}

const SimilarMovies: React.FC<Props> = ({ movieId }) => {
  return <div className="similar-movies-row">SimilarMovies</div>;
};

export default SimilarMovies;
