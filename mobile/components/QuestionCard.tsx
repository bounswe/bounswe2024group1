import { Card } from "@/components/ui/card";

import { Link } from "expo-router";
import { ArrowRight, MessageSquare, Star } from "lucide-react";
import React from "react";

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
        <p className="line-clamp-3 text-sm font-light text-gray-600">
          {content}
        </p>
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
          <Link to={`/users/${author.id}`} className="h-10 w-10">
            <img
              src={author.profilePicture}
              alt={author.name}
              className="h-full w-full rounded-full object-cover"
            />
          </Link>
          <Link
            to={`/questions/${id}`}
            className="flex items-center text-sm font-medium text-gray-600 hover:underline"
          >
            Go to question
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </View>
      </View>
    </Card>
  );
};
