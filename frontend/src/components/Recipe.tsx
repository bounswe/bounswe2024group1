import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import LinkIcon from "@/assets/Icon/General/Link.svg?react";
import TimeIcon from "@/assets/Icon/General/Clock.svg";
import StarIcon from "@/assets/Icon/General/Star.svg";
import FoodIcon from "@/assets/Icon/General/Food.svg";
import { RecipeSummary } from "@/services/api/semanticBrowseSchemas";
import { Link } from "react-router-dom";
import { toast } from "./ui/use-toast";
import BookmarkButton from "./BookmarkButton";

export const Recipe = ({
  recipe: {
    id,
    name,
    images,
    avgRating,
    ratingsCount,
    cookTime,
    dish,
    author,
    selfBookmarked,
  },
}: {
  recipe: RecipeSummary;
}) => {
  return (
    <div className="flex flex-col self-stretch justify-self-stretch">
      <div className="-mb-16 w-[70%] self-center">
        <AspectRatio ratio={16 / 9}>
          <img
            src={images?.[0] || "https://placehold.co/640x640"}
            className="h-full w-full rounded-2xl object-cover"
            alt={name}
          />
        </AspectRatio>
      </div>

      <Card className="flex flex-1 flex-col bg-gray-100 pt-16">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{name}</CardTitle>
            <div className="flex gap-2">
              <Button
                className="bg-transparent"
                size="icon"
                variant="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.origin + `/recipes/${id}`,
                  );
                  toast({
                    variant: "default",
                    title: "Link copied",
                    description:
                      "The link to this recipe has been copied to your clipboard",
                  });
                }}
              >
                <LinkIcon aria-label="Link" />
              </Button>
              <BookmarkButton asIcon recipe={{ id, selfBookmarked }} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-2">
          <div className="flex items-center gap-2">
            <img src={StarIcon} alt="avgRating icon" className="h-6 w-6" />
            <span className="text-sm">
              {avgRating} ({ratingsCount || 0} Reviews)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src={TimeIcon} alt="Time icon" className="h-6 w-6" />
            <span className="text-sm">{cookTime}</span>
          </div>
          {dish && (
            <div className="flex items-center gap-2">
              <img src={FoodIcon} alt="Food icon" className="h-6 w-6" />
              <span className="text-sm">{dish.name}</span>
            </div>
          )}
          {author && author.profilePicture && (
            <div className="flex items-center">
              <img
                src={author.profilePicture}
                alt="Author"
                className="mr-2 h-4 w-4"
              />
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <Link to={`/users/${author.id}`} className="cursor-pointer ">
              <img
                src={author.profilePicture || "https://placehold.co/640x640"}
                alt={author.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            </Link>
            <Link
              to={`/recipes/${id}`}
              className="cursor-pointer text-sm font-medium text-gray-600 hover:underline"
            >
              Go to recipe →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
