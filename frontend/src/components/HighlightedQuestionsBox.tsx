import { HighlightedQuestionCard } from "@/components/HighlightedQuestionCard";
import { QuestionSummary } from "@/services/api/programmingForumSchemas";
import React from "react";

export const HighlightedQuestionsBox: React.FC<{
  questions: QuestionSummary[];
}> = ({ questions }) => {
  return (
    <div className="rounded-lg bg-gradient-to-t from-blue-50 via-blue-200 to-blue-300 p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Recommended for you:
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {questions.map((question) => (
          <HighlightedQuestionCard
            key={question.id}
            id={question.id}
            title={question.title}
            questionBody={question.questionBody}
            likeCount={question.likeCount}
            commentCount={question.commentCount}
            author={question.author}
          />
        ))}
      </div>
    </div>
  );
};
