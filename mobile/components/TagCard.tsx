import { Text } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import { Link } from "expo-router";
import { ArrowRight, Hash, Users } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

interface TagCardProps {
  tag: TagDetails;
}

export const TagCard: React.FC<TagCardProps> = ({ tag }) => {
  return (
    <Card className="border-none bg-neutral-150 px-6 py-8 shadow-sm">
      <View className="flex flex-col gap-6">
        <Text className="line-clamp-2 text-xl font-semibold text-gray-800">
          {tag.name}
        </Text>
        <View className="flex items-start gap-2">
          <p className="line-clamp-3 text-sm font-light text-gray-600">
            {tag.description}
          </p>
        </View>
        <View className="flex flex-col gap-3 text-xs text-gray-500">
          <View className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <Text>{tag.followersCount} followers</Text>
          </View>
          <View className="flex items-center gap-1">
            <Hash className="h-4 w-4" />
            <Text>{tag.questionCount} questions</Text>
          </View>
        </View>
        <View className="flex items-center justify-between">
          {tag.photo && (
            <View className="h-10 w-10">
              <img
                src={tag.photo}
                alt={tag.name}
                className="rounded-full object-cover"
              />
            </View>
          )}
          <Link
            href={`/tags/${tag.id}`}
            className="flex items-center text-sm font-medium text-gray-600 hover:underline"
          >
            View tag
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </View>
      </View>
    </Card>
  );
};
