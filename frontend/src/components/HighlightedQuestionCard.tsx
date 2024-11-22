import { Card } from "@/components/ui/card";
import { QuestionSummary } from "@/services/api/programmingForumSchemas";

import { ArrowRight, MessageSquare, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const HighlightedQuestionCard: React.FC<Partial<QuestionSummary>> = ({
  id,
  title,
  questionBody,
  likeCount,
  commentCount,
  author,
}) => {
  return (
    <Card className="border-none bg-blue-100 px-6 py-8 shadow-sm">
      <div className="flex flex-col gap-6">
        <h3 className="line-clamp-2 text-xl font-semibold text-gray-800">
          {title}
        </h3>
        <p className="line-clamp-3 text-sm font-light text-gray-800">
          {questionBody}
        </p>
        <div className="flex flex-col gap-3 text-xs text-gray-700">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{likeCount} votes</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{commentCount} answers</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {author && (
            <Link to={`/users/${author.id}`} className="h-10 w-10">
              <img
                src={author.profilePicture}
                alt={author.name}
                className="h-full w-full rounded-full object-cover"
              />
            </Link>
          )}
          <Link
            to={`/question/${id}`}
            className="flex items-center text-sm font-medium text-gray-800 hover:underline"
          >
            Go to question
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
};
