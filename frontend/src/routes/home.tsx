import { Button } from "@/components/ui/button";
import { Link, useFetcher } from "react-router-dom";
import useAuthStore from "@/services/auth";
import { SearchBar } from "../components/Search";

export function IndexRoute() {
  const fetcher = useFetcher();
  const isAuthenticated = !!useAuthStore().token;

  return (
    <>
      <div className="container flex flex-col gap-2 py-8">
        {!isAuthenticated && <Link to="/login">Login</Link>}
        <h1 className="mb-4 text-4xl font-bold">Welcome to Semantic Browse</h1>
        <SearchBar />
        {isAuthenticated && (
          <fetcher.Form method="POST" action="/logout">
            <Button type="submit">Log out</Button>
          </fetcher.Form>
        )}
      </div>
    </>
  );
}
