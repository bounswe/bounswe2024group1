import ErrorBoundary from "@/components/ErrorBoundary";
import { NavbarLayout } from "@/components/NavbarLayout";
import { signout } from "@/services/auth";
import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";
import { IndexRoute } from "./home";
import Login from "./login";
import QuestionRoute from "./question";
import { Search } from "./search";
import Signup from "./signup";
import TagPage from "./tag";

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
    path: "/logout",
    async action() {
      await signout();
      return redirect("/");
    },
  },
  {
    path: "question/:questionId",
    Component: QuestionRoute,
  },
  {
    path: "/search",
    Component: Search,
  },
  {
    path: "tag/:tagId",
    Component: TagPage,
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
