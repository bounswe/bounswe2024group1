import React from 'react';
import { Recipe } from "../components/Recipe";
import { FullscreenLoading } from "../components/FullscreenLoading";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useGetMe } from "../services/api/semanticBrowseComponents";
import { renderError } from "../services/api/semanticBrowseFetcher";

// Inside the Bookmarks component
export const Bookmarks = () => {
  const { data: bookmarksData, isLoading, error } = useGetMe({});

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
      <div className="mt-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-center">Bookmarks</h1>
        <p>{bookmarksData?.data?.bookmarks && (
            <span className="text-gray-500"> {bookmarksData.data?.bookmarks.length} recipes</span>
            )}</p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {bookmarksData?.data?.bookmarks?.map((recipe) => (
          <Recipe
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>
    </div>
  );
};