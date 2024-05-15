import { RouteObject, redirect } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import { IndexRoute } from "./home";
import { signout } from "../services/auth";
import { Search } from "./search";
import { Feed } from "./feed";
import { NavbarLayout } from "../components/NavbarLayout";
import { Bookmarks } from "./bookmarks";

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
    path: "/feed",
    Component: Feed,
  },
  {
    path: "/bookmarks",
    Component: Bookmarks,
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
