import type { AxiosResponse } from "axios";
import axios from "./axios.api";
import {
  ITvDetails,
  ITvList,
  ITvTrailerList,
  ITvImages,
  ITvReviews,
  ITvGenres,
  ITvEpisode,
  ITvSeason,
  ITvVideoList,
  ITvCredits,
} from "@interfaces/tv.interface";

/**
 * @GET tv details
 * @param tvId: tv id
 * @returns {AxiosResponse<ITvDetails>} object
 */
export const getTvDtails = async (
  tvId: number
): Promise<AxiosResponse<ITvDetails>> => axios.get(`/tv/${tvId}`);

/**
 * @GET today airing tv
 * @param page: page number
 * @returns {AxiosResponse<ITvList>} object
 */
export const getAiringTodayTv = async (
  page: number = 1
): Promise<AxiosResponse<ITvList>> =>
  axios.get(`tv/airing_today?language=en-US&page=${page}`);

/**
 * @GET on the air tv
 * @param page: page number
 * @returns {AxiosResponse<ITvList>} object
 */
export const getOnTheAirTv = async (
  page: number = 1
): Promise<AxiosResponse<ITvList>> =>
  axios.get(`/tv/on_the_air?language=en-US&page=${page}`);

/**
 * @GET popular tv
 * @param page: page number
 * @returns {AxiosResponse<ITvList>} object
 */
export const getPopularTv = async (
  page: number = 1
): Promise<AxiosResponse<ITvList>> => axios.get(`/tv/popular?page=${page}`);

/**
 * @GET top rated tv
 * @param page: page number
 * @returns {AxiosResponse<ITvList>} object
 */
export const getTopRatedTv = async (
  page: number = 1
): Promise<AxiosResponse<ITvList>> => axios.get(`/tv/top_rated?page=${page}`);

/**
 * @GET recrommendations tv
 * @param tvId: tv id
 * @param page: page number
 * @returns {AxiosResponse<ITvList>} object
 */
export const getRecommendationsTv = async (
  tvId: number,
  page: number = 1
): Promise<AxiosResponse<ITvList>> =>
  axios.get(`/tv/${tvId}/recommendations?language=en-US&page=${page}`);

/**
 * @GET similar tv
 * @param tvId: tv id
 * @param page: page number
 * @returns {AxiosResponse<ITvList>} object
 */
export const getSimilarTv = async (
  tvId: number,
  page: number = 1
): Promise<AxiosResponse<ITvList>> =>
  axios.get(`/tv/${tvId}/similar?page=${page}`);

/**
 * @GET tv trailers
 * @param tvId: tv id
 * @returns {AxiosResponse<ITvTrailerList>} object
 */
export const getTvTrailers = async (
  tvId: number
): Promise<AxiosResponse<ITvTrailerList>> => axios.get(`/tv/${tvId}/videos`);

/**
 * @GET tv images
 * @param tvId: tv id
 * @returns {AxiosResponse<ITvImages>} object
 */
export const getTvImages = async (
  tvId: number
): Promise<AxiosResponse<ITvImages>> => axios.get(`/tv/${tvId}/images`);

/**
 * @GET tv reviews
 * @param tvId: tv id
 * @param page: page number
 * @returns {AxiosResponse<ITvReviews>} object
 */
export const getTvReviews = async (
  tvId: number,
  page: number = 1
): Promise<AxiosResponse<ITvReviews>> =>
  axios.get(`/tv/${tvId}/reviews?language=en-US&page=${page}`);

/**
 * @GET search tv
 * @param query: search string
 * @param page: page number
 * @param genres: genres list
 * @returns {AxiosResponse<ITvList>} object
 */
export const getSearchTv = async (
  query: string,
  page: number = 1,
  genres: number[]
): Promise<AxiosResponse<ITvList>> =>
  axios.get(
    `/${query.length > 0 ? "search" : "discover"}/tv?page=${page}${
      query.length > 0 ? "&query=" + query.split(" ").join(",") : ""
    }${genres.length > 0 ? "&with_genres=" + genres.join(",") : ""}`
  );

/**
 * @GET tv genres
 * @returns {AxiosResponse<ITvGenres>} object
 */
export const getTvGenres = async (): Promise<AxiosResponse<ITvGenres>> =>
  axios.get(`/genre/tv/list`);

/**
 * @GET trending tv's
 * @param base("day","week")
 * @param page: number
 * @returns {AxiosResponse<ITvList>} object
 */
export const getTrendingTv = async (
  base: "week" | "day",
  page: number = 1
): Promise<AxiosResponse<ITvList>> =>
  axios.get(`/trending/tv/${base}?page=${page}`);

/**
 * @GET tv's by genre
 * @param genreId: genre id
 * @param page: number
 * @returns {AxiosResponse<ITvList>} object
 */
export const getTvByGenre = async (
  genreId: number,
  page: number = 1
): Promise<AxiosResponse<ITvList>> =>
  axios.get(`/discover/tv?with_genres=${genreId}&language=en-US&page=${page}`);

/**
 * @GET tv season details
 * @param tvId: tv series id
 * @param seasonNumber: season number
 * @returns {AxiosResponse<ITvSeason>} object
 */
export const getSeasonDetails = async (
  tvId: number,
  seasonNumber: number
): Promise<AxiosResponse<ITvSeason>> =>
  axios.get(`/tv/${tvId}/season/${seasonNumber}`);

/**
 * @GET tv season videos
 * @param tvId: tv series id
 * @param seasonNumber: season number
 * @returns {AxiosResponse<ITvVideoList>} object
 */
export const getSeasonTrailers = async (
  tvId: number,
  seasonNumber: number
): Promise<AxiosResponse<ITvVideoList>> =>
  axios.get(`/tv/${tvId}/season/${seasonNumber}/videos`);

/**
 * @GET tv season images
 * @param tvId: tv series id
 * @param seasonNumber: season number
 * @returns {AxiosResponse<ITvImages>} object
 */
export const getSeasonImages = async (
  tvId: number,
  seasonNumber: number
): Promise<AxiosResponse<ITvImages>> =>
  axios.get(`/tv/${tvId}/season/${seasonNumber}/images`);

/**
 * @GET tv episode details
 * @param tvId: tv series id
 * @param seasonNumber: season number
 * @param episodeNumber: episode number
 * @returns {AxiosResponse<ITvEpisode>} object
 */
export const getEpisodeDetails = async (
  tvId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<AxiosResponse<ITvEpisode>> =>
  axios.get(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`);

/**
 * @GET tv episode videos
 * @param tvId: tv series id
 * @param seasonNumber: season number
 * @param episodeNumber: episode number
 * @returns {AxiosResponse<ITvVideoList>} object
 */
export const getEpisodeTrailers = async (
  tvId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<AxiosResponse<ITvVideoList>> =>
  axios.get(
    `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/videos`
  );

/**
 * @GET tv episode images
 * @param tvId: tv series id
 * @param seasonNumber: season number
 * @param episodeNumber: episode number
 * @returns {AxiosResponse<ITvImages>} object
 */
export const getEpisodeImages = async (
  tvId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<AxiosResponse<ITvImages>> =>
  axios.get(
    `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/images`
  );

/**
 * @GET tv credits
 * @param tvId: tvId
 * @param page: number
 * @returns {AxiosResponse<ITvCredits>} object
 */
export const getTvCredits = async (
  tvId: number,
  page: number = 1
): Promise<AxiosResponse<ITvCredits>> =>
  axios.get(`/tv/${tvId}/credits?page=${page}`);
