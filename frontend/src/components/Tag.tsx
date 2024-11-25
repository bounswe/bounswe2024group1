import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useMemo } from "react";
// import { flag } from "country-emoji";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const Tag = ({
  tag: { tagId, name, logoImage, description },
}: {
  tag: TagDetails;
}) => {
  const token = useAuthStore().token;

  return (
    <div className="flex flex-col self-stretch justify-self-stretch">
      <div className="-mb-16 w-[70%] self-center">
        <AspectRatio ratio={16 / 9}>
          <img
            src={logoImage}
            alt={`The logo image of ${name}`}
            title={`alt:The logo image of ${name}`}
            className="h-full w-full rounded-2xl object-cover"
          />
        </AspectRatio>
      </div>

      <Card className="flex flex-1 flex-col bg-gray-100 pt-16">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-2">
          <p className="text-sm text-gray-700">{description}</p>
          <div className="flex items-center justify-between">
            {!!token && (
              <Link
                to={`/questions/new?tagId=` + encodeURIComponent(tagId || "")}
              >
                <Plus className="h-4 w-4" />
              </Link>
            )}
            <Link
              to={`/tag/${tagId}`}
              className="text-sm font-medium text-blue-500 hover:underline"
            >
              See all questions →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
