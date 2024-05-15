import { useGetUserById } from "@/services/api/semanticBrowseComponents";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import Plus from "@/assets/Icon/General/Plus.svg?react";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import ErrorAlert from "@/components/ErrorAlert";
import { cn } from "@/lib/utils";
import { Recipe } from "@/components/Recipe";

export default function Profile() {
  const { userId = "" } = useParams<{ userId: string }>();
  const me = userId === "me";

  const { isLoading, data, error } = useGetUserById({
    pathParams: { userId: me ? ("me" as unknown as number) : parseInt(userId) },
    queryParams: {
      enabled: !me && !isNaN(Number(userId)),
    },
  });

  if (!me && isNaN(Number(userId))) {
    return <h1>Invalid user id</h1>;
  }
  if (isLoading) {
    return <FullscreenLoading overlay />;
  }
  if (error) {
    return <ErrorAlert error={error} />;
  }

  const profile = data!.data;
  return (
    <div key="1" className="container bg-white py-20">
      <div className="flex flex-col gap-4 px-4 py-2">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="">My profile</h1>
        </div>
        <div className="flex items-center justify-between space-x-8 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              alt="Profile picture"
              src="https://placehold.co/640x640"
            />
          </Avatar>
          <div className="flex space-x-4 text-center">
            <div>
              <div className="font-bold">{profile.recipeCount}</div>
              <div className="text-sm text-gray-500">Recipes</div>
            </div>
            <div>
              <div className="font-bold">{profile.followersCount}</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div>
              <div className="font-bold">{profile.followingCount}</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col ">
            <h2 className="">{profile.name}</h2>
            <p
              className={cn(
                "text-sm",
                !profile.bio ? "text-gray-300" : "text-gray-600",
              )}
            >
              {profile.bio ?? "Empty bio."}
            </p>
          </div>
          {me && <Button variant="outline">Edit profile</Button>}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 px-4 py-2">
        <div className="flex items-center gap-4">
          <h3>Recipes</h3>
          {me && (
            <Button size="icon" className="rounded-full bg-red-500 text-white">
              <Plus />
            </Button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {profile.recipes?.map((recipe) => (
            <Recipe recipe={recipe} key={recipe.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
