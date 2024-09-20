import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";

// import auth pages
const Signin = lazy(() => import("@pages/auth/Signin"));
const Signup = lazy(() => import("@pages/auth/Signup"));
const ForgetPassword = lazy(() => import("@pages/auth/ForgetPassword"));

// import other pages
const HomePage = lazy(() => import("@pages/home"));

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
];

export default router;
