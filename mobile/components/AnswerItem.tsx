import { Text } from "@/components/ui";
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
    <Card className="border-none bg-neutral-150 px-6 py-8 shadow-sm">
      <View className="flex flex-col gap-4">
        <ContentWithSnippets content={answer.content} />
        <View className="flex items-center justify-between">
          <View className="flex items-center gap-4">
            <View className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              <Text className="font-bold">{answer.rating}</Text>
            </View>
            {token && (
              <View className="flex gap-2">
                <Button aria-label="Upvote" size="sm" onPress={onUpvote}>
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button
                  aria-label="Downvote"
                  size="sm"
                  variant="outline"
                  onPress={onDownvote}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </View>
            )}
          </View>
          <View className="flex flex-col items-end gap-1">
            <Link
              href={`/users/${answer.author?.id}`}
              className="flex items-center gap-2"
            >
              <img
                src={
                  answer.author?.profilePicture ||
                  "https://placehold.co/100x100"
                }
                alt={answer.author?.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <Text className="text-sm font-medium">{answer.author?.name}</Text>
            </Link>
            <Text className="text-xs text-gray-500">
              Answered: {new Date(answer.createdAt || "").toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};
