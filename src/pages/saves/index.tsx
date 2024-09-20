import React from "react";
import "@styles/pages/saves/saves.css";
import Layout from "@/components/layout";
import { appContext } from "@/context";
import { Navigate } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";

const Saves: React.FC = () => {
  const context = appContext();

  if (!context.user) {
    <Navigate to={routePaths.HOME_PAGE} />;
  }
  return (
    <Layout>
      <div className="saves-page">index</div>
    </Layout>
  );
};

export default Saves;
