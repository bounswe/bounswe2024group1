import {
  useFollowUser,
  useGetUserProfile,
  useUnfollowUser,
} from "@/services/api/programmingForumComponents";
import { useState } from "react";
import { Button, ButtonText } from "./ui/button";

export default function FollowUserButton({
  profile,
}: {
  profile: { id?: number; selfFollowing?: boolean };
}) {
  const { isLoading, data, error, refetch } = useGetUserProfile(
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

  const following = optimisticFollowing ?? data?.data?.selfFollowing;

  return (
    <Button
      disabled={!!error || isLoading}
      variant={following && !isLoading ? "outline" : "solid"}
      onPress={() => {
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
      <ButtonText>
        {isLoading
        ? "Loading..."
        : error
          ? "Error"
          : following
            ? "Following"
            : "Follow"}
      </ButtonText>
    </Button>
  );
}
