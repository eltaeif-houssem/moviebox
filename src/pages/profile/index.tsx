import React from "react";
import Layout from "@components/layout";
import { appContext } from "@context/index";
import { Navigate } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";
import avatar from "@assets/avatar2.png";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import "@styles/pages/profile/profile.css";

const Profile: React.FC = () => {
  const context = appContext();
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
  });

  console.log(context.user);

  if (!context.user) {
    return <Navigate to={routePaths.HOME_PAGE} />;
  }
  return (
    <Layout dark={true}>
      <div className="profile-page">
        <div>
          <img src={avatar} alt="profile-avatar" />
          <h3>{randomName}</h3>
          <div>
            <p>
              <span>Email:</span> {context.user.email}
            </p>
            <p>
              <span>Creation date:</span> {context.user.metadata.creationTime}
            </p>
            <p>
              <span>Last signin:</span> {context.user.metadata.lastSignInTime}
            </p>
          </div>

          <button>Delete Account</button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
