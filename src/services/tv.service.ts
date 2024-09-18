import {
  ITvDetails,
  ITvList,
  ITvTrailerList,
  ITvImages,
  ITvReviews,
  ITvGenres,
} from "../interfaces/tv.interface";
import * as tvApi from "@apis/tv.api";

class TvService {
  async fetchTvDetails(tvId: number): Promise<ITvDetails> {
    try {
      const { data } = await tvApi.getTvDtails(tvId);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvDetails;
    }
  }

  async fetchAiringTodayTv(page: number = 1): Promise<ITvList> {
    try {
      const { data } = await tvApi.getAiringTodayTv(page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvList;
    }
  }

  async fetchOnTheAirTv(page: number = 1): Promise<ITvList> {
    try {
      const { data } = await tvApi.getOnTheAirTv(page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvList;
    }
  }

  async fetchPopularTv(page: number = 1): Promise<ITvList> {
    try {
      const { data } = await tvApi.getPopularTv(page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvList;
    }
  }

  async fetchTopRatedTv(page: number = 1): Promise<ITvList> {
    try {
      const { data } = await tvApi.getTopRatedTv(page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvList;
    }
  }

  async fetchRecommendationsTv(
    tvId: number,
    page: number = 1
  ): Promise<ITvList> {
    try {
      const { data } = await tvApi.getRecommendationsTv(tvId, page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvList;
    }
  }

  async fetchSimilarTv(tvId: number, page: number = 1): Promise<ITvList> {
    try {
      const { data } = await tvApi.getSimilarTv(tvId, page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvList;
    }
  }

  async fetchTvTrailers(tvId: number): Promise<ITvTrailerList> {
    try {
      const { data } = await tvApi.getTvTrailers(tvId);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvTrailerList;
    }
  }

  async fetchTvImages(tvId: number): Promise<ITvImages> {
    try {
      const { data } = await tvApi.getTvImages(tvId);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvImages;
    }
  }

  async fetchTvReviews(tvId: number, page: number = 1): Promise<ITvReviews> {
    try {
      const { data } = await tvApi.getTvReviews(tvId, page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvReviews;
    }
  }

  async fetchSearchTv(query: string, page: number = 1): Promise<ITvList> {
    try {
      const { data } = await tvApi.getSearchTv(query, page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvList;
    }
  }

  async fetchTvGenres(): Promise<ITvGenres> {
    try {
      const { data } = await tvApi.getTvGenres();
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvGenres;
    }
  }

  async fetchTrendingTv(
    base: "week" | "day",
    page: number = 1
  ): Promise<ITvList> {
    try {
      const { data } = await tvApi.getTrendingTv(base, page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvList;
    }
  }

  async fetchTvByGenre(genreId: number, page: number = 1): Promise<ITvList> {
    try {
      const { data } = await tvApi.getTvByGenre(genreId, page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as ITvList;
    }
  }
}

export const tvService = new TvService();
export default tvService;