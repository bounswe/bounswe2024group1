import { useSearchParams } from "react-router-dom";
import { Dish } from "../components/Dish";
import {
  SearchDishesResponse,
  useSearchDishes,
} from "../services/api/semanticBrowseComponents";
import { renderError } from "../services/api/semanticBrowseFetcher";
import { FullscreenLoading } from "../components/FullscreenLoading";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";

export const Search = () => {
  const [params] = useSearchParams();
  const {
    data: searchResult,
    isLoading,
    error,
  } = useSearchDishes<SearchDishesResponse>({
    queryParams: { q: params.get("q") ?? "" },
  });

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }
  if (error) {
    return (
      <div className="container flex flex-col gap-2 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{renderError(error)}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container flex flex-col gap-2 py-8">
      <h1 className="text-2xl font-bold ">
        {searchResult?.data?.length
          ? `Found ${searchResult.data.length} results`
          : "No dishes found"}
      </h1>
      {!searchResult?.data?.length && (
        <p>Try searching for "japan", or "sausage"</p>
      )}
      <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {searchResult?.data?.map((dish) => (
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
