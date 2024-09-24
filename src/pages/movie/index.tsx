import React, { useEffect, useState } from "react";
import TextfieldSearch from "@components/textfields/TextfieldSearch";
import { appContext } from "@context/index";
import { IGenre } from "@interfaces/tv.interface";
import movieService from "@services/movie.service";
import Layout from "@components/layout";
import "@styles/pages/movie/movie.css";
import { IMovieItem, IMovieList } from "@/interfaces/movie.interface";
import imdbLogo from "@assets/imdb.png";
import tomatoLogo from "@assets/tomato.png";
import saveService from "@/services/save.service";
import { TMDB_V3_IMAGE_API } from "@/constants/apiUrls.constant";
import { ISaveItem } from "@/interfaces/save.interface";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";

interface IFilter {
  search: string;
  page: number;
  genderType: number[];
}

const Movies: React.FC = () => {
  const context = appContext();
  const [movies, setMovies] = useState<IMovieList>();
  const [genres, setGenres] = useState<IGenre[]>([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState<IFilter>({
    search: "",
    page: 1,
    genderType: [],
  });

  const searchTextHandler = (text: string) => {
    setFilters((state) => ({ ...state, search: text, page: 1 }));
  };

  const genderTypeHandler = (event: any) => {
    const value = Number(event.target.value);
    if (!filters.genderType.includes(value)) {
      const newGenderType = filters.genderType;
      newGenderType.push(value);
      setFilters((state) => ({ ...state, genderType: newGenderType, page: 1 }));
    } else {
      const newGenderType = filters.genderType.filter((item) => item !== value);
      setFilters((state) => ({ ...state, genderType: newGenderType, page: 1 }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await movieService.fetchSearchMovie(
        filters.search,
        filters.page,
        filters.genderType
      );
      setMovies(response);
    };

    fetchData();
  }, [filters]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await movieService.fetchMovieGenres();
      const movieGenres = response.genres;
      setGenres(movieGenres);
    };

    fetchData();
  }, []);

  const saveMovieHandler = async (movie: IMovieItem) => {
    if (!context.saves.flatMap((item) => item.itemId).includes(movie.id)) {
      const newSaveItem: ISaveItem = {
        uid: `${context.user?.uid}`,
        date: `${movie.release_date}`,
        genre: `${genres
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

  const handlePageChange = (_: any, newPage: number) => {
    setFilters((state) => ({ ...state, page: newPage }));
  };

  return (
    <Layout dark={true}>
      <div className="movies-page">
        <div className="left-side">
          <div className="search-box">
            <p>Search movies</p>
            <TextfieldSearch
              placeholder="Search..."
              onChange={searchTextHandler}
            />
          </div>

          <div className="filters">
            <div>
              <p>Genders</p>
              {genres.map((item, key) => (
                <div key={key}>
                  <input
                    type="checkbox"
                    name={`option${key + 3}`}
                    value={item.id}
                    onChange={genderTypeHandler}
                    checked={filters.genderType.includes(item.id)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-side">
          <div className="right-side-content">
            {movies?.results
              .filter((item) =>
                item.title.toLowerCase().includes(filters.search.toLowerCase())
              )
              .map((item, key) => (
                <div className="movie-item" key={key}>
                  <div
                    style={{
                      backgroundImage: `url(${TMDB_V3_IMAGE_API}/${item.poster_path})`,
                    }}
                  >
                    {context.user && (
                      <i
                        className={`fa-solid fa-heart ${
                          context.saves
                            .flatMap((item) => item.itemId)
                            .includes(item.id) && "active"
                        }`}
                        onClick={() => saveMovieHandler(item)}
                      />
                    )}
                  </div>
                  <div
                    className="movie-item-content"
                    onClick={() =>
                      navigate(`${routePaths.MOVIES_PAGE}/${item.id}`)
                    }
                  >
                    <p>
                      {item.original_language} , {item.release_date}
                    </p>
                    <h4>{item.title}</h4>
                    <div className="movie-item-rating">
                      <div>
                        <img src={imdbLogo} alt="IMDb" />
                        {item.vote_average.toFixed(2)}/10
                      </div>
                      <div>
                        <img src={tomatoLogo} alt="Tomato" />
                        {item.vote_count}
                      </div>
                    </div>
                    <p>
                      {genres
                        .filter((genre) => item.genre_ids.includes(genre.id))
                        .map((item) => item.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className="pagination-box">
            <Pagination
              count={movies?.total_pages}
              color="primary"
              page={filters.page}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Movies;
