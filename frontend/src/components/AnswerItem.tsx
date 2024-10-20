import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnswerDetails } from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { ContentWithSnippets } from "./ContentWithSnippets";

interface AnswerItemProps {
  answer: AnswerDetails;
  onUpvote: () => void;
  onDownvote: () => void;
}

export const AnswerItem: React.FC<AnswerItemProps> = ({
  answer,
  onUpvote,
  onDownvote,
}) => {
  const { token } = useAuthStore();

  return (
    <Card className="border-none bg-neutral-150 px-6 py-8 shadow-sm">
      <div className="flex flex-col gap-4">
        <ContentWithSnippets content={answer.content} />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              <span className="font-bold">{answer.rating}</span>
            </div>
            {token && (
              <div className="flex gap-2">
                <Button aria-label="Upvote" size="sm" onClick={onUpvote}>
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button
                  aria-label="Downvote"
                  size="sm"
                  variant="outline"
                  onClick={onDownvote}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <Link
              to={`/users/${answer.author?.id}`}
              className="flex items-center gap-2"
            >
              <img
                src={
                  answer.author?.profilePicture ||
                  "https://placehold.co/100x100"
                }
                alt={answer.author?.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium">{answer.author?.name}</span>
            </Link>
            <span className="text-xs text-gray-500">
              Answered: {new Date(answer.createdAt || "").toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
