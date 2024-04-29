import { RouteObject } from "react-router-dom";
import Login from "./login";
import { IndexRoute } from "./home";

export const routes: RouteObject[] = [
  {
    path: "/login",
    Component: Login,
  },
  {
    index: true,
    Component: IndexRoute,
  },
];
