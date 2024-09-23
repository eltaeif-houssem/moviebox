import React, { useEffect, useState } from "react";
import TextfieldSearch from "@components/textfields/TextfieldSearch";
import { appContext } from "@context/index";
import { IGenre } from "@interfaces/tv.interface";
import movieService from "@services/movie.service";
import Layout from "@components/layout";
import "@styles/pages/movie/movie.css";
import { IMovieList } from "@/interfaces/movie.interface";

interface IFilter {
  search: string;
  genderType: number[];
}

const Movies: React.FC = () => {
  const context = appContext();
  const [movies, setMovies] = useState<IMovieList>();
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [filters, setFilters] = useState<IFilter>({
    search: "",
    genderType: [],
  });

  const searchTextHandler = (text: string) => {
    setFilters((state) => ({ ...state, search: text }));
  };

  const genderTypeHandler = (event: any) => {
    const value = Number(event.target.value);
    if (!filters.genderType.includes(value)) {
      const newGenderType = filters.genderType;
      newGenderType.push(value);
      setFilters((state) => ({ ...state, genderType: newGenderType }));
    } else {
      const newGenderType = filters.genderType.filter((item) => item !== value);
      setFilters((state) => ({ ...state, genderType: newGenderType }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await movieService.fetchSearchMovie(
        filters.search,
        1,
        filters.genderType
      );
      setMovies(response);
    };

    fetchData();
  }, [filters.genderType, filters.search]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await movieService.fetchMovieGenres();
      const movieGenres = response.genres;
      setGenres(movieGenres);
    };

    fetchData();
  }, []);
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

        <div className="right-side"></div>
      </div>
    </Layout>
  );
};

export default Movies;
