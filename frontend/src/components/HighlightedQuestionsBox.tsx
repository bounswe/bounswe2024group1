import { HighlightedQuestionCard } from "@/components/HighlightedQuestionCard";
import React from "react";

interface HighlightedQuestionCardProps {
  id: number;
  title: string;
  content: string;
  rating: number;
  answerCount: number;
  author: {
    id: number;
    name: string;
    profilePicture: string;
  };
}

export const HighlightedQuestionsBox: React.FC<{ questions: HighlightedQuestionCardProps[] }> = ({ questions }) => {
    return (
      <div className="p-6 rounded-lg shadow-md bg-gradient-to-t from-blue-50 via-blue-200 to-blue-300">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recommended for you:</h2>
        <div className="grid grid-cols-3 gap-4">
          {questions.map((question) => (
            <HighlightedQuestionCard
              key={question.id}
              id={question.id}
              title={question.title}
              content={question.content}
              votes={question.rating}
              answerCount={question.answerCount}
              author={question.author}
            />
          ))}
        </div>
      </div>
    );
};
