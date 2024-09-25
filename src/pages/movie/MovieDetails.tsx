import Layout from "@/components/layout";
import { appContext } from "@/context";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "@styles/pages/movie/movieDetails.css";
import movieService from "@/services/movie.service";
import { IMovieDetails, IMovieTrailerList } from "@/interfaces/movie.interface";
import { TMDB_V3_IMAGE_API } from "@constants/apiUrls.constant";

const MovieDetails: React.FC = () => {
  const context = appContext();
  const [movie, setMovie] = useState<IMovieDetails>();
  const [trailers, setTrailers] = useState<IMovieTrailerList>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const movieDetails = await movieService.fetchMovieDetails(Number(id));
      const movieTrailers = await movieService.fetchMovieTrailers(Number(id));
      setMovie(movieDetails);
      setTrailers(movieTrailers);
    };

    fetchData();
  }, []);
  return (
    <Layout dark={true}>
      <div className="movie-details-page">
        <div
          className="movie-cover"
          style={{
            backgroundImage: `url(${TMDB_V3_IMAGE_API}/${movie?.backdrop_path})`,
          }}
        >
          <img src={`${TMDB_V3_IMAGE_API}/${movie?.poster_path}`} alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetails;
