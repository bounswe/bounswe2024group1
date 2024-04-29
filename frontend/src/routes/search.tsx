import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Dish } from "../components/Dish";
import { SearchBar } from "../components/Search";
import { searchDishes } from "../services/search";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const params = new URL(request.url).searchParams;
  return searchDishes(params.get("q") || "");
};

export const Search = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof searchDishes>>;

  return (
    <div className="container flex flex-col gap-2 py-8">
      <Link to="/" className="text-blue-500">
        Go Home
      </Link>
      <SearchBar />
      <div className="mt-8 grid grid-cols-4 gap-8">
        {data.map((dish) => (
          <Dish
            key={dish.name}
            dish={{
              name: dish.name,
              description: dish.country,
              image: dish.image,
            }}
          />
        ))}
      </div>
    </div>
  );
};
