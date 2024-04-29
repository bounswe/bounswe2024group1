import { RouteObject } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import { IndexRoute } from "./home";

export const routes: RouteObject[] = [
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    index: true,
    Component: IndexRoute,
  },
];
