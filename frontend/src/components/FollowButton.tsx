import {
  useFollowUser,
  useGetUserProfile,
  useUnfollowUser,
} from "@/services/api/programmingForumComponents";
import { useState } from "react";
import { Button } from "./ui/button";

export default function FollowButton({
  profile,
}: {
  profile: { id?: number; selfFollowing?: boolean };
}) {
  const { isLoading, error, refetch } = useGetUserProfile(
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

  const { mutateAsync: follow } = useFollowUser({
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticFollowing(null);
      });
    },
    onError: () => {
      setOptimisticFollowing(null);
    },
  });
  const { mutateAsync: unfollow } = useUnfollowUser({
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticFollowing(null);
      });
    },
    onError: () => {
      setOptimisticFollowing(null);
    },
  });

  const following = optimisticFollowing ?? profile.selfFollowing;

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
