import React from "react";
import "@styles/pages/profile/profile.css";
import Layout from "@/components/layout";
import { appContext } from "@/context";
import { Navigate } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";

const Profile: React.FC = () => {
  const context = appContext();

  if (!context.user) {
    return <Navigate to={routePaths.HOME_PAGE} />;
  }
  return (
    <Layout>
      <div className="profile-page">index</div>
    </Layout>
  );
};

export default Profile;
