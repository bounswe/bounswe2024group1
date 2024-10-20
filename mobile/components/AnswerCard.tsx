import { Text } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { Link } from "expo-router";
import { ArrowRight, CornerDownRight, Star } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

interface AnswerCardProps {
  id: string;
  title: string;
  content: string;
  votes: number;
  author: {
    id: string;
    name: string;
    profilePicture: string;
  };
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  id,
  title,
  content,
  votes,
  author,
}) => {
  return (
    <Card className="border-none bg-neutral-150 px-6 py-8 shadow-sm">
      <View className="flex flex-col gap-6">
        <Text className="line-clamp-2 text-xl font-semibold text-gray-800">
          {title}
        </Text>
        <View className="flex items-start gap-2">
          <View className="mt-2 flex-shrink-0">
            <CornerDownRight size={24} />
          </View>
          <p className="line-clamp-3 text-sm font-light text-gray-600">
            {content}
          </p>
        </View>
        <View className="flex flex-col gap-3 text-xs text-gray-500">
          <View className="flex items-center gap-1">
            <Star size={16} />
            <Text>{votes} votes</Text>
          </View>
        </View>
        <View className="flex items-center justify-between">
          <Link href={`/users/${author.id}`}>
            <img
              src={author.profilePicture}
              alt={author.name}
              className="rounded-full object-cover"
            />
          </Link>
          <Link
            href={`/question/${id}?answerId=${id}`}
            className="flex items-center text-sm font-medium text-gray-600 hover:underline"
          >
            Go to answer
            <ArrowRight size={16} />
          </Link>
        </View>
      </View>
    </Card>
  );
};
