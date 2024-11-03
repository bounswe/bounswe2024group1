import { Card } from "@/components/ui/card";

import { Image, Text } from "@/components/ui";
import { Link } from "expo-router";
import { ArrowRight, MessageSquare, Star } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

interface QuestionCardProps {
  id: string;
  title: string;
  content: string;
  votes: number;
  answerCount: number;
  author: {
    id: string;
    name: string;
    profilePicture: string;
  };
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  title,
  content,
  votes,
  answerCount,
  author,
}) => {
  return (
    <Card className="border-none bg-neutral-150 px-6 py-8 shadow-sm">
      <View className="flex flex-col gap-6">
        <Text className="line-clamp-2 text-xl font-semibold text-gray-800">
          {title}
        </Text>
        <Text className="line-clamp-3 text-sm font-light text-gray-600">
          {content}
        </Text>
        <View className="flex flex-col gap-3 text-xs text-gray-500">
          <View className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <Text>{votes} votes</Text>
          </View>
          <View className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <Text>{answerCount} answers</Text>
          </View>
        </View>
        <View className="flex items-center justify-between">
          <Link href={`/users/${author.id}`} className="h-10 w-10">
            <Image
              source={{ uri: author.profilePicture }}
              alt={author.name}
              className="h-full w-full rounded-full object-cover"
            />
          </Link>
          <Link
            href={`/question/${id}`}
            className="flex items-center text-sm font-medium text-gray-600 hover:underline"
          >
            <Text>Go to question</Text>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </View>
      </View>
    </Card>
  );
};
