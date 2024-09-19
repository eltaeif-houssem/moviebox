import {
  IMovieDetails,
  IMovieListDateRange,
  IMovieList,
  IMovieTrailerList,
  IMovieImages,
  IMovieReviews,
  IMovieGenres,
} from "../interfaces/movie.interface";
import * as movieApi from "@apis/movie.api";

class MovieService {
  async fetchMovieDetails(movieId: number): Promise<IMovieDetails> {
    try {
      const { data } = await movieApi.getMovieDtails(movieId);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieDetails;
    }
  }

  async fetchNowPlayingMovies(page: number = 1): Promise<IMovieListDateRange> {
    try {
      const { data } = await movieApi.getNowPlayingMovies(page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieListDateRange;
    }
  }

  async fetchPopularMovies(page: number = 1): Promise<IMovieList> {
    try {
      const { data } = await movieApi.getPopularMovies(page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieList;
    }
  }

  async fetchTopRatedMovies(page: number = 1): Promise<IMovieList> {
    try {
      const { data } = await movieApi.getTopRatedMovies(page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieList;
    }
  }

  async fetchUpcomingMovies(page: number = 1): Promise<IMovieListDateRange> {
    try {
      const { data } = await movieApi.getUpcomingMovies(page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieListDateRange;
    }
  }

  async fetchSimilarMovies(
    movieId: number,
    page: number = 1
  ): Promise<IMovieList> {
    try {
      const { data } = await movieApi.getSimilarMovies(movieId, page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieList;
    }
  }

  async fetchMovieTrailers(movieId: number): Promise<IMovieTrailerList> {
    try {
      const { data } = await movieApi.getMovieTrailers(movieId);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieTrailerList;
    }
  }

  async fetchMovieImages(movieId: number): Promise<IMovieImages> {
    try {
      const { data } = await movieApi.getMovieImages(movieId);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieImages;
    }
  }

  async fetchMovieReviews(
    movieId: number,
    page: number = 1
  ): Promise<IMovieReviews> {
    try {
      const { data } = await movieApi.getMovieReviews(movieId, page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieReviews;
    }
  }

  async fetchSearchMovie(query: string, page: number = 1): Promise<IMovieList> {
    try {
      const { data } = await movieApi.getSearchMovie(query, page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieList;
    }
  }

  async fetchMovieGenres(): Promise<IMovieGenres> {
    try {
      const { data } = await movieApi.getMovieGenres();
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieGenres;
    }
  }

  async fetchTrendingMovies(
    base: "week" | "day",
    page: number = 1
  ): Promise<IMovieList> {
    try {
      const { data } = await movieApi.getTrendingMovies(base, page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieList;
    }
  }

  async fetchMoviesByGenre(
    genreId: number,
    page: number = 1
  ): Promise<IMovieList> {
    try {
      const { data } = await movieApi.getMoviesByGenre(genreId, page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IMovieList;
    }
  }
}

export const movieService = new MovieService();
export default movieService;
