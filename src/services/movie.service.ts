import * as movieApi from "../api/movie.api";

class MovieService {
  async fetchMovieDetails(id: number) {
    try {
      const { data } = await movieApi.getMovieDtails(id);
    } catch (error) {
      console.error(error);
    }
  }
}

export const movieService = new MovieService();
export default movieService;
