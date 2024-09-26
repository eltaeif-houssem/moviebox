import Layout from "@/components/layout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@styles/pages/movie/movieDetails.css";
import movieService from "@/services/movie.service";
import {
  IMovieCredits,
  IMovieDetails,
  IMovieTrailer,
  IMovieTrailerList,
} from "@/interfaces/movie.interface";
import { TMDB_V3_IMAGE_API } from "@constants/apiUrls.constant";
import imdbLogo from "@assets/imdb.png";
import tomatoLogo from "@assets/tomato.png";
import coinLogo from "@assets/coin.png";
import { formatMoney } from "@/utils/string.util";
import InfiniteSpinner from "@/components/spinners/InfiniteSpinner";
import TrailerModal from "./TrailerModal";
import SimilarMovies from "@/components/rows/SimilarMovies";
import ActorsRow from "@/components/rows/ActorsRow";

const MovieDetails: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState<IMovieDetails>();
  const [trailers, setTrailers] = useState<IMovieTrailerList>();
  const [trailer, setTrailer] = useState<IMovieTrailer | null>(null);
  const [credits, setCredits] = useState<IMovieCredits>();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!loading) {
        setLoading(true);
      }
      const movieDetails = await movieService.fetchMovieDetails(Number(id));
      const movieTrailers = await movieService.fetchMovieTrailers(Number(id));
      const movieCredits = await movieService.fetchMovieCredits(Number(id));

      setCredits(movieCredits);
      setMovie(movieDetails);
      setTrailers(movieTrailers);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const closeTrailerHandler = () => {
    setTrailer(null);
  };

  if (loading) {
    return <InfiniteSpinner />;
  }

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

              <div>
                <img src={coinLogo} alt="coin_logo" width="20px" />
                <p>{formatMoney(movie?.budget!)}$</p>
              </div>
            </div>
          </div>
          <div className="bottom">
            <h2>Overview</h2>
            <p className="overview">{movie?.overview}</p>
            <h2>Production Companies</h2>
            <div className="companies">
              {movie?.production_companies
                .filter((company) => company.logo_path !== null)
                .map((company) => (
                  <img src={`${TMDB_V3_IMAGE_API}/${company.logo_path}`} />
                ))}
            </div>
            <h2>Other Infos</h2>
            <div className="infos">
              <p>
                <span>Category:</span>{" "}
                {movie?.genres.flatMap((item) => item.name).join(", ")} people
              </p>
              <p>
                <span>Production Countries:</span>{" "}
                {movie?.production_countries
                  .flatMap((item) => item.name)
                  .join(", ")}
              </p>
              <p>
                <span>Popularity:</span>{" "}
                {movie?.popularity.toString().replace(".", "")} people
              </p>
              <p>
                <span>Release Date:</span> {movie?.release_date}
              </p>
              <p>
                <span>Revenue:</span> {formatMoney(movie?.revenue!)}$
              </p>
              <p>
                <span>Budget:</span> {formatMoney(movie?.budget!)}$
              </p>
              <p>
                <span>Status:</span> {movie?.status}
              </p>
              <p>
                <span>Adult:</span> {movie?.adult ? "yes" : "no"}
              </p>
            </div>
            <h2>Trailers</h2>
            <div className="trailers">
              {trailers?.results.map((item) => (
                <div
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${item.key}/hqdefault.jpg)`,
                  }}
                  onClick={() => setTrailer(item)}
                >
                  <i className="fa-solid fa-play" />
                </div>
              ))}
            </div>
            <div style={{ zIndex: 99999 }}>
              <ActorsRow credits={credits!} />
            </div>
            <div style={{ zIndex: 99999 }}>
              <SimilarMovies movieId={movie?.id!} />
            </div>
          </div>
        </div>
        {trailer && (
          <TrailerModal trailer={trailer} onClose={closeTrailerHandler} />
        )}
      </div>
    </Layout>
  );
};

export default MovieDetails;
