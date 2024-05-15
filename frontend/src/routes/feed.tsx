import { Recipe } from "../components/Recipe";
import { FullscreenLoading } from "../components/FullscreenLoading";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useGetRecipesForEntity } from "../services/api/semanticBrowseComponents";
import { renderError } from "../services/api/semanticBrowseFetcher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchFilterPopover from "@/components/SearchFilterPopover";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export const Feed = () => {
  const { data, isLoading, error } = useGetRecipesForEntity({
    queryParams: {
      sort: "topRated",
    },
  });
  const [params] = useSearchParams();
  const [foodType, setFoodType] = useState(params.get("foodType") || "");
  const feedData = { data };

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {feedData?.data?.length
            ? `Found ${feedData.data.length} results`
            : "No recipes found"}
        </h1>
        <SearchFilterPopover foodType={foodType} setFoodType={setFoodType} />
      </div>
      <Tabs defaultValue="explore">
        <TabsList>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
        </TabsList>
        <TabsContent value="following">
          <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {feedData?.data?.map((recipe) => (
              <Recipe key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="explore">
          <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {feedData?.data?.map((recipe) => (
              <Recipe key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
