import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface ExerciseCardProps {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  id,
  title,
  description,
  difficulty,
  tags,
}) => {
  return (
    <Card className="border-none bg-neutral-150 px-6 py-8 shadow-sm">
      <div className="flex flex-col gap-6">
        <h3 className="line-clamp-2 text-xl font-semibold text-gray-800">
          {title}
        </h3>
        <p className="line-clamp-3 text-sm font-light text-gray-600">
          {description}
        </p>
        <div className="flex flex-col gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span className="font-semibold">Difficulty:</span>
            <span>{difficulty}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            to={`/exercise/${id}`}
            className="flex items-center text-sm font-medium text-gray-600 hover:underline"
          >
            Go to exercise
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
};
