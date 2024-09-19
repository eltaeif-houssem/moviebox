import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IMovieList } from "@interfaces/movie.interface";
import movieService from "@services/movie.service";
import BackdropItem from "./BackdropItem";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "@styles/pages/home/backdrop.css";

const Backdrop: React.FC = () => {
  const [movies, setMovies] = useState<IMovieList | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await movieService.fetchTrendingMovies("week");
      setMovies(response);
    };

    fetchData();
  }, []);
  return (
    <Swiper
      slidesPerView={1}
      modules={[Pagination]}
      pagination={true}
      loop={true}
      className="mySwiper backdrops"
    >
      {movies?.results.map((movie, key) => (
        <SwiperSlide className="backdrop" key={key}>
          <BackdropItem movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Backdrop;
