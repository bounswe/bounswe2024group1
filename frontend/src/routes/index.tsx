import { RouteObject, createBrowserRouter } from "react-router-dom";

import { IndexRoute } from "./home";

import { NavbarLayout } from "../components/NavbarLayout";

export const routes: RouteObject[] = [
  {
    index: true,
    Component: IndexRoute,
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
