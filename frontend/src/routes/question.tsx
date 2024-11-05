import LinkIcon from "@/assets/Icon/General/Link.svg?react";
import { Answers } from "@/components/Answers";
import { ExerciseCard } from "@/components/ExerciseCard";
import ErrorAlert from "@/components/ErrorAlert";
import FollowButton from "@/components/FollowButton";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteQuestion as useDeleteQuestionById,
  useGetQuestionDetails,
  useRateQuestion as useVoteQuestion,
} from "@/services/api/programmingForumComponents";
import useAuthStore from "@/services/auth";
import { Flag, MessageSquare, ThumbsUp, Trash } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function QuestionPage() {
  const { questionId } = useParams();

  const {
    data: result,
    isLoading,
    error,
    refetch,
  } = useGetQuestionDetails(
    {
      pathParams: { questionId: questionId ? Number(questionId) : -1 },
    },
    {
      enabled: !!questionId,
    }
  );
  const data = result?.data;

  const { mutateAsync: deleteQuestion } = useDeleteQuestionById();
  const { selfProfile, token } = useAuthStore();

  const [optimisticVotes, setOptimisticVotes] = useState<number | null>(null);

  const { mutateAsync: voteQuestion } = useVoteQuestion({
    onMutate: async (vote) => {
      setOptimisticVotes(
        (prev) => (prev ?? data?.rating ?? 0) + vote.body.rating
      );
    },
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticVotes(null);
      });
    },
    onError: () => {
      setOptimisticVotes(null);
    },
  });

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }
  if (error) {
    return <ErrorAlert error={error} />;
  }

  const question = data! || {};

  if (!question) {
    return (
      <ErrorAlert
        error={{
          status: 404,
          payload: { status: 404, message: "Question not found" },
        }}
      />
    );
  }

  return (
    <div className="container mx-auto flex gap-6 py-16">
      {/* Left Column: Question and Answers */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{question.title}</h1>
          <div className="flex gap-2">
            <Button
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({
                  variant: "default",
                  title: "Link copied",
                  description:
                    "The link to this question has been copied to your clipboard",
                });
              }}
            >
              <LinkIcon className="h-5 w-5" />
            </Button>
            {selfProfile?.id === question.author.id && (
              <Button
                onClick={() =>
                  deleteQuestion({ pathParams: { questionId: question.id } })
                }
                size="icon"
                aria-label="Delete question"
                variant="destructive"
              >
                <Trash className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Author Info and Follow Button */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to={`/users/${question.author.id}`}
            className="flex items-center gap-4"
          >
            <img
              src={
                question.author.profilePicture || "https://placehold.co/640x640"
              }
              alt={question.author.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="font-semibold">{question.author.name}</span>
          </Link>
          {token && selfProfile?.id !== question.author.id && (
            <FollowButton profile={question.author} />
          )}
        </div>

        {/* Voting and Answer Count */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4" />
            <span className="font-bold">
              {optimisticVotes ?? question.rating}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="font-bold">{question.answerCount}</span>
          </div>
          {!!token && (
            <div className="flex gap-2">
              <Button
                size="sm"
                disabled={question.selfRating === 1}
                onClick={() =>
                  voteQuestion({
                    pathParams: { questionId: question.id },
                    body: { rating: 1 },
                  })
                }
              >
                Upvote
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={question.selfRating === -1}
                onClick={() =>
                  voteQuestion({
                    pathParams: { questionId: question.id },
                    body: { rating: -1 },
                  })
                }
              >
                Downvote
              </Button>
            </div>
          )}
        </div>

        {/* Metadata and Tags */}
        <div className="grid grid-cols-2 gap-2 py-2 mb-4">
          <span className="flex items-center gap-4 font-semibold">
            <Flag className="h-6 w-6" />
            {question.tags.map((s) => s.name).join(", ")}
          </span>
          <span className="flex items-center gap-4 font-semibold">
            Asked: {new Date(question.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Question Content */}
        <div className="rounded-lg bg-neutral-150 p-4 mb-6">
          <span className="whitespace-pre-wrap">{question.content}</span>
        </div>

        {/* Answers Section */}
        <h4 className="text-2xl font-bold mb-4">Answers</h4>
        {questionId && <Answers questionId={Number(questionId)} />}
      </div>
      
      {/* Vertical Divider */}
      <div className="w-px bg-gray-300"></div>

      {/* Right Column: Collection of Links */}
      {/* Right Column: Collection of Exercise Cards */}
      <div className="w-1/4 p-4 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Related Exercises</h2>
        
        {/* Exercise Card 1 */}
        <ExerciseCard
          id={1}
          title="Exercise 1: Array Manipulation"
          description="Manipulate arrays to solve common problems."
          difficulty="Easy"
          tags={["array-manipulation", "basic"]}
        />

        {/* Exercise Card 2 */}
        <ExerciseCard
          id={2}
          title="Exercise 2: Binary Search Trees"
          description="Implement and manipulate binary search trees."
          difficulty="Medium"
          tags={["binary-search-tree", "data-structures"]}
        />

        {/* Exercise Card 3 */}
        <ExerciseCard
          id={3}
          title="Exercise 3: Dynamic Programming Basics"
          description="Learn the fundamentals of dynamic programming."
          difficulty="Hard"
          tags={["dynamic-programming", "algorithms"]}
        />
      </div>

    </div>
  );
}
