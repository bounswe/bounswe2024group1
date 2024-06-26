import {
  useGetUserById,
  useUpdateUserById,
} from "@/services/api/semanticBrowseComponents";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import Plus from "@/assets/Icon/General/Plus.svg?react";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import ErrorAlert from "@/components/ErrorAlert";
import { cn } from "@/lib/utils";
import { Recipe } from "@/components/Recipe";
import useAuthStore from "@/services/auth";
import FollowButton from "@/components/FollowButton";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Profile() {
  const { userId = "" } = useParams<{ userId: string }>();
  const { selfProfile, fetchProfile } = useAuthStore();
  const me = userId === "me" || userId === selfProfile?.id?.toString();
  const [editing, setEditing] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!me) {
      setEditing(false);
    }
  }, [me]);

  const { isLoading, data, error, refetch } = useGetUserById(
    {
      pathParams: {
        userId: me ? ("me" as unknown as number) : parseInt(userId),
      },
    },
    {
      enabled: me || !isNaN(Number(userId)),
    },
  );
  const { mutateAsync, isPending } = useUpdateUserById({
    onSuccess: () => {
      fetchProfile();
      refetch().then(() => {
        setEditing(false);
      });
    },
    onError: () => {
      setEditing(false);
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
    <div key="1" className="container bg-white py-16">
      <div className="flex flex-col gap-4 px-4 py-2">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="">{me ? "My profile" : "Profile"}</h1>
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
            {editing ? (
              <Input
                defaultValue={profile.name}
                ref={nameRef}
                placeholder="Name"
                className="mt-2"
              />
            ) : (
              <h2 className="">{profile.name}</h2>
            )}
            {editing ? (
              <Textarea
                defaultValue={profile.bio}
                ref={bioRef}
                placeholder="Bio"
                className="mt-2"
              />
            ) : (
              <p
                className={cn(
                  "text-sm",
                  !profile.bio ? "text-gray-300" : "text-gray-600",
                )}
              >
                {profile.bio ?? "Empty bio."}
              </p>
            )}
          </div>
          {me ? (
            editing ? (
              <Button
                disabled={isPending}
                onClick={() => {
                  mutateAsync({
                    pathParams: {
                      userId: profile.id,
                    },
                    body: {
                      ...profile,
                      name: nameRef.current?.value ?? "",
                      bio: bioRef.current?.value ?? "",
                    },
                  });
                }}
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            ) : null
          ) : (
            // <Button onClick={() => setEditing(true)} variant="outline">
            //   Edit profile
            // </Button>
            data?.data && <FollowButton profile={data?.data} />
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 px-4 py-2">
        <div className="flex items-center gap-4">
          <h3>Recipes</h3>
          {me && (
            <Button
              asChild
              size="icon"
              className="rounded-full bg-red-500 text-white"
            >
              <Link to="/recipes/new">
                <Plus />
              </Link>
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
