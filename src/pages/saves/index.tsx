import React, { useEffect, useState } from "react";
import Layout from "@components/layout";
import { appContext } from "@context/index";
import { Navigate } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";
import "@styles/pages/saves/saves.css";
import TextfieldSearch from "@/components/textfields/TextfieldSearch";
import saveService from "@/services/save.service";
import movieService from "@/services/movie.service";
import tvService from "@/services/tv.service";
import { IGenre } from "@/interfaces/tv.interface";
import { TMDB_V3_IMAGE_API } from "@/constants/apiUrls.constant";
import imdbLogo from "@assets/imdb.png";
import tomatoLogo from "@assets/tomato.png";

interface IFilter {
  search: string;
  movieType: string[];
  genderType: string[];
}

const Saves: React.FC = () => {
  const context = appContext();
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [filters, setFilters] = useState<IFilter>({
    search: "",
    movieType: [],
    genderType: [],
  });

  if (!context.user) {
    return <Navigate to={routePaths.HOME_PAGE} />;
  }

  const searchTextHandler = (text: string) => {
    setFilters((state) => ({ ...state, search: text }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const tvGenresData = await tvService.fetchTvGenres();
      const movieGenresData = await movieService.fetchMovieGenres();
      const combinedGenres = [
        ...tvGenresData.genres,
        ...movieGenresData.genres,
      ];

      const uniqueGenres = combinedGenres.filter(
        (genre, index, self) =>
          index === self.findIndex((g) => g.name === genre.name)
      );

      setGenres(uniqueGenres);
    };

    fetchData();
  }, []);

  const movieTypeHandler = (event: any) => {
    const value = event.target.value;
    if (!filters.movieType.includes(`${value}`)) {
      const newMovieType = filters.movieType;
      newMovieType.push(value);
      setFilters((state) => ({ ...state, movieType: newMovieType }));
    } else {
      const newMovieType = filters.movieType.filter((item) => item !== value);
      setFilters((state) => ({ ...state, movieType: newMovieType }));
    }
  };

  const genderTypeHandler = (event: any) => {
    const value = event.target.value;
    if (!filters.genderType.includes(`${value}`)) {
      const newGenderType = filters.genderType;
      newGenderType.push(value);
      setFilters((state) => ({ ...state, genderType: newGenderType }));
    } else {
      const newGenderType = filters.genderType.filter((item) => item !== value);
      setFilters((state) => ({ ...state, genderType: newGenderType }));
    }
  };

  const unSaveMovieHandler = async (movieId: string) => {
    const itemExist = context.saves.find((item) => item.id === movieId);
    context.setSaves((state) =>
      state.filter((item) => item.id !== itemExist?.id)
    );
    await saveService.unSaveItem(`${itemExist?.id}`);
  };

  return (
    <Layout dark={true}>
      <div className="saves-page">
        <div className="left-side">
          <div className="search-box">
            <p>Search saves</p>
            <TextfieldSearch
              placeholder="Search..."
              onChange={searchTextHandler}
            />
          </div>

          <div className="filters">
            <div>
              <p>Movie Type</p>
              <div>
                <input
                  type="checkbox"
                  name="option1"
                  value="movie"
                  onChange={movieTypeHandler}
                  checked={filters.movieType.includes("movie")}
                />
                <label>Movie</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="option2"
                  value="tv"
                  onChange={movieTypeHandler}
                  checked={filters.movieType.includes("tv")}
                />
                <label>Tv</label>
              </div>
            </div>

            <div>
              <p>Genders</p>
              {genres.map((item, key) => (
                <div key={key}>
                  <input
                    type="checkbox"
                    name={`option${key + 3}`}
                    value={item.name}
                    onChange={genderTypeHandler}
                    checked={filters.genderType.includes(`${item.name}`)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-side">
          {context.saves
            .filter((item) =>
              item.title.toLowerCase().includes(filters.search.toLowerCase())
            )
            .filter((item) => {
              if (filters.movieType.length === 0) {
                return true;
              }
              return filters.movieType.includes(item.type);
            })
            .filter((item) => {
              if (filters.genderType.length === 0) {
                return true;
              }
              return filters.genderType.some((element) =>
                item.genre.split(", ").includes(element)
              );
            })
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
                          .includes(item.itemId) && "active"
                      }`}
                      onClick={() => unSaveMovieHandler(`${item?.id}`)}
                    />
                  )}
                </div>
                <div className="movie-item-content">
                  <p>
                    {item.language} , {item.date}
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
                  <p>{item.genre}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Saves;
