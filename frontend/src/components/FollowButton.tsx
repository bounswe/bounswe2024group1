import { UserProfile } from "@/services/api/semanticBrowseSchemas";
import { Button } from "./ui/button";
import {
  useFollowUser,
  useGetUserById,
  useUnfollowUser,
} from "@/services/api/semanticBrowseComponents";
import { useState } from "react";

export default function FollowButton({
  profile,
}: {
  profile: { id?: number; selfFollowing?: boolean };
}) {
  const { isLoading, data, error, refetch } = useGetUserById(
    {
      pathParams: {
        userId: profile.id!,
      },
    },
    {
      enabled: typeof profile.selfFollowing !== "boolean",
    },
  );

  const [optimisticFollowing, setOptimisticFollowing] = useState(
    null as boolean | null,
  );

  const { mutateAsync: follow, isPending: followPending } = useFollowUser({
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticFollowing(null);
      });
    },
    onError: () => {
      setOptimisticFollowing(null);
    },
  });
  const { mutateAsync: unfollow, isPending: unfollowPending } = useUnfollowUser(
    {
      onSuccess: () => {
        refetch().then(() => {
          setOptimisticFollowing(null);
        });
      },
      onError: () => {
        setOptimisticFollowing(null);
      },
    },
  );

  const following = optimisticFollowing ?? data?.data?.selfFollowing;

  return (
    <Button
      disabled={!!error || isLoading}
      variant={following && !isLoading ? "primary-outline" : "default"}
      onClick={() => {
        if (following) {
          unfollow({
            pathParams: {
              userId: profile.id!,
            },
          });
          setOptimisticFollowing(false);
        } else {
          follow({
            pathParams: {
              userId: profile.id!,
            },
          });
          setOptimisticFollowing(true);
        }
      }}
    >
      {isLoading
        ? "Loading..."
        : error
          ? "Error"
          : following
            ? "Following"
            : "Follow"}
    </Button>
  );
}
