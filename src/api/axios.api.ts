import axios from "axios";
import { TMDB_V3_API } from "../constants/apiUrls.constant";

const TMDB_ACCESS_TOKEN = import.meta.env.TMDB_ACCESS_TOKEN;
// create an axios instance for movie,tv and actors etc ...
export const axiosInstance = axios.create({
  baseURL: TMDB_V3_API,
  headers: {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
});

export default axiosInstance;
