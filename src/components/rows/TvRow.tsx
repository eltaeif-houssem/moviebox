import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tvService from "@services/tv.service";
import { ITvGenres, ITv } from "@interfaces/tv.interface";
import {
  ON_THE_AIR_TVS,
  POPULAR_TVS,
  TODAY_AIRING_TVS,
  TOP_RATED_TVS,
  TRENDING_TVS,
} from "@constants/tvTitles.constant";
import { TMDB_V3_IMAGE_API } from "@constants/apiUrls.constant";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import imdbLogo from "@assets/imdb.png";
import tomatoLogo from "@assets/tomato.png";
import { appContext } from "@context/index";
import "swiper/css";
import "swiper/css/navigation";
import "@styles/components/rows.css";
import { ISaveItem } from "@/interfaces/save.interface";
import saveService from "@/services/save.service";
import * as routePaths from "@constants/routePaths.contant";

interface Props {
  title:
    | typeof ON_THE_AIR_TVS
    | typeof POPULAR_TVS
    | typeof TODAY_AIRING_TVS
    | typeof TOP_RATED_TVS
    | typeof TRENDING_TVS;
  tvGenres?: ITvGenres;
}

const TvRow: React.FC<Props> = ({ title, tvGenres }) => {
  const context = appContext();
  const [tvs, setTvs] = useState<ITv[]>([]);
  const navigate = useNavigate();
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      let response;

      switch (title) {
        case ON_THE_AIR_TVS:
          response = await tvService.fetchOnTheAirTv();
          break;
        case POPULAR_TVS:
          response = await tvService.fetchPopularTv();
          break;
        case TODAY_AIRING_TVS:
          response = await tvService.fetchAiringTodayTv();
          break;
        case TOP_RATED_TVS:
          response = await tvService.fetchTopRatedTv();
          break;
        case TRENDING_TVS:
          response = await tvService.fetchTrendingTv("week");
          break;
        default:
          response = { results: [] };
      }

      setTvs(response?.results || []);
    };

    fetchData();
  }, [title]);

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
    <div className="tv-row">
      <div className="tv-row-header">
        <h2>{title}</h2>
        <Link to={routePaths.TVS_PAGE}>
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
          className="mySwiper tv-row-slides"
        >
          {tvs?.map((tv, key) => (
            <SwiperSlide className="tv-row-slide" key={key}>
              <div className="tv-row-slide-item">
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
                  className="tv-row-content"
                  onClick={() => navigate(`${routePaths.TVS_PAGE}/${tv.id}`)}
                >
                  <p>
                    {tv.original_language.toUpperCase()} ,{" "}
                    {new Date(tv.first_air_date)
                      .toLocaleDateString()
                      .replace(/\//g, "-")}
                  </p>
                  <h4>{tv.name || tv.original_name}</h4>
                  <div className="tv-row-rating">
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

export default TvRow;
