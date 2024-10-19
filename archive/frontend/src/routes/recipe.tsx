import Allergies from "@/assets/Icon/General/Allergies.svg?react";
import Clock from "@/assets/Icon/General/Clock.svg?react";
import Food from "@/assets/Icon/General/Food.svg?react";
import LinkIcon from "@/assets/Icon/General/Link.svg?react";
import Serving from "@/assets/Icon/General/Serving.svg?react";
import RatingInput from "@/components/RatingInput";
import { Button } from "@/components/ui/button";
// import MeatDish from "@/assets/Icon/Food/MeatDish.svg?react";
import BookmarkButton from "@/components/BookmarkButton";
import { Bookmarkers } from "@/components/Bookmarkers";
import { AddComment } from "@/components/Comment";
import { Comments } from "@/components/CommentSection";
import ErrorAlert from "@/components/ErrorAlert";
import FollowButton from "@/components/FollowButton";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteRecipeById,
  useGetRecipeById,
  useRateRecipe,
} from "@/services/api/semanticBrowseComponents";
import { UserSummary } from "@/services/api/semanticBrowseSchemas";
import useAuthStore from "@/services/auth";
import { Flag, StarIcon, Trash } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function RecipePage() {
  const { recipeId } = useParams();

  const { data, isLoading, error, refetch } = useGetRecipeById(
    {
      pathParams: { recipeId: recipeId ? Number(recipeId) : -1 },
    },
    {
      enabled: !!recipeId,
    },
  );

  const { mutateAsync: deleteRecipe } = useDeleteRecipeById();
  const { selfProfile, token } = useAuthStore();

  const [optimisticRating, setOptimisticRating] = useState<number | null>(null);

  const { mutateAsync } = useRateRecipe({
    onMutate: async (rating: { body: { rating: number } }) => {
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

  if (!recipe) {
    return (
      <ErrorAlert
        error={{
          status: 404,
          payload: { status: 404, message: "Recipe not found" },
        }}
      />
    );
  }
  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : (recipe.instructions as string).split("<br>");

  return (
    <div className="container flex flex-col gap-4 py-16">
      <div className="flex items-center justify-between">
        <h1>{recipe.name}</h1>
        <div className="flex gap-4">
          <Button
            size="icon"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast({
                variant: "default",
                title: "Link copied",
                description:
                  "The link to this recipe has been copied to your clipboard",
              });
            }}
          >
            <LinkIcon className="h-5 w-5" />
          </Button>
          {!!token && <BookmarkButton recipe={recipe} />}
          {selfProfile?.id === recipe.author.id && (
            <Button
              onClick={() =>
                deleteRecipe({ pathParams: { recipeId: recipe.id } })
              }
              size="icon"
              variant="destructive"
            >
              <Trash className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      <img
        src={recipe?.images?.[0] || "https://placehold.co/400x300"}
        alt={recipe.name}
        className="h-48 w-full rounded-3xl object-cover"
      />

      <div className="flex items-center justify-between">
        <Link
          to={`/users/${recipe.author.id}`}
          className="flex items-center gap-4"
        >
          <img
            src={recipe.author.profilePicture || "https://placehold.co/640x640"}
            alt={recipe.author.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="font-bold">{recipe.author.name}</span>
        </Link>
        {token && selfProfile?.id !== recipe.author.id && (
          <FollowButton profile={recipe.author} />
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <StarIcon className="h-4 w-4 fill-black" />
          <span className="font-bold">{recipe.avgRating || "-"}</span>
        </div>
        <span className="font-light text-gray-500">
          ({recipe.ratingsCount} ratings)
        </span>
        {!!token && (
          <RatingInput
            currentRating={optimisticRating ?? recipe.selfRating ?? 0}
            setRating={(rating) => {
              mutateAsync({
                pathParams: { recipeId: recipe.id },
                body: { rating },
              });
            }}
          />
        )}
      </div>
      {!!token && <Bookmarkers recipeId={recipe.id} />}

      <div className="grid grid-cols-2 gap-2 py-2">
        {/* <span className="flex items-center gap-4 font-bold">
          <MeatDish className="h-6 w-6" />
          Meat
        </span> */}
        <span className="flex items-center gap-4 font-bold">
          <Serving className="h-6 w-6" />
          {recipe.servingSize} servings
        </span>
        {recipe.dish && (
          <Link
            to={`/dishes/${recipe.dish.id}`}
            className="flex items-center gap-4 font-bold"
          >
            <Food className="h-6 w-6" />
            {recipe.dish?.name}
          </Link>
        )}
        <span className="flex items-center gap-4 font-bold">
          <Clock className="h-6 w-6" />
          {recipe.cookTime} min
        </span>
        {recipe.dish?.countries && (
          <span className="flex items-center gap-4 font-bold">
            <Flag className="h-6 w-6" />
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
            <span className="text-neutral-400">{ingredient.amount}</span>
          </div>
        ))}
      </div>
      <h4 className="font-bold">Comments</h4>
      {selfProfile && recipeId && (
        <AddComment
          recipeId={Number(recipeId)}
          user={selfProfile as unknown as UserSummary}
        />
      )}
      {recipeId && <Comments recipeId={Number(recipeId)} />}
    </div>
  );
}
