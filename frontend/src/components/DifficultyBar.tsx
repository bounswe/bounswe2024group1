import React, {useState} from "react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useRateQuestion} from "@/services/api/programmingForumComponents";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/services/auth";


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
    const highest = counts.reduce((prev, current) => //any equality -> pick higher difficulty level
      prev.count > current.count ? prev : current
    );
    return highest.level;
  };

  return (
    <div className="mt-6">
      <TooltipProvider>
        {/* Voting Form */}
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-lg font-semibold mb-2">Vote for Difficulty Level:</h2>
          <div className="flex flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => handleVote("EASY")}
              disabled={!token || votedDifficulty === "EASY"}
            >
              Easy
            </Button>
            <Button
              variant="outline"
              onClick={() => handleVote("MEDIUM")}
              disabled={!token || votedDifficulty === "MEDIUM"}
            >
              Medium
            </Button>
            <Button
              variant="outline"
              onClick={() => handleVote("HARD")}
              disabled={!token || votedDifficulty === "HARD"}
            >
              Hard
            </Button>
          </div>
        </div>

        {/* Difficulty Bar */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">
            The community finds this question <strong>{getHighestVotedDifficulty()}</strong> difficulty.
          </h2>
          <div className="text-sm text-gray-600 mb-2">
            <span>Easy: {localCounts.easy} votes</span>,{" "}
            <span>Medium: {localCounts.medium} votes</span>,{" "}
            <span>Hard: {localCounts.hard} votes</span>
          </div>
          <div className="relative flex w-full h-6 rounded border border-gray-300 overflow-hidden">
            {/* Easy Section */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="bg-green-500"
                  style={{ width: `${calculatePercentage(localCounts.easy)}%` }}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                {localCounts.easy} Easy votes
              </TooltipContent>
            </Tooltip>

            {/* Medium Section */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="bg-yellow-500"
                  style={{ width: `${calculatePercentage(localCounts.medium)}%` }}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                {localCounts.medium} Medium votes
              </TooltipContent>
            </Tooltip>

            {/* Hard Section */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="bg-red-500"
                  style={{ width: `${calculatePercentage(localCounts.hard)}%` }}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                {localCounts.hard} Hard votes
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};
