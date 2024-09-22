import React, { useEffect, useState } from "react";
import Layout from "@components/layout";
import { appContext } from "@context/index";
import { Navigate } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";
import "@styles/pages/saves/saves.css";
import TextfieldSearch from "@/components/textfields/TextfieldSearch";
import saveService from "@/services/save.service";
import { ISaveItem } from "@/interfaces/save.interface";

const Saves: React.FC = () => {
  const context = appContext();
  const [search, setSearch] = useState<string>("");
  const [saves, setSaves] = useState<ISaveItem[]>([]);

  if (!context.user) {
    return <Navigate to={routePaths.HOME_PAGE} />;
  }

  const searchTextHandler = (text: string) => {
    setSearch(text);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await saveService.fetchSaves(
        `${context.user?.uid}`
      );
      setSaves(response);
    };

    fetchData();
  }, []);

  return (
    <Layout dark={true}>
      <div className="saves-page">
        <div className="left-side">
          <div className="search-box">
            <p>Search saves</p>
            <TextfieldSearch
              placeholder="Search..."
              onChange={searchTextHandler}
            />
          </div>
        </div>
        <div className="right-side"></div>
      </div>
    </Layout>
  );
};

export default Saves;
