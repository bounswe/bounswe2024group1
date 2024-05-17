import { Button } from "./ui/button";
import Bookmark from "@/assets/Icon/General/Bookmark.svg?react";
import { cn } from "@/lib/utils";
import {
  useBookmarkRecipe,
  useGetBookmarkers,
  useGetMe,
  useGetRecipeById,
  useUnbookmarkRecipe,
} from "@/services/api/semanticBrowseComponents";
import { useState } from "react";

export default function BookmarkButton({
  recipe: recipe,
  asIcon = false,
}: {
  recipe: { id?: number; selfBookmarked?: boolean };
  asIcon?: boolean;
}) {
  const { refetch: refetchMe } = useGetMe({});
  const { refetch: refetchBookmarkers } = useGetBookmarkers({
    pathParams: {
      recipeId: recipe.id!,
    },
  });
  const { isLoading, data, error, refetch } = useGetRecipeById(
    {
      pathParams: {
        recipeId: recipe.id!,
      },
    },
    {
      enabled: typeof recipe.selfBookmarked !== "boolean",
    },
  );

  const [optimisticBookmarked, setOptimisticBookmarked] = useState(
    null as boolean | null,
  );

  const { mutateAsync: bookmark } = useBookmarkRecipe({
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticBookmarked(null);
        refetchMe();
        refetchBookmarkers();
      });
    },
    onError: () => {
      setOptimisticBookmarked(null);
    },
  });
  const { mutateAsync: unbookmark } = useUnbookmarkRecipe({
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticBookmarked(null);
        refetchMe();
        refetchBookmarkers();
      });
    },
    onError: () => {
      setOptimisticBookmarked(null);
    },
  });

  const bookmarked = optimisticBookmarked ?? data?.data?.selfBookmarked;

  const variant = bookmarked && !isLoading ? "primary-outline" : "default";

  return (
    <Button
      disabled={!!error || isLoading}
      variant={!asIcon ? variant : "default"}
      size={asIcon ? "icon" : "default"}
      className={cn(
        asIcon && "group bg-transparent",
        asIcon &&
          (variant === "default"
            ? "text-black hover:text-white"
            : "text-primary hover:text-white"),
      )}
      onClick={() => {
        if (bookmarked) {
          unbookmark({
            pathParams: {
              recipeId: recipe.id!,
            },
          });
          setOptimisticBookmarked(false);
        } else {
          bookmark({
            pathParams: {
              recipeId: recipe.id!,
            },
          });
          setOptimisticBookmarked(true);
        }
      }}
    >
      {!asIcon &&
        (isLoading
          ? "Loading..."
          : error
            ? "Error"
            : bookmarked
              ? "Bookmarked"
              : "Bookmark")}
      <Bookmark
        className={cn(
          "h-5 w-5",
          !asIcon && "ml-2",
          !asIcon && (variant === "default" ? "fill-primary" : "fill-white"),
          asIcon &&
            (variant === "default"
              ? "fill-white group-hover:fill-primary"
              : "fill-white group-hover:fill-primary"),
        )}
      />
    </Button>
  );
}
