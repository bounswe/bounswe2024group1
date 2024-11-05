import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { useMemo } from "react";
// import { flag } from "country-emoji";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import useAuthStore from "@/services/auth";
import { TagDetails } from "@/services/api/programmingForumSchemas";


export const Tag = ({
  tag: { id, name, photo, description},
}: {
  tag: TagDetails;
}) => {
  const token = useAuthStore().token;

  return (
    <div className="flex flex-col self-stretch justify-self-stretch">
      <div className="-mb-16 w-[70%] self-center">
        <AspectRatio ratio={16 / 9}>
          <img src={photo} className="h-full w-full rounded-2xl object-cover" />
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
              <Link to={`/questions/new?tagId=` + encodeURIComponent(id || "")}>
                <Plus className="h-4 w-4" />
              </Link>
            )}
            <Link
              to={`/tag/${id}`}
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
