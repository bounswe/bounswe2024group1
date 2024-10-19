import { RouteObject, createBrowserRouter } from "react-router-dom";

import { IndexRoute } from "./home";

import { NavbarLayout } from "../components/NavbarLayout";
import Signup from "./signup";
import Login from "./login";

export const routes: RouteObject[] = [
  {
    index: true,
    Component: IndexRoute,
  },
  {
    path: "/signup",
    Component:Signup, 
  },  {
    path: "/login",
    Component:Login, 
  },
];

export const routeConfig: RouteObject[] = [
  {
    id: "root",
    path: "/",
    Component: NavbarLayout,
    children: routes,
  },
];

export const router = createBrowserRouter(routeConfig);
