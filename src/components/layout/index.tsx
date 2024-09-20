import React from "react";
import Header from "@components/headers/Header";

interface Props {
  children: React.ReactNode;
  dark?: boolean;
}

const Layout: React.FC<Props> = ({ children, dark }) => {
  return (
    <>
      <Header dark={dark} />
      {children}
    </>
  );
};

export default Layout;
