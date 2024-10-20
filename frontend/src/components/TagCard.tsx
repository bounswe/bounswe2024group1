import { Card } from "@/components/ui/card";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import { ArrowRight, Hash, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface TagCardProps {
  tag: TagDetails;
}

export const TagCard: React.FC<TagCardProps> = ({ tag }) => {
  return (
    <Card className="border-none bg-neutral-150 px-6 py-8 shadow-sm">
      <div className="flex flex-col gap-6">
        <h3 className="line-clamp-2 text-xl font-semibold text-gray-800">
          {tag.name}
        </h3>
        <div className="flex items-start gap-2">
          <p className="line-clamp-3 text-sm font-light text-gray-600">
            {tag.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{tag.followersCount} followers</span>
          </div>
          <div className="flex items-center gap-1">
            <Hash className="h-4 w-4" />
            <span>{tag.questionCount} questions</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {tag.photo && (
            <div className="h-10 w-10">
              <img
                src={tag.photo}
                alt={tag.name}
                className="rounded-full object-cover"
              />
            </div>
          )}
          <Link
            to={`/tag/${tag.id}`}
            className="flex items-center text-sm font-medium text-gray-600 hover:underline"
          >
            View tag
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
};
