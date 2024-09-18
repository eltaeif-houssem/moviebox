import {
  IPersonDetails,
  IPeopleImages,
  IPeopleList,
} from "@interfaces/people.interface";
import * as peopleApi from "@apis/people.api";

class PeopleService {
  async fetchPersonDetails(personId: number): Promise<IPersonDetails> {
    try {
      const { data } = await peopleApi.getPersonDetails(personId);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IPersonDetails;
    }
  }

  async fetchPersonImages(personId: number): Promise<IPeopleImages> {
    try {
      const { data } = await peopleApi.getPersonImages(personId);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IPeopleImages;
    }
  }

  async fetchPopularPeople(page: number = 1): Promise<IPeopleList> {
    try {
      const { data } = await peopleApi.getPopularPeople(page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IPeopleList;
    }
  }

  async fetchSearchPerson(
    query: string,
    page: number = 1
  ): Promise<IPeopleList> {
    try {
      const { data } = await peopleApi.getSearchPerson(query, page);
      return data;
    } catch (error) {
      console.error(error);
      return {} as IPeopleList;
    }
  }
}

export const peopleService = new PeopleService();
export default peopleService;
