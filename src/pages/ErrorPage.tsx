import React from "react";
import "@styles/pages/error.css";
import { Link } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";

const ErrorPage: React.FC = () => {
  return (
    <div className="error-page">
      <h1>
        Error 404 page not found! <i className="fa-solid fa-face-sad-tear" />
      </h1>
      <p>
        Please click <Link to={routePaths.HOME_PAGE}>here</Link> to return into
        the home page
      </p>
    </div>
  );
};

export default ErrorPage;
