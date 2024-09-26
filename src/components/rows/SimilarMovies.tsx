import React, { useEffect, useRef, useState } from "react";
import "@styles/components/rows.css";
import movieService from "@/services/movie.service";
import {
  IMovieGenres,
  IMovieItem,
  IMovieList,
} from "@/interfaces/movie.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { TMDB_V3_IMAGE_API } from "@/constants/apiUrls.constant";
import { appContext } from "@/context";
import saveService from "@/services/save.service";
import { ISaveItem } from "@/interfaces/save.interface";
import { useNavigate } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";
import imdbLogo from "@assets/imdb.png";
import tomatoLogo from "@assets/tomato.png";

interface Props {
  movieId: number;
}

const SimilarMovies: React.FC<Props> = ({ movieId }) => {
  const context = appContext();
  const [movies, setMovies] = useState<IMovieList>();
  const [movieGenres, setMoviesGenres] = useState<IMovieGenres>();
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const moviesData = await movieService.fetchSimilarMovies(movieId);
      const movieGenresData = await movieService.fetchMovieGenres();
      setMoviesGenres(movieGenresData);
      setMovies(moviesData);
    };

    fetchData();
  }, []);

  const saveMovieHandler = async (movie: IMovieItem) => {
    if (!context.saves.flatMap((item) => item.itemId).includes(movie.id)) {
      const newSaveItem: ISaveItem = {
        uid: `${context.user?.uid}`,
        date: `${movie.release_date}`,
        genre: `${movieGenres?.genres
          .filter((item) => movie.genre_ids.includes(item.id))
          .map((item) => item.name)
          .join(", ")}`,
        itemId: movie.id,
        language: movie.original_language,
        title: movie.title || movie.original_title,
        type: "movie",
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        poster_path: movie.poster_path,
      };

      const response: any = await saveService.saveItem(newSaveItem);
      newSaveItem.id = response.id;
      context.setSaves((state) => [...state, newSaveItem]);
    } else {
      const itemExist = context.saves.find((item) => item.itemId === movie.id);
      context.setSaves((state) =>
        state.filter((item) => item.id !== itemExist?.id)
      );
      await saveService.unSaveItem(`${itemExist?.id}`);
    }
  };

  return (
    <div className="similar-movies-row">
      <div className="swiper-container">
        <Swiper
          slidesPerView={6}
          spaceBetween={25}
          loop={true}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          touchStartPreventDefault={false}
          className="mySwiper movie-row-slides"
        >
          {movies?.results.map((movie, key) => (
            <SwiperSlide className="movie-row-slide" key={key}>
              <div className="movie-row-slide-item">
                <div
                  style={{
                    backgroundImage: `url(${TMDB_V3_IMAGE_API}/${movie.poster_path})`,
                  }}
                >
                  {context.user && (
                    <i
                      className={`fa-solid fa-heart ${
                        context.saves
                          .flatMap((item) => item.itemId)
                          .includes(movie.id) && "active"
                      }`}
                      onClick={() => saveMovieHandler(movie)}
                    />
                  )}
                </div>
                <div
                  onClick={() =>
                    navigate(`${routePaths.MOVIES_PAGE}/${movie.id}`)
                  }
                  className="movie-row-content"
                >
                  <p>
                    {movie.original_language.toUpperCase()} ,{" "}
                    {new Date(movie.release_date)
                      .toLocaleDateString()
                      .replace(/\//g, "-")}
                  </p>
                  <h4>{movie.title}</h4>
                  <div className="movie-row-rating">
                    <div>
                      <img src={imdbLogo} alt="IMDb" />
                      {movie.vote_average.toFixed(2)}/10
                    </div>
                    <div>
                      <img src={tomatoLogo} alt="Tomato" />
                      {movie.vote_count}
                    </div>
                  </div>
                  <p>
                    {movieGenres?.genres
                      .filter((item) => movie.genre_ids.includes(item.id))
                      .map((item) => item.name)
                      .join(", ")}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className="custom-swiper-button custom-swiper-button-prev"
          ref={prevRef}
        >
          <i className="fa-solid fa-chevron-left" />
        </div>
        <div
          className="custom-swiper-button custom-swiper-button-next"
          ref={nextRef}
        >
          <i className="fa-solid fa-chevron-right" />
        </div>
      </div>
    </div>
  );
};

export default SimilarMovies;
