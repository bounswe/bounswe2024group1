import { RouteObject, redirect } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import { IndexRoute } from "./home";
import { signout } from "../services/auth";
import { Search } from "./search";
import { NavbarLayout } from "../components/NavbarLayout";
import Profile from "./profile";

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
    path: "/search",
    Component: Search,
  },
  {
    index: true,
    Component: IndexRoute,
  },
  {
    path: "/profile",
    Component: Profile,
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
