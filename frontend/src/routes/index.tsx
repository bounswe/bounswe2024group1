import CreateTagPage from "@/components/CreateTagPage"; // Import the new CreateTagPage
import ErrorBoundary from "@/components/ErrorBoundary";
import { NavbarLayout } from "@/components/NavbarLayout";
import TagsPage from "@/components/Tags";
import { signout } from "@/services/auth";
import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";
import QuestionCreationPage from "./create-question";
import { IndexRoute } from "./home";
import Login from "./login";
import Profile from "./profile";
import QuestionRoute from "./question";
import { Search } from "./search";
import Signup from "./signup";
import TagPage from "./tag";
import { BookmarkedQuestions } from "@/routes/bookmarks";

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
    path: "/bookmarks",
    Component: BookmarkedQuestions,
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
    path: "/users/:userId",
    Component: Profile,
  },
  {
    path: "/search",
    Component: Search,
  },
  {
    path: "tag/:tagId",
    Component: TagPage,
  },
  {
    path: "/questions/new",
    Component: QuestionCreationPage, // Ensure this route is defined
  },
  {
    path: "/tags",
    Component: TagsPage,
  },
  {
    path: "/tags/new",
    Component: CreateTagPage,
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
