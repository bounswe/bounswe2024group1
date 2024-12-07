import {
  useFollowTag,
  useGetTagDetails,
  useUnfollowTag,
} from "@/services/api/programmingForumComponents";
import { useState } from "react";
import { Button } from "./ui/button";

export default function TagFollowButton({
  tag,
}: {
  tag: { tagId?: string; following?: boolean };
}) {
  const { isLoading, data, error, refetch } = useGetTagDetails(
    {
      pathParams: {
        tagId: tag.tagId!,
      },
    },
    {
      enabled: typeof tag.following !== "boolean",
    },
  );

  const [optimisticFollowing, setOptimisticFollowing] = useState(
    null as boolean | null,
  );

  const { mutateAsync: follow } = useFollowTag({
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticFollowing(null);
      });
    },
    onError: () => {
      setOptimisticFollowing(null);
    },
  });
  const { mutateAsync: unfollow } = useUnfollowTag({
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticFollowing(null);
      });
    },
    onError: () => {
      setOptimisticFollowing(null);
    },
  });

  const following = optimisticFollowing ?? data?.data?.following;

  return (
    <Button
      disabled={!!error || isLoading}
      variant={following && !isLoading ? "primary-outline" : "default"}
      onClick={() => {
        if (following) {
          unfollow({
            pathParams: {
              tagId: tag.tagId!,
            },
          });
          setOptimisticFollowing(false);
        } else {
          follow({
            pathParams: {
              tagId: tag.tagId!,
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
