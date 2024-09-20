export interface ISaveItem {
  id?: string;
  uid: string;
  itemId: number;
  title: string;
  type: "movie" | "tv";
  vote_count: number;
  vote_average: number;
  language: string;
  genre: string;
  date: string;
}
