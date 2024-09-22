import React, { useEffect, useState } from "react";
import Layout from "@components/layout";
import { appContext } from "@context/index";
import { Navigate } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";
import "@styles/pages/saves/saves.css";
import TextfieldSearch from "@/components/textfields/TextfieldSearch";
import saveService from "@/services/save.service";
import { ISaveItem } from "@/interfaces/save.interface";
import movieService from "@/services/movie.service";
import tvService from "@/services/tv.service";
import { IGenre } from "@/interfaces/tv.interface";

const Saves: React.FC = () => {
  const context = appContext();
  const [search, setSearch] = useState<string>("");
  const [saves, setSaves] = useState<ISaveItem[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);

  if (!context.user) {
    return <Navigate to={routePaths.HOME_PAGE} />;
  }

  const searchTextHandler = (text: string) => {
    setSearch(text);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await saveService.fetchSaves(
        `${context.user?.uid}`
      );
      setSaves(response);
    };

    fetchData();
  }, []);

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
                <input type="checkbox" name="option1" value="movie" />
                <label>Movie</label>
              </div>
              <div>
                <input type="checkbox" name="option2" value="tv" />
                <label>Tv</label>
              </div>
            </div>

            <div>
              <p>Genders</p>
              <div>
                <input type="checkbox" name="option3" value="movie" />
                <label>Movie</label>
              </div>

              {genres.map((item, key) => (
                <div key={key}>
                  <input
                    type="checkbox"
                    name={`option${key + 3}`}
                    value={item.name}
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

export default Saves;

// movie type (movie,tv)
// gender
