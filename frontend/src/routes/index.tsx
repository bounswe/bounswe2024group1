import { RouteObject, createBrowserRouter } from "react-router-dom";

import { IndexRoute } from "./home";

import ErrorBoundary from "@/components/ErrorBoundary";
import { NavbarLayout } from "../components/NavbarLayout";
import QuestionRoute from "./question";

export const routes: RouteObject[] = [
  {
    index: true,
    Component: IndexRoute,
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
