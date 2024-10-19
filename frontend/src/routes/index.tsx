import { RouteObject, createBrowserRouter } from "react-router-dom";

import { IndexRoute } from "./home";

import ErrorBoundary from "@/components/ErrorBoundary";
import { NavbarLayout } from "../components/NavbarLayout";
import Login from "./login";
import QuestionRoute from "./question";
import Signup from "./signup";

export const routes: RouteObject[] = [
  {
    index: true,
    Component: IndexRoute,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "question/:questionId",
    Component: QuestionRoute,
  },
];

export const routeConfig: RouteObject[] = [
  {
    id: "root",
    path: "/",
    Component: NavbarLayout,
    errorElement: <ErrorBoundary />,
    children: routes,
  },
];

export const router = createBrowserRouter(routeConfig);
