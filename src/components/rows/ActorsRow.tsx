import React, { useRef } from "react";
import "@styles/components/rows.css";
import { IMovieCredits } from "@/interfaces/movie.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { TMDB_V3_IMAGE_API } from "@/constants/apiUrls.constant";

interface Props {
  credits: IMovieCredits;
}

const ActorsRow: React.FC<Props> = ({ credits }) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="actors-row">
      <div className="actors-row-header">
        <h2>Actors</h2>
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
          className="mySwiper actors-row-slides"
        >
          {credits?.cast.map((actor, key) => (
            <SwiperSlide className="actors-row-slide" key={key}>
              <div className="actors-row-slide-item">
                <div
                  style={{
                    backgroundImage: `url(${TMDB_V3_IMAGE_API}/${actor.profile_path})`,
                  }}
                />
                <div className="actors-row-content">
                  <h4>{actor.name || actor.original_name}</h4>
                  <p>
                    <span>Character:</span> {actor.character}
                  </p>
                  <p>
                    <span>
                      Gender: {actor.gender === 1 ? "Female" : "Male"}
                    </span>
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

export default ActorsRow;
