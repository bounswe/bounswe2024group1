import LinkIcon from "@/assets/Icon/General/Link.svg?react";
// import { AddAnswer } from "@/components/Answer";
// import { Answers } from "@/components/AnswerSection";
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

  const { data, isLoading, error, refetch } = useGetQuestionDetails(
    {
      pathParams: { questionId: questionId ? Number(questionId) : -1 },
    },
    {
      enabled: !!questionId,
    },
  );

  const { mutateAsync: deleteQuestion } = useDeleteQuestionById();
  const { selfProfile, token } = useAuthStore();

  const [optimisticVotes, setOptimisticVotes] = useState<number | null>(null);

  const { mutateAsync: voteQuestion } = useVoteQuestion({
    onMutate: async (vote) => {
      setOptimisticVotes(
        (prev) => (prev ?? data?.rating ?? 0) + vote.body.rating,
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
    <div className="container flex flex-col gap-4 py-16">
      <div className="flex items-center justify-between">
        <h1>{question.title}</h1>
        <div className="flex gap-4">
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

      <div className="flex items-center justify-between">
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
          <span className="font-bold">{question.author.name}</span>
        </Link>
        {token && selfProfile?.id !== question.author.id && (
          <FollowButton profile={question.author} />
        )}
      </div>

      <div className="flex items-center gap-4">
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

      <div className="grid grid-cols-2 gap-2 py-2">
        <span className="flex items-center gap-4 font-bold">
          <Flag className="h-6 w-6" />

          {question.tags.map((s) => s.name).join(", ")}
        </span>
        <span className="flex items-center gap-4 font-bold">
          Asked: {new Date(question.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="rounded-lg bg-neutral-150 p-4">
        <span className="whitespace-pre-wrap">{question.content}</span>
      </div>

      <h4 className="font-bold">Answers</h4>
      {/* {selfProfile && questionId && (
        <AddAnswer
          questionId={Number(questionId)}
          user={selfProfile as unknown as UserSummary}
        />
      )}
      {questionId && <Answers questionId={Number(questionId)} />} */}
    </div>
  );
}
