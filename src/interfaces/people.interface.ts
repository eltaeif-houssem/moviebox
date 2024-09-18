import { IMovie } from "./movie.interface";

interface IPersonKnownFor extends IMovie {
  media_type: string;
}

interface IPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: IPersonKnownFor[];
}

export interface IPersonDetails extends Omit<IPerson, "known_for"> {
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  homepage: string | null;
  imdb_id: string;
  place_of_birth: string;
}

interface IPeopleImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface IPeopleImages {
  id: number;
  profiles: IPeopleImage[];
}

export interface IPeopleList {
  page: number;
  results: IPerson[];
  total_pages: number;
  total_results: number;
}
