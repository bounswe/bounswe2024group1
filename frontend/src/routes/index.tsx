import { RouteObject, redirect } from "react-router-dom";
import Login, { action as loginAction } from "./login";
import Signup, { action as signupAction } from "./signup";
import { IndexRoute } from "./home";
import { signout } from "../services/auth";
import { Search } from "./search";
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
