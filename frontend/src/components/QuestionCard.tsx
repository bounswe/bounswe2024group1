import { Card } from "@/components/ui/card";
import { DifficultyLevel } from "@/services/api/programmingForumSchemas";

import placeholderProfile from "@/assets/placeholder_profile.png";
import { ArrowRight, MessageSquare, Star, StarsIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface QuestionCardProps {
  id: number;
  title: string;
  content: string;
  votes: number;
  answerCount: number;
  difficulty?: DifficultyLevel;
  author?: {
    id: number;
    name: string;
    profilePicture: string;
  };
}

const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const QuestionCard = React.forwardRef<HTMLDivElement, QuestionCardProps>(
  ({ id, title, content, votes, answerCount, author, difficulty }, ref) => {
    return (
      <Card
        className="flex w-full flex-1 border-none bg-neutral-100 px-6 py-8 shadow-sm"
        ref={ref}
      >
        <div className="flex w-full flex-col gap-6">
          <h3 className="line-clamp-2 text-xl font-semibold text-gray-800">
            {title}
          </h3>
          <p className="line-clamp-3 flex-1 text-sm font-light text-gray-800">
            {content}
          </p>
          <div className="flex flex-col gap-3 text-xs text-gray-700">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{votes} votes</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{answerCount} answers</span>
            </div>
            {difficulty && (
              <div className="flex items-center gap-1">
                <StarsIcon className="h-4 w-4" />
                <span>{capitalizeString(difficulty)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            {author && (
              <Link to={`/users/${author.id}`} className="h-10 w-10">
                <img
                  src={author?.profilePicture || placeholderProfile}
                  alt={author.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </Link>
            )}
            <Link
              to={`/question/${id}`}
              className="flex items-center p-2 text-sm font-medium text-gray-800 hover:underline"
            >
              Go to question
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </Card>
    );
  },
);
