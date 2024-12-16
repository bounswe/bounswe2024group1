import { Answers } from "@/components/Answers";

import ErrorAlert from "@/components/ErrorAlert";
import FollowUserButton from "@/components/FollowUserButton";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import {
  Button,
  ButtonText,
  HStack,
  Icon,
  Image,
  LinkIcon,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from "@/components/ui";
import {
  useBookmarkQuestion,
  useDeleteQuestion as useDeleteQuestionById,
  useDownvoteQuestion,
  useGetQuestionDetails,
  useRemoveQuestionBookmark,
  useUpvoteQuestion,
} from "@/services/api/programmingForumComponents";
import useAuthStore from "@/services/auth";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeftIcon,
  BookmarkIcon,
  Flag,
  MessageSquare,
  ThumbsUp,
  Trash,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import placeholderProfile from "@/assets/images/placeholder_profile.png";
import { ContentWithSnippets } from "@/components/ContentWithSnippets";

export default function QuestionPage() {
  const { questionId } = useLocalSearchParams();
  const router = useRouter();

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
  const question = data! || {};

  const { mutateAsync: deleteQuestion } = useDeleteQuestionById();
  const { selfProfile, token } = useAuthStore();

  const [optimisticVotes, setOptimisticVotes] = useState<number | null>(null);
  const [optimisticBookmarked, setOptimisticBookmarked] = useState<boolean>(
    question.bookmarked ?? false
  );

  useEffect(() => {
    setOptimisticBookmarked(question.bookmarked ?? false);
  }, [question.bookmarked]);

  const { mutateAsync: upvoteQuestion } = useUpvoteQuestion({
    onMutate: async () => {
      setOptimisticVotes((prev) => (prev ?? data?.likeCount ?? 0) + 1);
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

  const { mutateAsync: downvoteQuestion } = useDownvoteQuestion({
    onMutate: async () => {
      setOptimisticVotes((prev) => (prev ?? data?.likeCount ?? 0) - 1);
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

  const { mutateAsync: bookmarkQuestion, isPending: isPendingBookmark } =
    useBookmarkQuestion({
      onMutate: async () => {
        setOptimisticBookmarked(true);
      },
      onSuccess: () => {
        refetch().then(() => {
          setOptimisticBookmarked(true);
        });
      },
      onError: () => {
        setOptimisticBookmarked(false);
      },
    });

  const {
    mutateAsync: unbookmarkQuestion,
    isPending: isPendingRemoveBookmark,
  } = useRemoveQuestionBookmark({
    onMutate: async () => {
      setOptimisticBookmarked(false);
    },
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticBookmarked(false);
      });
    },
    onError: () => {
      setOptimisticBookmarked(true);
    },
  });

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }
  if (error) {
    return <ErrorAlert error={error} />;
  }

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

  const handleBookmark = () => {
    if (optimisticBookmarked) {
      unbookmarkQuestion({ pathParams: { questionId: question.id } });
    } else {
      bookmarkQuestion({ pathParams: { questionId: question.id } });
    }
  };

  return (
    <VStack className="flex-1 px-2 my-8 mt-8">
      <HStack className="flex items-center justify-between">
        <Button
          onPress={() => router.back()}
          className="self-start mt-4 ml-2"
          variant={"outline"}
          size="sm"
        >
          <Icon as={ArrowLeftIcon} />
        </Button>
        <Button
          onPress={handleBookmark}
          disabled={isPendingBookmark || isPendingRemoveBookmark}
          size="sm"
          variant={optimisticBookmarked ? "solid" : "outline"}
          className="self-end mt-5 mr-6"
        >
          <Icon as={BookmarkIcon} />
        </Button>
      </HStack>
      <ScrollView contentContainerClassName="container flex gap-4 py-8 px-6">
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
                onPress={() => {
                  deleteQuestion({
                    pathParams: { questionId: question.id },
                  }).then(() => {
                    toast.show({
                      id: "question-deleted",
                      placement: "top",
                      duration: 3000,
                      render: ({ id }) => {
                        const uniqueToastId = "toast-" + id;
                        return (
                          <Toast
                            nativeID={uniqueToastId}
                            action="success"
                            variant="solid"
                          >
                            <ToastTitle>Question deleted</ToastTitle>
                            <ToastDescription>
                              The question has been deleted
                            </ToastDescription>
                          </Toast>
                        );
                      },
                    });

                    router.navigate("/");
                  });
                }}
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
                source={
                  question.author.profilePicture ? {uri: question.author.profilePicture} : placeholderProfile
                }
                alt={question.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <Text className="font-bold">{question.author.name}</Text>
            </Link>
          </HStack>
          {token && selfProfile?.id !== question.author.id && (
            <FollowUserButton profile={question.author} />
          )}
        </HStack>

        <View className="flex flex-row items-center gap-4">
          <HStack className="flex items-center gap-2">
            <ThumbsUp size={20} color={"#000"} />
            <Text className="font-bold">
              {optimisticVotes ?? question.likeCount}
            </Text>
          </HStack>
          <HStack space="md">
            <MessageSquare size={20} color="black" />
            <Text className="font-bold">{question.commentCount}</Text>
          </HStack>
          {!!token && (
            <HStack space="md">
              <Button
                size="sm"
                variant={question.selfVoted === 1 ? "solid" : "outline"}
                disabled={question.selfVoted === 1}
                onPress={() =>
                  upvoteQuestion({
                    pathParams: { questionId: question.id },
                  })
                }
              >
                <ButtonText>Upvote</ButtonText>
              </Button>
              <Button
                size="sm"
                variant={question.selfVoted === -1 ? "solid" : "outline"}
                disabled={question.selfVoted === -1}
                onPress={() =>
                  downvoteQuestion({
                    pathParams: { questionId: question.id },
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

        <View className="rounded-lg bg-neutral-100 p-4">
          <ContentWithSnippets content={question.content} />
        </View>

        <Text className="text-2xl font-bold">Answers</Text>

        <Button
          onPress={() => {
            router.push(`/question/${question.id}/answer`);
          }}
        >
          <ButtonText>Write a new answer</ButtonText>
        </Button>

        {questionId && <Answers questionId={Number(questionId)} />}
      </ScrollView>
    </VStack>
  );
}
