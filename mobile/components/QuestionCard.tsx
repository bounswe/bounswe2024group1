import { Card, HStack, Icon, Image, Text, View } from "@/components/ui";
import { DifficultyLevel } from "@/services/api/programmingForumSchemas";
import { Link } from "expo-router";
import { ArrowRight, MessageSquare, Star, StarsIcon } from "lucide-react-native";
import React from "react";
import placeholderProfile from "@/assets/placeholder_profile.png";

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
      className={`rounded-lg border-none text-card-foreground flex flex-1 px-6 py-8 shadow-sm ${
        highlighted ? "bg-blue-100 border-blue-500" : "bg-neutral-150"
      }`}
    >
      <View className="flex flex-col gap-6">
        {(highlighted || answerCount === 0) && (
          <HStack className="gap-4">
            {highlighted && (
              <Text className="text-xs font-semibold text-blue-700 bg-blue-300 p-1 rounded-lg">
                Beginner Friendly
              </Text>
            )}
            
            {/* Unanswered notification with background */}
            {answerCount === 0 && (
              <Text className="text-xs font-semibold text-red-600 bg-red-200 p-1 rounded-lg">
                Unanswered
              </Text>
            )}
          </HStack>
          )
        }

        {author && (
          <HStack className="flex items-center gap-2">
            <Link href={`/users/${author.id}`} className="h-10 w-10">
              <Image
                source={{
                  uri: author?.profilePicture || placeholderProfile,
                }}
                alt={author.name || "Author"}
                className="h-full w-full rounded-full object-cover"
              />
            </Link>
            <Link href={`/users/${author.id}`} className="text-sm font-semibold">
              {author?.name}
            </Link>
          </HStack>
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
        <HStack className="flex flex-row gap-3 text-xs text-gray-700 justify-center items-center">
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
        </HStack>

        <View className="flex items-center justify-between">
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
