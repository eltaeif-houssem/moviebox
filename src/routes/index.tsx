import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Signin = lazy(() => import("@pages/auth/Signin"));
const Signup = lazy(() => import("@pages/auth/Signup"));
const ForgetPassword = lazy(() => import("@pages/auth/ForgetPassword"));

export const router: RouteObject[] = [
  {
    path: "/auth/signin",
    element: <Signin />,
  },

  {
    path: "/auth/signup",
    element: <Signup />,
  },

  {
    path: "/auth/forget-password",
    element: <ForgetPassword />,
  },
];

export default router;
