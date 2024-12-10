import {
  useFollowTag,
  useGetTagDetails,
  useUnfollowTag,
} from "@/services/api/programmingForumComponents";
import { useEffect, useState } from "react";
import { Button, ButtonText } from "./ui/button";

export default function FollowTagButton({
  tag,
}: {
  tag: { id?: number; selfFollowing?: boolean };
}) {
  const { isLoading, data, error, refetch } = useGetTagDetails(
    {
      pathParams: {
        tagId: tag.id!,
      },
    },
  );

  
  const [optimisticFollowing, setOptimisticFollowing] = useState(
    false
  );

  useEffect(() => {
    setOptimisticFollowing(tag.selfFollowing ?? false);
  }, [tag.selfFollowing]);

  const { mutateAsync: follow } = useFollowTag({
    onMutate: async () => {
      setOptimisticFollowing(true);
    },
    onSuccess: (data) => {
      refetch().then(() => {
        setOptimisticFollowing(true);
      });
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
      setOptimisticFollowing(false);
    },
  });

  const { mutateAsync: unfollow } = useUnfollowTag({
    onMutate: async () => {
      setOptimisticFollowing(false);
    },
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticFollowing(false);
      });
    },
    onError: () => {
      setOptimisticFollowing(true);
    },
  });

  const following = optimisticFollowing ?? data?.data?.following;

  return (
    <Button
      disabled={!!error || isLoading}
      variant={following && !isLoading ? "outline" : "solid"}
      onPress={() => {
        if (following) {
          unfollow({
            pathParams: {
              tagId: tag.id!,
            },
          });
        } else {
          follow({
            pathParams: {
              tagId: tag.id!,
            },
          });
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
