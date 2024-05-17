import { useMemo } from "react";
import { flag } from "country-emoji";
import { Link, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
// import MeatDish from "@/assets/Icon/Food/MeatDish.svg?react";
import {
  useGetDishById,
  useGetRecipesForEntity,
} from "@/services/api/semanticBrowseComponents";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import ErrorAlert from "@/components/ErrorAlert";
import { Recipe } from "@/components/Recipe";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/services/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DishPage() {
  const { dishId } = useParams();

  const { data, isLoading, error } = useGetDishById(
    {
      pathParams: { dishId: dishId! },
    },
    {
      enabled: !!dishId,
    },
  );
  const { data: recipesRecent } = useGetRecipesForEntity({
    queryParams: {
      dishId: dishId!,
      sort: "recent",
    },
  });
  const { data: recipesTop } = useGetRecipesForEntity({
    queryParams: {
      dishId: dishId!,
      sort: "topRated",
    },
  });

  const dish = data?.data;
  const { countries } = dish || {};

  const countryEmojis = useMemo(() => {
    return (countries || "").split(", ").map(flag).join(" ");
  }, [countries]);
  const token = useAuthStore((s) => s.token);

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!dish) {
    return (
      <ErrorAlert
        error={{
          status: 404,
          payload: { status: 404, message: "Dish not found." },
        }}
      />
    );
  }

  return (
    <div className="container flex flex-col gap-4 self-stretch justify-self-stretch py-16">
      <div className="flex items-center justify-between">
        <h1>{dish.name}</h1>
      </div>
      <img
        src={dish?.image || "https://placehold.co/400x300"}
        alt={dish.name}
        className="h-48 w-full rounded-3xl object-cover lg:h-96"
      />
      <span className="">{dish.description}</span>
      <span>{countryEmojis}</span>
      <div className="mt-4 flex flex-col gap-4 px-4 py-2">
        <div className="flex items-center gap-4">
          <h3>Recipes</h3>
          {!!token && (
            <Button
              asChild
              size="icon"
              className="rounded-full bg-red-500 text-white"
            >
              <Link to={`/recipes/new?dishId=${dish.id}`}>
                <Plus />
              </Link>
            </Button>
          )}
        </div>
        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <TabsContent value="top-rated">
            <div className="grid grid-cols-3 gap-4">
              {recipesTop?.data?.map((recipe) => (
                <Recipe key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <div className="grid grid-cols-3 gap-4">
              {recipesRecent?.data?.map((recipe) => (
                <Recipe key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
