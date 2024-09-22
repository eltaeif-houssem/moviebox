import React from "react";
import Layout from "@components/layout";
import { appContext } from "@context/index";
import { Navigate } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";
import "@styles/pages/saves/saves.css";
import TextfieldSearch from "@/components/textfields/TextfieldSearch";

const Saves: React.FC = () => {
  const context = appContext();

  if (!context.user) {
    return <Navigate to={routePaths.HOME_PAGE} />;
  }

  return (
    <Layout dark={true}>
      <div className="saves-page">
        <div className="left-side">
          <div>
            <p>Search saves</p>
            <TextfieldSearch
              placeholder="Search..."
              value=""
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="right-side"></div>
      </div>
    </Layout>
  );
};

export default Saves;
