import type { AxiosResponse } from "axios";
import axios from "./axios.api";
import {
  IMovieDetails,
  IMovieListDateRange,
  IMovieList,
  IMovieTrailerList,
  IMovieImages,
  IMovieReviews,
  IMovieGenres,
  IMovieCredits,
} from "@interfaces/movie.interface";

/**
 * @GET movie details
 * @param movieId: movie id
 * @returns {AxiosResponse<IMovieDetails>} object
 */
export const getMovieDtails = async (
  movieId: number
): Promise<AxiosResponse<IMovieDetails>> => axios.get(`/movie/${movieId}`);

/**
 * @GET now playing movies
 * @param page: page number
 * @returns {AxiosResponse<IMovieListDateRange>} object
 */
export const getNowPlayingMovies = async (
  page: number = 1
): Promise<AxiosResponse<IMovieListDateRange>> =>
  axios.get(`/movie/now_playing?page=${page}`);

/**
 * @GET popular movies
 * @param page: page number
 * @returns {AxiosResponse<IMovieList>} object
 */
export const getPopularMovies = async (
  page: number = 1
): Promise<AxiosResponse<IMovieList>> =>
  axios.get(`/movie/popular?page=${page}`);

/**
 * @GET top rated movies
 * @param page: page number
 * @returns {AxiosResponse<IMovieList>} object
 */
export const getTopRatedMovies = async (
  page: number = 1
): Promise<AxiosResponse<IMovieList>> =>
  axios.get(`/movie/top_rated?page=${page}`);

/**
 * @GET upcoming movies
 * @param page: page number
 * @returns {AxiosResponse<IMovieListDateRange>} object
 */
export const getUpcomingMovies = async (
  page: number = 1
): Promise<AxiosResponse<IMovieListDateRange>> =>
  axios.get(`/movie/upcoming?page=${page}`);

/**
 * @GET similar movies
 * @param movieId: movie id
 * @param page: page number
 * @returns {AxiosResponse<IMovieList>} object
 */
export const getSimilarMovies = async (
  movieId: number,
  page: number = 1
): Promise<AxiosResponse<IMovieList>> =>
  axios.get(`/movie/${movieId}/similar?page=${page}`);

/**
 * @GET movie trailers
 * @param movieId: movie id
 * @returns {AxiosResponse<IMovieTrailerList>} object
 */
export const getMovieTrailers = async (
  movieId: number
): Promise<AxiosResponse<IMovieTrailerList>> =>
  axios.get(`/movie/${movieId}/videos`);

/**
 * @GET movie images
 * @param movieId: movie id
 * @returns {IMovieImages} object
 */
export const getMovieImages = async (
  movieId: number
): Promise<AxiosResponse<IMovieImages>> =>
  axios.get(`/movie/${movieId}/images`);

/**
 * @GET movie reviews
 * @param movieId: movie id
 * @param page: page number
 * @returns {AxiosResponse<IMovieReviews>} object
 */
export const getMovieReviews = async (
  movieId: number,
  page: number = 1
): Promise<AxiosResponse<IMovieReviews>> =>
  axios.get(`/movie/${movieId}/reviews?language=en-US&page=${page}`);

/**
 * @GET search movie
 * @param query: search string
 * @param page: page number
 * @param genres: genres list
 * @returns {AxiosResponse<IMovieList>} object
 */
export const getSearchMovie = async (
  query: string,
  page: number = 1,
  genres: number[]
): Promise<AxiosResponse<IMovieList>> =>
  axios.get(
    `/${query.length > 0 ? "search" : "discover"}/movie?page=${page}${
      query.length > 0 ? "&query=" + query.split(" ").join(",") : ""
    }${genres.length > 0 ? "&with_genres=" + genres.join(",") : ""}`
  );

/**
 * @GET movie genres
 * @returns {AxiosResponse<IMovieGenres>} object
 */
export const getMovieGenres = async (): Promise<AxiosResponse<IMovieGenres>> =>
  axios.get(`/genre/movie/list`);

/**
 * @GET trending movies
 * @param base("day","week")
 * @param page: number
 * @returns {AxiosResponse<IMovieList>} object
 */
export const getTrendingMovies = async (
  base: "week" | "day",
  page: number = 1
): Promise<AxiosResponse<IMovieList>> =>
  axios.get(`/trending/movie/${base}?page=${page}`);

/**
 * @GET movies by genre
 * @param genreId: genre id
 * @param page: number
 * @returns {AxiosResponse<IMovieList>} object
 */
export const getMoviesByGenre = async (
  genreId: number,
  page: number = 1
): Promise<AxiosResponse<IMovieList>> =>
  axios.get(
    `/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`
  );

/**
 * @GET movie credits
 * @param movieId: movieId
 * @param page: number
 * @returns {AxiosResponse<IMovieCredits>} object
 */
export const getMovieCredits = async (
  movieId: number,
  page: number = 1
): Promise<AxiosResponse<IMovieCredits>> =>
  axios.get(`/movie/${movieId}/credits?page=${page}`);
