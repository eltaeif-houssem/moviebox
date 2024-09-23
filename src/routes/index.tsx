import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";

// import auth pages
const Signin = lazy(() => import("@pages/auth/Signin"));
const Signup = lazy(() => import("@pages/auth/Signup"));
const ForgetPassword = lazy(() => import("@pages/auth/ForgetPassword"));

// import movie pages
const Movies = lazy(() => import("@pages/movie"));
const MovieDetails = lazy(() => import("@pages/movie/MovieDetails"));

// import tv pages
const Tvs = lazy(() => import("@pages/tv"));
const TvDetails = lazy(() => import("@pages/tv/TvDetails"));

// import other pages
const HomePage = lazy(() => import("@pages/home"));
const Profile = lazy(() => import("@pages/profile"));
const Saves = lazy(() => import("@pages/saves"));
const ErrorPage = lazy(() => import("@pages/ErrorPage"));

// define router pages
export const router: RouteObject[] = [
  {
    path: routePaths.HOME_PAGE,
    element: <HomePage />,
  },

  {
    path: routePaths.AUTH_SIGNIN_PAGE,
    element: <Signin />,
  },
  {
    path: routePaths.AUTH_SIGNUP_PAGE,
    element: <Signup />,
  },
  {
    path: routePaths.AUTH_FORGET_PASSWORD_PAGE,
    element: <ForgetPassword />,
  },

  {
    path: routePaths.PROFILE_PAGE,
    element: <Profile />,
  },

  {
    path: routePaths.SAVES_PAGE,
    element: <Saves />,
  },

  {
    path: routePaths.MOVIES_PAGE,
    element: <Movies />,
  },

  {
    path: routePaths.MOVIE_DETAILS_PAGE,
    element: <MovieDetails />,
  },

  {
    path: routePaths.TVS_PAGE,
    element: <Tvs />,
  },

  {
    path: routePaths.TV_DETAILS_PAGE,
    element: <TvDetails />,
  },

  {
    path: routePaths.ERROR_PAGE,
    element: <ErrorPage />,
  },
];

export default router;
