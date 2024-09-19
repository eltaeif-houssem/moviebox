import React, { useEffect, useState } from "react";
import Layout from "@components/layout";
import Backdrop from "./Backdrop";
import "@styles/pages/home/home.css";
import Footer from "@components/footers/Footer";
import MovieRow from "@components/rows/MovieRow";
import { IMovieGenres } from "@interfaces/movie.interface";
import movieService from "@services/movie.service";

const index: React.FC = () => {
  const [movieGenres, setMovieGenres] = useState<IMovieGenres>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await movieService.fetchMovieGenres();
      setMovieGenres(response);
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
        <Footer />
      </div>
    </Layout>
  );
};

export default index;
