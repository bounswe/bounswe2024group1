import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRateQuestion } from "@/services/api/programmingForumComponents";
import useAuthStore from "@/services/auth";
import React, { useState } from "react";
import { Card } from "./ui/card";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

type DifficultyBarProps = {
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  questionId: number;
};

export const DifficultyBar: React.FC<DifficultyBarProps> = ({
  easyCount,
  mediumCount,
  hardCount,
  questionId,
}) => {
  const { token } = useAuthStore(); // Fetch authentication status
  const [votedDifficulty, setVotedDifficulty] = useState<string | null>(null); // Track user's vote
  const [localCounts, setLocalCounts] = useState({
    easy: easyCount,
    medium: mediumCount,
    hard: hardCount,
  });

  const { mutateAsync: rateQuestion } = useRateQuestion();

  // Helper to calculate percentage
  const calculatePercentage = (count: number) =>
    totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : "0";

  const handleVote = async (difficulty: "EASY" | "MEDIUM" | "HARD") => {
    if (!token) {
      alert("You must be logged in to vote!");
      return;
    }

    try {
      const response = await rateQuestion({
        pathParams: { id: questionId },
        body: { difficulty: difficulty },
      });

      const { easyCount, mediumCount, hardCount } = response.data;

      setLocalCounts({
        easy: easyCount ?? 0,
        medium: mediumCount ?? 0,
        hard: hardCount ?? 0,
      });

      setVotedDifficulty(difficulty);
    } catch (error) {
      console.error("Failed to vote:", error);
      alert("There was an issue submitting your vote. Please try again.");
    }
  };

  const totalVotes = localCounts.easy + localCounts.medium + localCounts.hard;

  const getHighestVotedDifficulty = () => {
    const counts = [
      { level: "Easy", count: localCounts.easy },
      { level: "Medium", count: localCounts.medium },
      { level: "Hard", count: localCounts.hard },
    ];
    const highest = counts.reduce(
      (
        prev,
        current, //any equality -> pick higher difficulty level
      ) => (prev.count > current.count ? prev : current),
    );
    return highest.level;
  };

  return (
    <Card className="my-4 border-none bg-neutral-100 px-6 py-8 shadow-sm">
      <h2 className="text-xl">Difficulty voting</h2>
      <TooltipProvider>
        {/* Voting Form */}
        <div className="my-4 flex items-center gap-2">
          <span className="text-">Vote for Difficulty Level:</span>
          <ToggleGroup
            value={votedDifficulty || undefined}
            onValueChange={(val) =>
              val && handleVote(val as "EASY" | "MEDIUM" | "HARD")
            }
            type="single"
            size="lg"
            variant="outline"
          >
            <ToggleGroupItem
              value="EASY"
              aria-label="Vote easy difficulty"
              className={
                votedDifficulty === "EASY" ? "data-[state=on]:bg-green-200" : ""
              }
            >
              Easy
            </ToggleGroupItem>
            <ToggleGroupItem
              value="MEDIUM"
              className={
                votedDifficulty === "MEDIUM"
                  ? "data-[state=on]:bg-yellow-200"
                  : ""
              }
              aria-label="Vote medium difficulty"
            >
              Medium
            </ToggleGroupItem>
            <ToggleGroupItem
              value="HARD"
              aria-label="Vote hard difficulty"
              className={
                votedDifficulty === "HARD" ? "data-[state=on]:bg-red-100" : ""
              }
            >
              Hard
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Difficulty Bar */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">
            The community finds this question:{" "}
            <strong>{getHighestVotedDifficulty()}</strong> difficulty.
          </h2>
          <div className="mb-2 text-sm text-gray-600">
            <span>Easy: {localCounts.easy} votes</span>,{" "}
            <span>Medium: {localCounts.medium} votes</span>,{" "}
            <span>Hard: {localCounts.hard} votes</span>
          </div>
          <div className="relative flex h-6 w-full overflow-hidden rounded border border-gray-300">
            {/* Easy Section */}
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <div
                  className="bg-green-500"
                  style={{
                    width: `${calculatePercentage(localCounts.easy)}%`,
                  }}
                ></div>
              </TooltipTrigger>
              <TooltipContent>{localCounts.easy} Easy votes</TooltipContent>
            </Tooltip>

            {/* Medium Section */}
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <div
                  className="bg-yellow-500"
                  style={{
                    width: `${calculatePercentage(localCounts.medium)}%`,
                  }}
                ></div>
              </TooltipTrigger>
              <TooltipContent>{localCounts.medium} Medium votes</TooltipContent>
            </Tooltip>

            {/* Hard Section */}
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <div
                  className="bg-red-500"
                  style={{
                    width: `${calculatePercentage(localCounts.hard)}%`,
                  }}
                ></div>
              </TooltipTrigger>
              <TooltipContent>{localCounts.hard} Hard votes</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </Card>
  );
};
