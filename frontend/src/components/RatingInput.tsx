import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";

const ratingIcons = [1, 2, 3, 4, 5];

export default function RatingInput({
  currentRating,
  setRating,
}: {
  currentRating: number;
  setRating: (rating: number) => void;
}) {
  // input with 5 stars that when hovered show the new rating
  const [tempRating, setTempRating] = useState(currentRating);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!hovering) setTempRating(currentRating);
  }, [hovering, currentRating]);

  return (
    <div
      className="flex cursor-pointer"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {ratingIcons.map((rating) => (
        <span
          className="px-1 py-2"
          onClick={() => setRating(rating)}
          key={rating}
          onMouseEnter={() => setTempRating(rating)}
        >
          <StarIcon
            aria-label={tempRating >= rating ? "filled star" : "empty star"}
            className={cn(
              "h-4 w-4",
              tempRating >= rating
                ? "fill-yellow-500 text-yellow-500"
                : "fill-gray-400 text-gray-400",
            )}
          />
        </span>
      ))}
    </div>
  );
}
