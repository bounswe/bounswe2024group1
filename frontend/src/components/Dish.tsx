import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Dish {
  name: string;
  image: string;
  description: string;
}

export const Dish = ({
  dish: { name, image, description },
}: {
  dish: Dish;
}) => {
  return (
    <div className="flex max-w-xl flex-col">
      <div className="-mb-16 w-[70%] self-center">
        <AspectRatio ratio={16 / 9}>
          <img src={image} className="h-full w-full rounded-2xl object-cover" />
        </AspectRatio>
      </div>

      <Card className="bg-gray-100 pt-16">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <p className="text-sm text-gray-500">{description}</p>
          <div className="self-end">
            <a className="cursor-not-allowed text-sm font-medium text-blue-500 hover:underline">
              See all recipes →
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
