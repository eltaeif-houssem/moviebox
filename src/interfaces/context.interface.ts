import { User } from "firebase/auth";
import { ISaveItem } from "./save.interface";

export interface IAppContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  saves: ISaveItem[];
  setSaves: React.Dispatch<React.SetStateAction<ISaveItem[]>>;
}
