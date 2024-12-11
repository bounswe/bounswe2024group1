import { Card } from "@/components/ui/card";
import { ArrowRight, CornerDownRight, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface AnswerCardProps {
  id: number;
  title: string;
  content: string;
  votes: number;
  questionId: number;
  author: {
    id: number;
    name: string;
    profilePicture: string;
  };
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  title,
  content,
  votes,
  questionId,
  author,
}) => {
  return (
    <Card className="border-none #e5e5e5 px-6 py-8 shadow-sm">
      <div className="flex flex-col gap-6">
        <h3 className="line-clamp-2 text-xl font-semibold text-gray-800">
          {title}
        </h3>
        <div className="flex items-start gap-2">
          <CornerDownRight
            width={24}
            height={24}
            className="mt-2 flex-shrink-0"
          />
          <p className="line-clamp-3 text-sm font-light text-gray-800">
            {content}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-xs text-gray-800">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{votes} votes</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Link to={`/users/${author.id}`} className="h-10 w-10">
            <img
              src={author.profilePicture}
              alt={"Profile picture"}
              className="rounded-full object-cover"
            />
          </Link>
          <Link
            to={`/question/${questionId}`}
            className="flex items-center text-sm font-medium text-gray-800 hover:underline"
          >
            Go to answer
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
};
