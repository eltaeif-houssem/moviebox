import React, { useEffect, useState } from "react";
import Layout from "@components/layout";
import Backdrop from "./Backdrop";
import "@styles/pages/home/home.css";
import Footer from "@components/footers/Footer";
import MovieRow from "@components/rows/MovieRow";
import { IMovieGenres } from "@interfaces/movie.interface";
import movieService from "@services/movie.service";
import { ITvGenres } from "@/interfaces/tv.interface";
import tvService from "@/services/tv.service";
import TvRow from "@/components/rows/TvRow";

const index: React.FC = () => {
  const [movieGenres, setMovieGenres] = useState<IMovieGenres>();
  const [tvGenres, setTvGenres] = useState<ITvGenres>();

  useEffect(() => {
    const fetchData = async () => {
      const movieGenres = await movieService.fetchMovieGenres();
      const tvGenres = await tvService.fetchTvGenres();
      setMovieGenres(movieGenres);
      setTvGenres(tvGenres);
    };

    fetchData();
  }, []);
  return (
    <Layout>
      <div className="home-page">
        <Backdrop />
        <MovieRow title="Now Playing Movies" movieGenres={movieGenres} />
        <MovieRow title="Popular Movies" movieGenres={movieGenres} />
        <MovieRow title="Top Rated Movies" movieGenres={movieGenres} />
        <MovieRow title="Trending Movies" movieGenres={movieGenres} />
        <MovieRow title="Upcoming Movies" movieGenres={movieGenres} />

        <TvRow title="Today Airing Tv Series" tvGenres={tvGenres} />
        <TvRow title="On The Air Tv Series" tvGenres={tvGenres} />
        <TvRow title="Trending Tv Series" tvGenres={tvGenres} />
        <TvRow title="Popular Tv Series" tvGenres={tvGenres} />
        <TvRow title="Top Rated Tv Series" tvGenres={tvGenres} />
        <Footer />
      </div>
    </Layout>
  );
};

export default index;
