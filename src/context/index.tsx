import React, { createContext, useContext, useEffect, useState } from "react";
import type { IAppContext } from "@interfaces/context";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@configs/firebase.config";
import InfiniteSpinner from "@/components/spinners/InfiniteSpinner";

const AppContext = createContext<IAppContext>({
  user: null,
  setUser: () => {},
});

export const appContext = () => useContext(AppContext);

interface Props {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      console.log(data);
      if (data) {
        setUser(data);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <InfiniteSpinner />;
  }

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
