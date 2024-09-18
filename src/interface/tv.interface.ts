interface IGenre {
  id: number;
  name: string;
}

interface ILastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface ITvCreator {
  id: number;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}

interface INetwork {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ICompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ICountry {
  iso_3166_1: string;
  name: string;
}

interface ISeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: null | string;
  season_number: number;
  vote_average: number;
}

interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface ITv {
  id: number;
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
}

// exclude genre_ids using Omit
export interface ITvDetails extends Omit<ITv, "genre_ids"> {
  created_by: ITvCreator[];
  genres: IGenre[];
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: ILastEpisodeToAir;
  networks: INetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ICompany[];
  production_countries: ICountry[];
  seasons: ISeason[];
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
}

export interface ITvList {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

interface ITvImage {
  aspect_ratio: number;
  height: number;
  file_path: "/tKdUdybDGgEKrMz2we62aJeKHsT.jpg";
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ITvImages {
  id: number;
  backdrops: ITvImage[];
  logos: ITvImage[];
  posters: ITvImage[];
}

interface IAuthorDetails {
  name: string;
  username: string;
  avatar_path: null | string;
  rating: number;
}

interface ITvReview {
  author: string;
  author_details: IAuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ITvReviews {
  id: number;
  page: number;
  results: ITvReview[];
  total_pages: number;
  total_results: number;
}

export interface ITvGenres {
  genres: IGenre[];
}
