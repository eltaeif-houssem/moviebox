import Layout from "@/components/layout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@styles/pages/movie/movieDetails.css";
import { TMDB_V3_IMAGE_API } from "@constants/apiUrls.constant";
import imdbLogo from "@assets/imdb.png";
import tomatoLogo from "@assets/tomato.png";
import InfiniteSpinner from "@/components/spinners/InfiniteSpinner";
import TrailerModal from "./TrailerModal";
import SimilarMovies from "@/components/rows/SimilarMovies";
import ActorsRow from "@/components/rows/ActorsRow";
import tvService from "@/services/tv.service";
import {
  ITvCredits,
  ITvDetails,
  ITvTrailer,
  ITvTrailerList,
} from "@/interfaces/tv.interface";

const TvDetails: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tv, setTv] = useState<ITvDetails>();
  const [trailers, setTrailers] = useState<ITvTrailerList>();
  const [trailer, setTrailer] = useState<ITvTrailer | null>(null);
  const [credits, setCredits] = useState<ITvCredits>();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!loading) {
        setLoading(true);
      }

      const tvDetails = await tvService.fetchTvDetails(Number(id));
      const tvTrailers = await tvService.fetchTvTrailers(Number(id));
      const tvCredits = await tvService.fetchTvCredits(Number(id));

      setCredits(tvCredits);
      setTv(tvDetails);
      setTrailers(tvTrailers);
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
            backgroundImage: `url(${TMDB_V3_IMAGE_API}/${tv?.backdrop_path})`,
          }}
        >
          <img src={`${TMDB_V3_IMAGE_API}/${tv?.poster_path}`} alt="" />
        </div>
        <div className="movie-content">
          <div className="top">
            <h1>{tv?.name || tv?.original_name}</h1>
            <h4>{tv?.tagline}</h4>
            <div>
              <div>
                <img src={imdbLogo} alt="imdb_logo" />
                <p>{tv?.vote_average.toFixed(2)}/10</p>
              </div>

              <div>
                <img src={tomatoLogo} alt="tomato_logo" />
                <p>{tv?.vote_count}</p>
              </div>
            </div>
          </div>
          <div className="bottom">
            <h2>Overview</h2>
            <p className="overview">{tv?.overview}</p>
            <h2>Production Companies</h2>
            <div className="companies">
              {tv?.production_companies
                .filter((company) => company.logo_path !== null)
                .map((company, key) => (
                  <img
                    src={`${TMDB_V3_IMAGE_API}/${company.logo_path}`}
                    key={key}
                  />
                ))}
            </div>
            <h2>Other Infos</h2>
            <div className="infos">
              <p>
                <span>Category:</span>{" "}
                {tv?.genres.flatMap((item) => item.name).join(", ")} people
              </p>
              <p>
                <span>Production Countries:</span>{" "}
                {tv?.production_countries
                  .flatMap((item) => item.name)
                  .join(", ")}
              </p>
              <p>
                <span>Popularity:</span>{" "}
                {tv?.popularity.toString().replace(".", "")} people
              </p>
              <p>
                <span>Release Date:</span> {tv?.first_air_date}
              </p>
              <p>
                <span>Status:</span> {tv?.status}
              </p>
              <p>
                <span>Adult:</span> {tv?.adult ? "yes" : "no"}
              </p>
            </div>
            <h2>Trailers</h2>
            <div className="trailers">
              {trailers?.results.map((item, key) => (
                <div
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${item.key}/hqdefault.jpg)`,
                  }}
                  onClick={() => setTrailer(item)}
                  key={key}
                >
                  <i className="fa-solid fa-play" />
                </div>
              ))}
            </div>
            <ActorsRow credits={credits!} />
            <SimilarMovies movieId={tv?.id!} />
          </div>
        </div>
        {trailer && (
          <TrailerModal trailer={trailer} onClose={closeTrailerHandler} />
        )}
      </div>
    </Layout>
  );
};

export default TvDetails;
