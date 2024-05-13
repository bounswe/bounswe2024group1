import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMemo } from "react";
import LinkIcon from "@/assets/Icon/General/Link.svg";
import BookmarkIcon from "@/assets/Icon/General/Bookmark.svg";
import TimeIcon from "@/assets/Icon/General/Clock.svg";
import StarIcon from "@/assets/Icon/General/Star.svg";
import FoodIcon from "@/assets/Icon/General/Food.svg";
import { DishSummary, UserSummary } from "@/services/api/semanticBrowseSchemas";

interface Recipe {
  name: string;
  images: string[];
  avgRating?: number;
  ratingsCount: number;
  cookTime: number;
  dish: DishSummary;
  author: UserSummary;
}

export const Recipe = ({
  recipe: { name, images, avgRating, ratingsCount, cookTime, dish, author },
}: {
  recipe: Recipe;
}) => {
  return (
    <div className="flex flex-col self-stretch justify-self-stretch">
      <div className="-mb-16 w-[70%] self-center">
        <AspectRatio ratio={16 / 9}>
          <img src={images[0]} className="h-full w-full rounded-2xl object-cover" alt={name} />
        </AspectRatio>
      </div>

      <Card className="flex flex-1 flex-col bg-gray-100 pt-16">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{name}</CardTitle>
            <div className="flex gap-2">
              <Button className="bg-transparent" size="icon" variant="secondary">
                <img src={LinkIcon} alt="Link icon" />
              </Button>
              <Button className="bg-transparent" size="icon" variant="secondary">
                <img src={BookmarkIcon} alt="Bookmark icon" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-2">
          <div className="flex items-center">
            <img src={StarIcon} alt="avgRating icon" className="w-4 h-4 mr-2" />
            <p className="text-sm text-gray-500">{avgRating} ({ratingsCount} Reviews)</p>
          </div>
          <div className="flex items-center">
            <img src={TimeIcon} alt="Time icon" className="w-4 h-4 mr-2" />
            <p className="text-sm text-gray-500">{cookTime}</p>
          </div>
          {dish && (
            <div className="flex items-center">
              <img src={FoodIcon} alt="Food icon" className="w-4 h-4 mr-2" />
              <p className="text-sm text-gray-500">{dish.name}</p>
            </div>
          )}
          {author && author.profilePicture && (
            <div className="flex items-center">
              <img src={author.profilePicture} alt="Author" className="w-4 h-4 mr-2" />
            </div>
          )}
          <div className="self-end">
            <a className="cursor-not-allowed text-sm font-medium text-blue-500 hover:underline">
              Go to recipe →
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
