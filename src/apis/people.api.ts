import type { AxiosResponse } from "axios";
import axios from "./axios.api";
import {
  IPersonDetails,
  IPeopleImages,
  IPeopleList,
} from "@interfaces/people.interface";

/**
 * @GET person details
 * @param personId: person id
 * @returns {AxiosResponse<IPersonDetails>} object
 */
export const getPersonDetails = async (
  personId: number
): Promise<AxiosResponse<IPersonDetails>> => axios.get(`/person/${personId}`);

/**
 * @GET person images
 * @param personId: person id
 * @returns {AxiosResponse<IPeopleImages>} object
 */
export const getPersonImages = async (
  personId: number
): Promise<AxiosResponse<IPeopleImages>> =>
  axios.get(`/person/${personId}/images`);

/**
 * @GET popular people
 * @param page: page number
 * @returns {AxiosResponse<IPeopleList>} object
 */
export const getPopularPeople = async (
  page: number = 1
): Promise<AxiosResponse<IPeopleList>> =>
  axios.get(`/person/popular?page=${page}`);

/**
 * @GET search person
 * @param query: search string
 * @param page: page number
 * @returns {AxiosResponse<IPeopleList>} object
 */
export const getSearchPerson = async (
  query: string,
  page: number = 1
): Promise<AxiosResponse<IPeopleList>> =>
  axios.get(`/search/person?query=${query.split(" ").join(",")}&page=${page}`);
