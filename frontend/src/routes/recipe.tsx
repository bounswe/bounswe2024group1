import { Button } from "@/components/ui/button";
import Bookmark from "@/assets/Icon/General/Bookmark.svg?react";
import Link from "@/assets/Icon/General/Link.svg?react";
import RatingInput from "@/components/RatingInput";
import Serving from "@/assets/Icon/General/Serving.svg?react";
import Clock from "@/assets/Icon/General/Clock.svg?react";
import Allergies from "@/assets/Icon/General/Allergies.svg?react";
import Food from "@/assets/Icon/General/Food.svg?react";
import MeatDish from "@/assets/Icon/Food/MeatDish.svg?react";
import { ChevronRight, StarIcon } from "lucide-react";
import {
  useGetRecipeById,
  useRateRecipe,
} from "@/services/api/semanticBrowseComponents";
import { useParams } from "react-router-dom";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";

export default function RecipePage() {
  const { recipeId } = useParams();

  const { data, isLoading, error, refetch } = useGetRecipeById({
    pathParams: { recipeId: recipeId ? Number(recipeId) : -1 },
    queryParams: {
      enabled: !!recipeId,
    },
  });

  const [optimisticRating, setOptimisticRating] = useState<number | null>(null);

  const { mutateAsync } = useRateRecipe({
    onMutate: async (rating) => {
      setOptimisticRating(rating.body?.rating || 0);
    },
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticRating(null);
      });
    },
    onError: () => {
      setOptimisticRating(null);
    },
  });

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }
  if (error) {
    return <ErrorAlert error={error} />;
  }

  const { data: recipe } = data! || {};
  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : [];

  return (
    <div className="container flex flex-col gap-4 py-16">
      <div className="flex items-center justify-between">
        <h1>{recipe.name}</h1>
        <div className="flex gap-4">
          <Button size="icon">
            <Link className="h-5 w-5" />
          </Button>
          <Button>
            Bookmark
            <Bookmark className="ml-2 h-5 w-5 fill-primary" />
          </Button>
        </div>
      </div>
      <img
        src={recipe?.images?.[0] || "https://placehold.co/400x300"}
        alt={recipe.name}
        className="h-48 w-full rounded-3xl object-cover"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={recipe.author.profilePicture}
            alt={recipe.author.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="font-bold">{recipe.author.name}</span>
        </div>
        <Button>Follow</Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <StarIcon className="h-4 w-4 fill-black" />
          <span className="font-bold">{recipe.avgRating || "-"}</span>
        </div>
        <span className="font-light text-gray-500">
          ({recipe.ratingsCount} ratings)
        </span>
        <RatingInput
          currentRating={optimisticRating ?? recipe.selfRating ?? 0}
          setRating={(rating) => {
            mutateAsync({
              pathParams: { recipeId: recipe.id },
              body: { rating },
            });
          }}
        />
      </div>
      <div className="flex items-center gap-4">
        <Bookmark className="h-4 w-4 fill-white" />
        <span className="font-bold">512</span>
        <span className="flex cursor-pointer items-center text-sm text-gray-600">
          See bookmarkers <ChevronRight className="h-4 w-4" />
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 py-2">
        <span className="flex items-center gap-4 font-bold">
          <MeatDish className="h-6 w-6" />
          Meat
        </span>
        <span className="flex items-center gap-4 font-bold">
          <Serving className="h-6 w-6" />
          {recipe.servingSize} servings
        </span>
        <span className="flex items-center gap-4 font-bold">
          <Food className="h-6 w-6" />
          {recipe.dish.name}
        </span>
        <span className="flex items-center gap-4 font-bold">
          <Clock className="h-6 w-6" />
          {recipe.cookTime} min
        </span>
        {recipe.dish.countries && (
          <span className="flex items-center gap-4 font-bold">
            <Clock className="h-6 w-6" />
            {recipe.dish.countries}
          </span>
        )}
        <span className="flex items-center gap-4 font-bold">
          <Allergies className="h-6 w-6" />
          {recipe.allergens?.join(", ") || "None"}
        </span>
      </div>

      <span className="">{recipe.description}</span>

      <div className="flex flex-col gap-4 py-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold">Steps</h4>
          <span className="text-sm text-gray-400">
            {instructions.length} steps
          </span>
        </div>
        {instructions.map((step, index) => (
          <div
            key={index}
            className="flex gap-2 rounded-lg bg-neutral-150 p-4 px-6"
          >
            <span className="font-bold">{index + 1}.</span>
            <span key={index} className="mb-2 block">
              {step}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 py-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold">Ingredients</h4>
          <span className="text-sm text-gray-400">
            {recipe.ingredients.length} steps
          </span>
        </div>
        {recipe.ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg bg-neutral-150 px-4 py-4"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-neutral-50 text-xl">
                {/* {ingredient.icon} */}
              </span>
              <span className="font-bold">{ingredient.name}</span>
            </div>
            <span className="text-neutral-400">100g</span>
          </div>
        ))}
      </div>

      <div className="space-y-2"></div>
    </div>
  );
}