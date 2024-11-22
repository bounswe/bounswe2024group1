import { Icon, Image, Text } from "@/components/ui";
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
    <Card className="">
      <View className="flex flex-col gap-6">
        <Text className="line-clamp-2 text-xl font-semibold text-gray-800">
          {tag.name}
        </Text>
        <View className="flex items-start gap-2">
          <Text className="line-clamp-3 text-sm font-light text-gray-800">
            {tag.description}
          </Text>
        </View>
        <View className="flex flex-col gap-3 text-xs text-gray-700">
          <View className="flex flex-row items-center gap-1">
            <Users size={16} color={"#000"} />
            <Text>{tag.followerCount} followers</Text>
          </View>
          <View className="flex flex-row items-center gap-1">
            <Hash size={16} color={"#000"} />
            <Text>{tag.questionCount} questions</Text>
          </View>
        </View>
        <View className="flex items-center justify-between">
          {tag.photo && (
            <View className="rounded-full">
              <View className="h-10 w-10 overflow-hidden rounded-full">
                <Image
                  source={{ uri: tag.photo }}
                  alt={tag.name}
                  resizeMode="contain"
                />
              </View>
            </View>
          )}
          <Link
            href={`/tags/${tag.tagId}`}
            className="flex-row items-center text-sm font-medium text-gray-800 hover:underline"
          >
            <Text>View tag</Text>
            <Icon as={ArrowRight} size="sm" className="ml-1" />
          </Link>
        </View>
      </View>
    </Card>
  );
};
