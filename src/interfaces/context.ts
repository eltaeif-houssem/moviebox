import { User } from "firebase/auth";

export interface IAppContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
