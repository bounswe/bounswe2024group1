import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Dish } from "../components/Dish";
import { searchDishes } from "../services/search";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const params = new URL(request.url).searchParams;
  return searchDishes(params.get("q") || "");
};

export const Search = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof searchDishes>>;

  return (
    <div className="container flex flex-col gap-2 py-8">
      <h1 className="text-2xl font-bold ">Found {data.length} results</h1>
      <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((dish) => (
          <Dish
            key={dish.id}
            dish={{
              name: dish.name,
              description: dish.description,
              countries: dish.countries,
              image: dish.image,
            }}
          />
        ))}
      </div>
    </div>
  );
};
