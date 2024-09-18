import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import * as routePaths from "@constants/routePaths.contant";

// import auth pages
const Signin = lazy(() => import("@pages/auth/Signin"));
const Signup = lazy(() => import("@pages/auth/Signup"));
const ForgetPassword = lazy(() => import("@pages/auth/ForgetPassword"));

export const router: RouteObject[] = [
  {
    path: routePaths.AUTH_SIGNIN,
    element: <Signin />,
  },
  {
    path: routePaths.AUTH_SIGNUP,
    element: <Signup />,
  },
  {
    path: routePaths.AUTH_FORGET_PASSWORD,
    element: <ForgetPassword />,
  },
];

export default router;
