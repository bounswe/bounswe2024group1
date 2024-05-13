import { SearchBar } from "../components/SearchBar";
import { Recipe } from "../components/Recipe";

export function IndexRoute() {
  return (
    <>
      <div className="container flex flex-col gap-2 py-8">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Semantic Browse</h1>
        <SearchBar />
      </div>
    </>
  );
}
