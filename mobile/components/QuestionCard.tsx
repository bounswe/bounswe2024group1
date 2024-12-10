import { Icon, Image, Text } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { DifficultyLevel } from "@/services/api/programmingForumSchemas";
import { Link } from "expo-router";
import {
  ArrowRight,
  MessageSquare,
  Star,
  StarsIcon,
} from "lucide-react-native";
import React from "react";
import { View } from "react-native";

interface QuestionCardProps {
  id: string;
  title: string;
  content?: string;
  votes: number;
  answerCount: number;
  difficulty?: DifficultyLevel;
  author?: {
    id: number;
    name: string;
    profilePicture: string;
  };
  highlighted?: boolean;
}
const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  title,
  content,
  votes,
  answerCount,
  difficulty,
  author,
  highlighted = false,
}) => {
  return (
    <Card
      className={`px-6 py-8 shadow-sm ${
        highlighted ? "bg-blue-100 border-blue-500" : "#e5e5e5"
      }`}
    >
      <View className="flex flex-col gap-6">
        {highlighted && (
          <Text className="text-xs font-semibold text-blue-700">
            Beginner Friendly
          </Text>
        )}

        <Text
          className={`line-clamp-2 text-xl font-semibold ${
            highlighted ? "text-blue-800" : "text-gray-800"
          }`}
        >
          {title}
        </Text>
        <Text
          className={`line-clamp-3 text-sm font-light ${
            highlighted ? "text-blue-700" : "text-gray-800"
          }`}
        >
          {content}
        </Text>
        <View className="flex flex-col gap-3 text-xs text-gray-700">
          <View className="flex items-center gap-1">
            <Star className={`h-4 w-4 ${highlighted ? "text-blue-600" : ""}`} />
            <Text>{votes} votes</Text>
          </View>
          <View className="flex items-center gap-1">
            <MessageSquare
              className={`h-4 w-4 ${highlighted ? "text-blue-600" : ""}`}
            />
            <Text>{answerCount} answers</Text>
          </View>
          {difficulty && (
            <View className="flex items-center gap-1">
              <StarsIcon className="h-4 w-4" />
              <Text>{capitalizeString(difficulty)}</Text>
            </View>
          )}
        </View>
        <View className="flex items-center justify-between">
          {author && (
            <Link href={`/users/${author.id}`} className="h-10 w-10">
              <Image
                source={{ uri: author.profilePicture }}
                alt={author.name}
                className="h-full w-full rounded-full object-cover"
              />
            </Link>
          )}
          <Link
            href={`/question/${id}`}
            className={`flex items-center text-sm space-x-2 font-medium p-2 ${
              highlighted ? "text-blue-600" : "text-gray-800"
            }`}
          >
            <Text>Go to question</Text>
            <Icon as={ArrowRight} className="h-4 w-4 text-gray-800" />
          </Link>
        </View>
      </View>
    </Card>
  );
};
