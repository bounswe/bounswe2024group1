import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMemo } from "react";
import { flag } from "country-emoji";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import useAuthStore from "@/services/auth";

interface Dish {
  id: string;
  name: string;
  image: string;
  description: string;
  countries: string;
}

export const Dish = ({
  dish: { id, name, image, description, countries },
}: {
  dish: Dish;
}) => {
  const countryEmojis = useMemo(() => {
    return (countries || "").split(", ").map(flag).join(" ");
  }, [countries]);
  const token = useAuthStore().token;

  return (
    <div className="flex flex-col self-stretch justify-self-stretch">
      <div className="-mb-16 w-[70%] self-center">
        <AspectRatio ratio={16 / 9}>
          <img src={image} className="h-full w-full rounded-2xl object-cover" />
        </AspectRatio>
      </div>

      <Card className="flex flex-1 flex-col bg-gray-100 pt-16">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{name}</CardTitle>
            <CardTitle>{countryEmojis}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-2">
          <p className="text-sm text-gray-500">{description}</p>
          <div className="flex items-center justify-between">
            {!!token && (
              <Link to={`/recipes/new?dishId=` + encodeURIComponent(id)}>
                <Plus className="h-4 w-4" />
              </Link>
            )}
            <Link
              to={`/dishes/${id}`}
              className="text-sm font-medium text-blue-500 hover:underline"
            >
              See all recipes →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
