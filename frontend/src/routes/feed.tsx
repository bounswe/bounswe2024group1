import { useState } from "react";
import { Recipe } from "../components/Recipe";
import { FullscreenLoading } from "../components/FullscreenLoading";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetRecipesForEntity } from "../services/api/semanticBrowseComponents";
import { renderError } from "../services/api/semanticBrowseFetcher";

export const Feed = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState<"Following" | "Explore">("Following");
  const { data: feedData, isLoading, error } = useGetRecipesForEntity({
    queryParams: { sort: selectedButton === "Following" ? "topRated" : "recent" },
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
      <h1 className="text-2xl font-bold">
        {feedData?.data?.length
          ? `Found ${feedData.data.length} results`
          : "No recipes found"}
      </h1>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              selectedButton === "Following"
                ? "bg-red-500 text-white"
                : "bg-transparent text-red-400"
            }`}
            onClick={() => setSelectedButton("Following")}
          >
            Following
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              selectedButton === "Explore"
                ? "bg-red-500 text-white"
                : "bg-transparent text-red-400"
            }`}
            onClick={() => setSelectedButton("Explore")}
          >
            Explore
          </button>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => navigate("/filter")}
        >
          <Filter className="h-6 w-6 text-gray-700" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {feedData?.data?.map((recipe) => (
          <Recipe
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>
    </div>
  );
};
