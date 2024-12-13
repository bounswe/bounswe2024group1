import { HStack, Icon, Image, Text } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnswerDetails } from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { Link } from "expo-router";
import { ThumbsDown, ThumbsUp } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { ContentWithSnippets } from "./ContentWithSnippets";

interface AnswerItemProps {
  answer: AnswerDetails;
  onUpvote: () => void;
  onDownvote: () => void;
}

export const AnswerItem: React.FC<AnswerItemProps> = ({
  answer,
  onUpvote,
  onDownvote,
}) => {
  const { token } = useAuthStore();

  return (
    <Card className="border-none bg-neutral-100 px-6 py-8 shadow-sm">
      <View className="flex flex-col gap-4">
        <ContentWithSnippets content={answer.content} />
        <HStack className="flex items-center justify-between">
          <HStack space="md" className="flex items-center gap-4">
            <HStack space="md" className="flex items-center gap-2">
              <ThumbsUp color="black" className="h-4 w-4" />
              <Text className="font-bold">
                {Number(answer.upvoteCount ?? "0") -
                  Number(answer.downvoteCount ?? "0")}
              </Text>
            </HStack>
            {token && (
              <HStack space="md" className="flex gap-2">
                <Button
                  className={answer.selfVoted === 1 ? "opacity-50" : ""}
                  disabled={answer.selfVoted === 1}
                  aria-label="Upvote"
                  size="sm"
                  onPress={onUpvote}
                >
                  <Icon as={ThumbsUp} size="sm" className="text-white" />
                </Button>
                <Button
                  className={answer.selfVoted === -1 ? "opacity-50" : ""}
                  aria-label="Downvote"
                  disabled={answer.selfVoted === -1}
                  size="sm"
                  variant="outline"
                  onPress={onDownvote}
                >
                  <Icon
                    as={ThumbsDown}
                    size="sm"
                    className="text-primary-500"
                  />
                </Button>
              </HStack>
            )}
          </HStack>
          <View className="flex flex-col items-end gap-1">
            <Link
              href={`/users/${answer.author?.id}`}
              className="flex items-center gap-2"
            >
              <Image
                source={{
                  uri:
                    answer.author?.profilePicture ||
                    "https://placehold.co/100x100",
                }}
                alt={answer.author?.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <Text className="text-sm font-medium">{answer.author?.name}</Text>
            </Link>
            <Text className="text-xs text-gray-700">
              Answered: {new Date(answer.createdAt || "").toLocaleDateString()}
            </Text>
          </View>
        </HStack>
      </View>
    </Card>
  );
};
