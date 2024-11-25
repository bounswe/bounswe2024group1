import {
  useDownvoteAnswer,
  useGetQuestionAnswers,
  useUpvoteAnswer,
} from "@/services/api/programmingForumComponents";
import { AnswerDetails } from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { AnswerItem } from "./AnswerItem";
import ErrorAlert from "./ErrorAlert";
import { FullscreenLoading } from "./FullscreenLoading";

interface AnswersProps {
  questionId: number;
}

export function Answers({ questionId }: AnswersProps) {
  const { token } = useAuthStore();

  const {
    data: result,
    isLoading,
    error,
    refetch,
  } = useGetQuestionAnswers(
    {
      pathParams: { questionId },
      queryParams: { pageSize: 10 },
    },
    {
      enabled: !!questionId,
    },
  );

  const { mutateAsync: upvoteAnswer } = useUpvoteAnswer();
  const { mutateAsync: downvoteAnswer } = useDownvoteAnswer();

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const answers = (result?.data as { items?: AnswerDetails[] }).items || [];

  const handleVote = async (answerId: number, rating: number) => {
    if (!token) return;

    if (rating === 1) {
      await upvoteAnswer({
        pathParams: { answerId },
      });
    } else {
      await downvoteAnswer({
        pathParams: { answerId },
      });
    }
    refetch();
  };

  return (
    <div className="flex flex-col gap-4">
      {answers.map((answer) => (
        <AnswerItem
          key={answer.id}
          answer={answer}
          onUpvote={() => handleVote(answer.id, 1)}
          onDownvote={() => handleVote(answer.id, -1)}
        />
      ))}
    </div>
  );
}
