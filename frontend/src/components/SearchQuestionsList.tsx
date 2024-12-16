import { DifficultyFilter } from "@/components/DifficultyFilter";
import { useSearchQuestions } from "@/services/api/programmingForumComponents";
import {
  DifficultyLevel,
  QuestionSummary,
} from "@/services/api/programmingForumSchemas";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import InfiniteScroll from "./InfiniteScroll";
import { QuestionCard } from "./QuestionCard";

export const SearchQuestionsList = () => {
  const [params] = useSearchParams();
  const [pageSize, setPageSize] = useState(20);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>();
  const [previousData, setPreviousData] = useState<{
    items: QuestionSummary[];
    totalItems: number;
  }>({
    items: [],
    totalItems: 0,
  });

  const {
    data: searchResult,
    isLoading,
    error,
  } = useSearchQuestions({
    queryParams: {
      q: params.get("q") ?? "",
      pageSize,
      ...(difficulty && { difficulty }),
    },
  });

  useEffect(() => {
    if (searchResult?.data && !isLoading) {
      setPreviousData(searchResult.data as typeof previousData);
    }
  }, [searchResult, isLoading]);

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const searchResultData =
    (searchResult?.data as typeof previousData) || previousData;
  const questions = searchResultData.items || [];

  const next = () => {
    setPageSize(pageSize + 20);
  };

  return (
    <div className="container flex flex-col gap-2 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">
          {questions.length
            ? `Found ${searchResultData.totalItems} results`
            : "No questions found"}
        </h1>
        <DifficultyFilter value={difficulty} onChange={setDifficulty} />
      </div>
      {!questions.length && (
        <p>Try searching for specific topics or keywords.</p>
      )}

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <InfiniteScroll
            next={next}
            hasMore={
              searchResultData.totalItems
                ? searchResultData.totalItems > pageSize
                : false
            }
            isLoading={isLoading}
          >
            {questions.map((question) => (
              <QuestionCard
                difficulty={question.difficulty}
                key={question.id}
                id={question.id}
                title={question.title}
                content={question.content ?? ""}
                votes={
                  ((question as unknown as { upvoteCount: number })
                    .upvoteCount ?? 0) -
                  ((question as unknown as { downvoteCount: number })
                    .downvoteCount ?? 0)
                }
                answerCount={
                  (question as unknown as { answerCount: number })
                    .answerCount ?? 0
                }
              />
            ))}
          </InfiniteScroll>
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
