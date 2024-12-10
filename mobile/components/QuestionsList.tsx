import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { QuestionCard } from "@/components/QuestionCard";
import {
  SearchQuestionsQueryParams,
  useSearchQuestions,
  SearchQuestionsResponse,
} from "@/services/api/programmingForumComponents";

interface QuestionListProps {
  searchQueryParams?: string;
  pageSize?: number;
  difficultyFilter?: "EASY" | "MEDIUM" | "HARD";
  tagFilter?: string;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  searchQueryParams = "",
  pageSize = 10,
  difficultyFilter,
  tagFilter = "",
}) => {
  const [page, setPage] = useState(1);

  const q: SearchQuestionsQueryParams = {
    q: searchQueryParams,
    page,
    pageSize,
    ...(difficultyFilter && { difficulty: difficultyFilter }),
    ...(tagFilter && { tags: tagFilter }),
  };

  // Fetch questions
  const {
    data: questionSearchData,
    isLoading: isLoadingQuestions,
    error: questionsError,
  } = useSearchQuestions({
    queryParams: q,
  });

  const isQuestionsResponseObject = (
    data: SearchQuestionsResponse["data"]
  ): data is Exclude<SearchQuestionsResponse["data"], any[]> => {
    return typeof data === "object" && !Array.isArray(data);
  };

  const questions =
    questionSearchData && isQuestionsResponseObject(questionSearchData.data)
      ? questionSearchData.data.items
      : [];
  const totalPages =
    questionSearchData && isQuestionsResponseObject(questionSearchData.data)
      ? questionSearchData.data.totalPages
      : 0;

  const handleNextPage = () => {
    if (page < (totalPages ?? 0)) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <View>
      {isLoadingQuestions && <ActivityIndicator size="large" />}
      {questionsError && <Text>Error: {questionsError.status}</Text>}
      {questions && (
        <View className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              id={String(question.id)}
              title={question.title}
              content={question.content}
              votes={question.likeCount}
              answerCount={question.commentCount}
              author={question.author}
              difficulty={question.difficulty}
              highlighted={question.difficulty === "EASY"}
            />
          ))}
        </View>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
        <Button title="Previous" onPress={handlePreviousPage} disabled={page === 1} />
        <Text>
          Page {page} of {totalPages}
        </Text>
        <Button
          title="Next"
          onPress={handleNextPage}
          disabled={page === totalPages || isLoadingQuestions}
        />
      </View>
    </View>
  );
};
