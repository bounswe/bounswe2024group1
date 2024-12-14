import { Card } from "@/components/ui/card";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import { ArrowRight, Hash, Tag, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface TagCardProps {
  tag: TagDetails;
}

export const TagCard = React.forwardRef<HTMLDivElement, TagCardProps>(
  ({ tag }, ref) => {
    return (
      <Card
        className="flex-1 border-none bg-neutral-100 px-6 py-8 shadow-sm"
        ref={ref}
      >
        <div className="flex flex-col gap-6">
          <h1 className="line-clamp-2 text-xl font-semibold text-gray-800">
            {tag.name}
          </h1>
          <div className="flex items-start gap-2">
            <p className="line-clamp-3 text-sm font-light text-gray-800">
              {tag.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 text-xs text-gray-700">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{tag.followerCount} followers</span>
            </div>
            <div className="flex items-center gap-1">
              <Hash className="h-4 w-4" />
              <span>{tag.questionCount} questions</span>
            </div>
            {tag.tagType && (
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>{tag.tagType}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            {tag.logoImage && (
              <div className="h-10 w-10">
                <img
                  src={tag.logoImage}
                  alt={`The logo image of ${tag.name}`}
                  title={`alt:The logo image of ${tag.name}`}
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <Link
              to={`/tag/${tag.tagId}`}
              className="flex items-center text-sm font-medium text-gray-800 hover:underline"
            >
              View tag
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </Card>
    );
  },
);
