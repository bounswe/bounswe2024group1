import {
  useBookmarkQuestion,
  useGetQuestionDetails,
  useRemoveQuestionBookmark,
} from "@/services/api/programmingForumComponents";
import { useState } from "react";
import { Button } from "./ui/button";
// import { ReactComponent as BookmarkIcon } from '../assets/Icon/Nav/Bookmark/Active.svg';

export default function BookmarkButton({
  question,
}: {
  question: { questionId?: number; bookmarked?: boolean };
}) {
  const { isLoading, data, error, refetch } = useGetQuestionDetails(
    {
      pathParams: {
        questionId: question.questionId!,
      },
    },
    {
      enabled: typeof question.bookmarked !== "boolean",
    },
  );

  const [optimisticBookmarking, setOptimisticBookmarking] = useState(
    null as boolean | null,
  );

  const { mutateAsync: bookmark } = useBookmarkQuestion({
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticBookmarking(null);
      });
    },
    onError: () => {
      setOptimisticBookmarking(null);
    },
  });
  const { mutateAsync: removeBookmark } = useRemoveQuestionBookmark({
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticBookmarking(null);
      });
    },
    onError: () => {
      setOptimisticBookmarking(null);
    },
  });

  const bookmarked = optimisticBookmarking ?? data?.data?.bookmarked;

  return (
    <Button
      disabled={!!error || isLoading}
      size="icon"
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      variant={bookmarked && !isLoading ? "primary-outline" : "default"}
      onClick={() => {
        if (bookmarked) {
          removeBookmark({
            pathParams: {
              questionId: question.questionId!,
            },
          });
          setOptimisticBookmarking(false);
        } else {
          bookmark({
            pathParams: {
              questionId: question.questionId!,
            },
          });
          setOptimisticBookmarking(true);
        }
      }}
    >
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Error"
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={bookmarked && !isLoading ? "#a51819" : "#fafafa" }
          width="20px"
          height="20px"
        >
          <path d="M5 3h14a1 1 0 011 1v16a1 1 0 01-1.496.868L12 15.98l-6.504 4.889A1 1 0 014 20V4a1 1 0 011-1z" />
        </svg>
      )}
    </Button>
  );
}
