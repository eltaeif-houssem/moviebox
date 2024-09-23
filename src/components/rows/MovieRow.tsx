import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import movieService from "@services/movie.service";
import { IMovieItem, IMovieGenres } from "@interfaces/movie.interface";
import {
  TRENDING_MOVIES,
  NOW_PLAYING_MOVIES,
  POPULAR_MOVIES,
  TOP_RATED_MOVIES,
  UPCOMING_MOVIES,
} from "@constants/movieTitles.constant";
import { TMDB_V3_IMAGE_API } from "@constants/apiUrls.constant";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import imdbLogo from "@assets/imdb.png";
import tomatoLogo from "@assets/tomato.png";
import "swiper/css";
import "swiper/css/navigation";
import "@styles/components/rows.css";
import { appContext } from "@/context";
import saveService from "@/services/save.service";
import { ISaveItem } from "@/interfaces/save.interface";
import * as routePaths from "@constants/routePaths.contant";

interface Props {
  title:
    | typeof TRENDING_MOVIES
    | typeof NOW_PLAYING_MOVIES
    | typeof POPULAR_MOVIES
    | typeof TOP_RATED_MOVIES
    | typeof UPCOMING_MOVIES;
  movieGenres?: IMovieGenres;
}

const MovieRow: React.FC<Props> = ({ title, movieGenres }) => {
  const context = appContext();
  const [movies, setMovies] = useState<IMovieItem[]>([]);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      let response;

      switch (title) {
        case TRENDING_MOVIES:
          response = await movieService.fetchTrendingMovies("week");
          break;
        case NOW_PLAYING_MOVIES:
          response = await movieService.fetchNowPlayingMovies();
          break;
        case POPULAR_MOVIES:
          response = await movieService.fetchPopularMovies();
          break;
        case TOP_RATED_MOVIES:
          response = await movieService.fetchTopRatedMovies();
          break;
        case UPCOMING_MOVIES:
          response = await movieService.fetchUpcomingMovies();
          break;
        default:
          response = { results: [] };
      }

      setMovies(response?.results || []);
    };

    fetchData();
  }, [title]);

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
    <div className="movie-row">
      <div className="movie-row-header">
        <h2>{title}</h2>
        <Link to={routePaths.MOVIES_PAGE}>
          See more <i className="fa-solid fa-chevron-right" />
        </Link>
      </div>

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
          {movies?.map((movie, key) => (
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

export default MovieRow;
