import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Dish } from "../components/Dish";
import { fetchSearchDishes } from "../services/api/semanticBrowseComponents";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const params = new URL(request.url).searchParams;
  return fetchSearchDishes({
    queryParams: { q: params.get("q") ?? undefined },
  });
};

export const Search = () => {
  const { data: searchResult } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  return (
    <div className="container flex flex-col gap-2 py-8">
      <h1 className="text-2xl font-bold ">
        Found {searchResult.length} results
      </h1>
      <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {searchResult.map((dish) => (
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
