import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import { IndexRoute } from "./home";
import { signout } from "../services/auth";
import { Search } from "./search";
import { Feed } from "./feed";
import { NavbarLayout } from "../components/NavbarLayout";
import Profile from "./profile";
import RecipePage from "./recipe";
import { Bookmarks } from "./bookmarks";
import CreateRecipePage from "./create-recipe";
import DishPage from "./dish";

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
    path: "/dishes/:dishId",
    Component: DishPage,
  },
  {
    path: "/recipes/:recipeId",
    Component: RecipePage,
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
    path: "/users/:userId",
    Component: Profile,
  },
  {
    path: "/logout",
    async action() {
      await signout();
      return redirect("/");
    },
  },
  {
    path: "/recipes/new",
    Component: CreateRecipePage,
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
