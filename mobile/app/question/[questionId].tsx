import { Answers } from "@/components/Answers";

import ErrorAlert from "@/components/ErrorAlert";
import FollowButton from "@/components/FollowButton";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import {
  Button,
  ButtonText,
  HStack,
  Image,
  LinkIcon,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui";
import {
  useDeleteQuestion as useDeleteQuestionById,
  useGetQuestionDetails,
  useRateQuestion as useVoteQuestion,
} from "@/services/api/programmingForumComponents";
import useAuthStore from "@/services/auth";
import { Link, useLocalSearchParams } from "expo-router";
import { Flag, MessageSquare, ThumbsUp, Trash } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
export default function QuestionPage() {
  const { questionId } = useLocalSearchParams();

  const toast = useToast();
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
    <ScrollView contentContainerClassName="container flex gap-4 py-16 px-6">
      <HStack className="flex flex-row items-center justify-between">
        <Text className="text-2xl font-bold">{question.title}</Text>
        <HStack className="hidden" space="md">
          <Button
            size="xs"
            onPress={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.show({
                id: "link-copied",
                placement: "top",
                duration: 3000,
                render: ({ id }) => {
                  const uniqueToastId = "toast-" + id;
                  return (
                    <Toast
                      nativeID={uniqueToastId}
                      action="muted"
                      variant="solid"
                    >
                      <ToastTitle>Link copied</ToastTitle>
                      <ToastDescription>
                        The link to this question has been copied to your
                        clipboard
                      </ToastDescription>
                    </Toast>
                  );
                },
              });
            }}
          >
            <LinkIcon color="white" className="h-5 w-5" />
          </Button>
          {selfProfile?.id === question.author.id && (
            <Button
              onPress={() =>
                deleteQuestion({ pathParams: { questionId: question.id } })
              }
              size="xs"
              aria-label="Delete question"
              variant="outline"
            >
              <Trash size={20} />
            </Button>
          )}
        </HStack>
      </HStack>

      <HStack className=" items-center justify-between">
        <HStack space="md">

        <Link
          href={`/users/${question.author.id}`}
          className="flex flex-row items-center gap-4"
        >
          <Image
            source={{
              uri: question.author.profilePicture || "https://placehold.co/640x640",
            }}
            alt={question.author.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <Text className="font-bold">{question.author.name}</Text>
        </Link>
        </HStack>
        {token && selfProfile?.id !== question.author.id && (
          <FollowButton profile={question.author} />
        )}
      </HStack>

      <View className="flex flex-row items-center gap-4">
        <HStack className="flex items-center gap-2">
          <ThumbsUp size={20} color={"#000"} />
          <Text className="font-bold">
            {optimisticVotes ?? question.rating}
          </Text>
        </HStack>
        <HStack space="md">
          <MessageSquare size={20} color="black"/>
          <Text className="font-bold">{question.answerCount}</Text>
        </HStack>
        {!!token && (
          <HStack space="md">
            <Button
              size="sm"
              variant={question.selfRating === 1 ? "solid" : "outline"}
              disabled={question.selfRating === 1}
              onPress={() =>
                voteQuestion({
                  pathParams: { questionId: question.id },
                  body: { rating: 1 },
                })
              }
            >
              <ButtonText>Upvote</ButtonText>
            </Button>
            <Button
              size="sm"
              variant={question.selfRating === -1 ? "solid" : "outline"}
              disabled={question.selfRating === -1}
              onPress={() =>
                voteQuestion({
                  pathParams: { questionId: question.id },
                  body: { rating: -1 },
                })
              }
            >
              <ButtonText>Downvote</ButtonText>
            </Button>
          </HStack>
        )}
      </View>

      <View className="flex flex-row justify-between items-center gap-2 py-2">
        <HStack space="md">
          <Flag size={20} color="black" />
          <Text className="font-bold">
            {question.tags.map((s) => s.name).join(", ")}
          </Text>
        </HStack>
        <Text className="flex items-center gap-4 font-bold">
          Asked: {new Date(question.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View className="rounded-lg bg-neutral-150 p-4">
        <Text className="whitespace-pre-wrap">{question.content}</Text>
      </View>

      <Text className="text-2xl font-bold">Answers</Text>
      {questionId && <Answers questionId={Number(questionId)} />}
    </ScrollView>
  );
}
