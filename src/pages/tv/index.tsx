import React, { useEffect, useState } from "react";
import TextfieldSearch from "@components/textfields/TextfieldSearch";
import { appContext } from "@context/index";
import { IGenre, ITv, ITvList } from "@interfaces/tv.interface";
import Layout from "@components/layout";
import imdbLogo from "@assets/imdb.png";
import tomatoLogo from "@assets/tomato.png";
import saveService from "@/services/save.service";
import { TMDB_V3_IMAGE_API } from "@/constants/apiUrls.constant";
import { ISaveItem } from "@/interfaces/save.interface";
import Pagination from "@mui/material/Pagination";
import tvService from "@/services/tv.service";
import "@styles/pages/tv/tv.css";

interface IFilter {
  search: string;
  page: number;
  genderType: number[];
}

const Tvs: React.FC = () => {
  const context = appContext();
  const [tvs, setTvs] = useState<ITvList>();
  const [genres, setGenres] = useState<IGenre[]>([]);
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
      const response = await tvService.fetchSearchTv(
        filters.search,
        filters.page,
        filters.genderType
      );
      setTvs(response);
    };

    fetchData();
  }, [filters]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await tvService.fetchTvGenres();
      const tvGenres = response.genres;
      setGenres(tvGenres);
    };

    fetchData();
  }, []);

  const saveMovieHandler = async (tv: ITv) => {
    if (!context.saves.flatMap((item) => item.itemId).includes(tv.id)) {
      const newSaveItem: ISaveItem = {
        uid: `${context.user?.uid}`,
        date: `${tv.first_air_date}`,
        genre: `${genres
          .filter((item) => tv.genre_ids.includes(item.id))
          .map((item) => item.name)
          .join(", ")}`,
        itemId: tv.id,
        language: tv.original_language,
        title: tv.name || tv.original_name,
        type: "tv",
        vote_average: tv.vote_average,
        vote_count: tv.vote_count,
        poster_path: tv.poster_path,
      };

      const response: any = await saveService.saveItem(newSaveItem);
      newSaveItem.id = response.id;
      context.setSaves((state) => [...state, newSaveItem]);
    } else {
      const itemExist = context.saves.find((item) => item.itemId === tv.id);
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
      <div className="tvs-page">
        <div className="left-side">
          <div className="search-box">
            <p>Search tvs</p>
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
            {tvs?.results
              .filter((item) =>
                item.name.toLowerCase().includes(filters.search.toLowerCase())
              )
              .map((item, key) => (
                <div className="tv-item" key={key}>
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
                  <p>
                    {item.original_language} , {item.first_air_date}
                  </p>
                  <h4>{item.name}</h4>
                  <div className="tv-item-rating">
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
              ))}
          </div>
          <div className="pagination-box">
            <Pagination
              count={tvs?.total_pages}
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

export default Tvs;
