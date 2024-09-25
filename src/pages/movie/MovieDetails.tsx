import Layout from "@/components/layout";
import { appContext } from "@/context";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "@styles/pages/movie/movieDetails.css";
import movieService from "@/services/movie.service";
import { IMovieDetails, IMovieTrailerList } from "@/interfaces/movie.interface";
import { TMDB_V3_IMAGE_API } from "@constants/apiUrls.constant";
import imdbLogo from "@assets/imdb.png";
import tomatoLogo from "@assets/tomato.png";

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
        <div className="movie-content">
          <div className="top">
            <h1>{movie?.title || movie?.original_title}</h1>
            <h4>{movie?.tagline}</h4>
            <div>
              <div>
                <img src={imdbLogo} alt="imdb_logo" />
                <p>{movie?.vote_average.toFixed(2)}/10</p>
              </div>

              <div>
                <img src={tomatoLogo} alt="tomato_logo" />
                <p>{movie?.vote_count}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetails;
