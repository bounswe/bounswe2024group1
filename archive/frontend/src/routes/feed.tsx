import { Recipe } from "../components/Recipe";
import { FullscreenLoading } from "../components/FullscreenLoading";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useGetFeed } from "../services/api/semanticBrowseComponents";
import { renderError } from "../services/api/semanticBrowseFetcher";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import useAuthStore from "@/services/auth";

export const Feed = () => {
  const isAuthenticated = useAuthStore().token !== null;
  const [params, setParams] = useSearchParams();
  const feedType = ["explore", "following"].includes(params.get("type") ?? "")
    ? (params.get("type") as "explore" | "following")
    : "explore";
  // const foodType = params.get("foodType") || "";
  // const setFoodType = (val: string) => setParams({ ...params, foodType: val });

  const {
    data: feedData,
    isLoading,
    error,
  } = useGetFeed({
    queryParams: { type: isAuthenticated ? feedType : "explore" },
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
    <div className="flex flex-col gap-2 py-8">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">
          {isAuthenticated ? "Your Feed" : "Explore Recipes"}
        </h3>
        {
          // TODO: backend does not support this feature yet.
          // <SearchFilterPopover foodType={foodType} setFoodType={setFoodType} />
        }
      </div>
      {isAuthenticated && (
        <Tabs
          defaultValue={feedType}
          onValueChange={(val) => setParams((prev) => ({ ...prev, type: val }))}
        >
          <TabsList>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {feedData?.data?.length === 0 && (
          <Alert variant="default">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No recipes found</AlertTitle>
            <AlertDescription>
              {isAuthenticated
                ? "Follow some users to see their recipes here."
                : "No recipes found. Try searching for something else."}
            </AlertDescription>
          </Alert>
        )}
        {feedData?.data?.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
