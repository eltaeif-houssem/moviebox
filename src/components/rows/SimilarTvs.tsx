import React, { useEffect, useRef, useState } from "react";
import "@styles/components/rows.css";
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
import tvService from "@/services/tv.service";
import { ITv, ITvGenres, ITvList } from "@/interfaces/tv.interface";

interface Props {
  tvId: number;
}

const SimilarTvs: React.FC<Props> = ({ tvId }) => {
  const context = appContext();
  const [tvs, setTvs] = useState<ITvList>();
  const [tvGenres, setTvGenres] = useState<ITvGenres>();
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const tvsData = await tvService.fetchSimilarTv(Number(tvId));
      const tvGenresData = await tvService.fetchTvGenres();
      setTvGenres(tvGenresData);
      setTvs(tvsData);
    };

    fetchData();
  }, []);

  const saveTvHandler = async (tv: ITv) => {
    if (!context.saves.flatMap((item) => item.itemId).includes(tv.id)) {
      const newSaveItem: ISaveItem = {
        uid: `${context.user?.uid}`,
        date: `${tv.first_air_date}`,
        genre: `${tvGenres?.genres
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

  return (
    <div className="similar-movies-row">
      <div className="similar-movies-row-header">
        <h2>Similar Tvs</h2>
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
          className="mySwiper similar-movies-row-slides"
        >
          {tvs?.results.map((tv, key) => (
            <SwiperSlide className="similar-movies-row-slide" key={key}>
              <div className="similar-movies-row-slide-item">
                <div
                  style={{
                    backgroundImage: `url(${TMDB_V3_IMAGE_API}/${tv.poster_path})`,
                  }}
                >
                  {context.user && (
                    <i
                      className={`fa-solid fa-heart ${
                        context.saves
                          .flatMap((item) => item.itemId)
                          .includes(tv.id) && "active"
                      }`}
                      onClick={() => saveTvHandler(tv)}
                    />
                  )}
                </div>
                <div
                  onClick={() => navigate(`${routePaths.MOVIES_PAGE}/${tv.id}`)}
                  className="similar-movies-row-content"
                >
                  <p>
                    {tv.original_language.toUpperCase()} ,{" "}
                    {new Date(tv.first_air_date)
                      .toLocaleDateString()
                      .replace(/\//g, "-")}
                  </p>
                  <h4>{tv.name}</h4>
                  <div className="similar-movies-row-rating">
                    <div>
                      <img src={imdbLogo} alt="IMDb" />
                      {tv.vote_average.toFixed(2)}/10
                    </div>
                    <div>
                      <img src={tomatoLogo} alt="Tomato" />
                      {tv.vote_count}
                    </div>
                  </div>
                  <p>
                    {tvGenres?.genres
                      .filter((item) => tv.genre_ids.includes(item.id))
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

export default SimilarTvs;
