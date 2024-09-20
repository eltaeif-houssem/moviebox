import React, { createContext, useContext, useEffect, useState } from "react";
import type { IAppContext } from "@/interfaces/context.interface";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@configs/firebase.config";
import InfiniteSpinner from "@/components/spinners/InfiniteSpinner";
import saveService from "@/services/save.service";
import { ISaveItem } from "@/interfaces/save.interface";

const AppContext = createContext<IAppContext>({
  user: null,
  setUser: () => {},
  saves: [],
  setSaves: () => {},
});

export const appContext = () => useContext(AppContext);

interface Props {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [saves, setSaves] = useState<ISaveItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser(data);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response: any = await saveService.fetchSaves(user.uid);
          setSaves(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <InfiniteSpinner />;
  }

  return (
    <AppContext.Provider value={{ user, setUser, saves, setSaves }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
