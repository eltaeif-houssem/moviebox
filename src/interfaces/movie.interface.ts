interface IGenre {
  id: number;
  name: string;
}

interface ICompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface IDates {
  maximum: string; // 2024-05-24
  minimum: string; // 2024-05-24
}

export interface IMovie {
  id: number;
  adult: boolean;
  backdrop_path?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieDetails extends IMovie {
  budget: number;
  genres: IGenre[];
  production_companies: ICompany[];
  production_countries: IProductionCountry[];
  revenue: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
}

export interface IMovieItem extends IMovie {
  genre_ids: number[];
}

export interface IMovieList {
  page: number;
  results: IMovieItem[];
  total_pages: number;
  total_results: number;
}

export interface IMovieListDateRange extends IMovieList {
  dates: IDates;
}

export interface IMovieTrailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface IMovieTrailerList {
  id: number;
  results: IMovieTrailer[];
}

interface IMovieImage {
  aspect_ratio: number;
  height: number;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface IMovieImages {
  id: number;
  backdrops: IMovieImage[];
  logos: IMovieImage[];
  posters: IMovieImage[];
}

interface IAuthorDetails {
  name: string;
  username: string;
  avatar_path: null | string;
  rating: number;
}

interface IMovieReview {
  author: string;
  author_details: IAuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface IMovieReviews {
  id: number;
  page: number;
  results: IMovieReview[];
  total_pages: number;
  total_results: number;
}

export interface IMovieGenres {
  genres: IGenre[];
}

interface IMovieCredit {
  id: number;
  adult: boolean;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
}

export interface IMovieCredits {
  id: number;
  cast: IMovieCredit[];
  crew: IMovieCredit[];
}
