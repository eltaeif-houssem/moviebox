import React, { useState } from "react";
import Layout from "@components/layout";
import { appContext } from "@context/index";
import { Navigate } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";
import "@styles/pages/saves/saves.css";
import TextfieldSearch from "@/components/textfields/TextfieldSearch";

const Saves: React.FC = () => {
  const context = appContext();
  const [search, setSearch] = useState<string>("");

  if (!context.user) {
    return <Navigate to={routePaths.HOME_PAGE} />;
  }

  const searchTextHandler = (event: any) => {
    const { value } = event.target;
    setSearch(value);
  };

  const searchBtnHandler = () => {};
  return (
    <Layout dark={true}>
      <div className="saves-page">
        <div className="left-side">
          <div className="search-box">
            <p>Search saves</p>
            <TextfieldSearch
              placeholder="Search..."
              value={search}
              onChange={searchTextHandler}
              onClick={searchBtnHandler}
            />
          </div>
        </div>
        <div className="right-side"></div>
      </div>
    </Layout>
  );
};

export default Saves;
