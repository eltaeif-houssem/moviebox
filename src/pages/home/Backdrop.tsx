import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IMovieItem, IMovieList } from "@interfaces/movie.interface";
import movieService from "@services/movie.service";
import BackdropItem from "./BackdropItem";
import { Pagination, Autoplay } from "swiper/modules";
import BackdropTrailer from "./BackdropTrailer";

import "swiper/css";
import "swiper/css/pagination";
import "@styles/pages/home/backdrop.css";

const Backdrop: React.FC = () => {
  const [movies, setMovies] = useState<IMovieList | null>(null);
  const [movie, setMovie] = useState<IMovieItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await movieService.fetchTrendingMovies("week");
      setMovies(response);
    };

    fetchData();
  }, []);

  const onclickHandler = (movie: IMovieItem) => {
    setMovie(movie);
  };

  const onCloseTrailerHandler = () => {
    setMovie(null);
  };
  return (
    <>
      <Swiper
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={true}
        loop={true}
        className="mySwiper backdrops"
      >
        {movies?.results.map((movie, key) => (
          <SwiperSlide className="backdrop" key={key}>
            <BackdropItem movie={movie} onClick={onclickHandler} />
          </SwiperSlide>
        ))}
      </Swiper>
      {movie && (
        <BackdropTrailer movie={movie} onClose={onCloseTrailerHandler} />
      )}
    </>
  );
};

export default Backdrop;
