import { RouteObject, redirect } from "react-router-dom";
import Login, { action as loginAction } from "./login";
import Signup, { action as signupAction } from "./signup";
import { IndexRoute } from "./home";
import { signout } from "../services/auth";
import { Search, loader as searchLoader } from "./search";
import { NavbarLayout } from "../components/NavbarLayout";

export const routes: RouteObject[] = [
  {
    path: "/login",
    Component: Login,
    action: loginAction,
  },
  {
    path: "/signup",
    action: signupAction,
    Component: Signup,
  },
  {
    path: "/search",
    loader: searchLoader,
    Component: Search,
  },
  {
    index: true,
    Component: IndexRoute,
  },
  {
    path: "/logout",
    async action() {
      await signout();
      return redirect("/");
    },
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
