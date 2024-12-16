import { Card } from "@/components/ui/card";
import { ArrowRight, Tags } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

//new card component for tag types to display in glossary
interface TagSubtypeCardProps {
  tagSubtype: {
    typeId: string;
    tagCount: number;
    description: string; // Added description field
  };
}

export const TagSubtypeCard = React.forwardRef<
  HTMLDivElement,
  TagSubtypeCardProps
>(({ tagSubtype }, ref) => {
  return (
    <Card
      className="flex flex-1 flex-col border-none bg-neutral-100 px-6 py-8 shadow-sm"
      ref={ref}
    >
      <div className="flex flex-1 flex-col justify-between ">
        <div className="flex flex-col gap-6">
          {/* Subtype Name */}
          <h1 className="text-xl font-semibold text-gray-800">
            {tagSubtype.typeId}
          </h1>

          {/* Description */}
          <p className="text-sm text-gray-600">{tagSubtype.description}</p>

          {/* Number of Tags */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Tags className="h-5 w-5" />
            <span>{tagSubtype.tagCount} tags</span>
          </div>
        </div>

        {/* Navigation Link */}
        <div className="flex justify-end">
          <Link
            to={`/tagtype/${tagSubtype.typeId}`}
            className="flex items-center text-sm font-medium text-gray-800 hover:underline"
          >
            View tag type page
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
});
