import { useGetBookmarkedQuestions } from "@/services/api/programmingForumComponents";
import { QuestionSummary } from "@/services/api/programmingForumSchemas";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ErrorAlert from "../components/ErrorAlert";
import { QuestionCard } from "../components/QuestionCard";

export const BookmarkedQuestions = () => {
  const [previousData, setPreviousData] = useState<QuestionSummary[]>([]);

  const { data: resultList, isLoading, error } = useGetBookmarkedQuestions({});

  useEffect(() => {
    if (resultList?.data && !isLoading) {
      setPreviousData(resultList.data as typeof previousData);
    }
  }, [resultList, isLoading]);

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const resultListData =
    (resultList?.data as typeof previousData) || previousData;
  const questions = resultListData || [];

  return (
    <div className="container flex flex-col gap-2 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">
          {questions.length
            ? `You have ${resultListData.length} bookmarked questions.`
            : "You haven't bookmarked any questions."}
        </h1>
      </div>
      {!questions.length && <p>Bookmark questions to view them here.</p>}

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {questions.map((question) => (
            <QuestionCard
              difficulty={question.difficulty}
              key={question.id}
              id={question.id}
              title={question.title}
              content={question.content ?? ""}
              votes={
                ((question as unknown as { upvoteCount: number }).upvoteCount ??
                  0) -
                ((question as unknown as { downvoteCount: number })
                  .downvoteCount ?? 0)
              }
              answerCount={
                (question as unknown as { answerCount: number }).answerCount ??
                0
              }
            />
          ))}
        </div>
        {isLoading && (
          <div className="col-span-3 flex w-full items-center justify-center">
            <Loader2
              className="h-16 w-16 animate-spin text-primary"
            />
            <div className="ml-4 text-lg font-normal duration-500 animate-in fade-in">
              Loading...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
