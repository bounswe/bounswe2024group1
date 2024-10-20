import ErrorAlert from "@/components/ErrorAlert";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { TagCard } from "@/components/TagCard";
import {
  Button,
  ButtonText,
  HStack,
  Icon,
  Input,
  InputField,
  Text,
} from "@/components/ui";
import { useSearchTags } from "@/services/api/programmingForumComponents";
import { TagSummary } from "@/services/api/programmingForumSchemas";
import { router, useLocalSearchParams } from "expo-router";
import { Search } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function SearchScreen() {
  const { q } = useLocalSearchParams<{ q: string }>();
  const [searchQuery, setSearchQuery] = useState(q);
  const {
    data: searchResult,
    isLoading,
    error,
  } = useSearchTags(
    {
      queryParams: {
        q,
      },
    },
    { enabled: !!q }
  );

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }
  if (error) {
    return <ErrorAlert error={error} />;
  }
  const tags = (searchResult?.data as { items?: TagSummary[] })?.items || [];

  return (
    <View className="flex flex-col gap-4 py-8">
      <HStack space="md" className="px-4">
        <Input className="flex-1 mb-4">
          <InputField
            className="flex-1"
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Input>
        <Button
          variant="outline"
          size="sm"
          onPress={() => {
            router.setParams({ q: searchQuery });
          }}
        >
          <Icon as={Search} size="sm" />
          <ButtonText>Search</ButtonText>
        </Button>
      </HStack>
      <ScrollView contentContainerClassName="container flex flex-col gap-2 px-4">
        <Text className="text-2xl font-bold ">
          {tags.length
            ? `Found ${tags.length} results`
            : !q
              ? "Search for tags"
              : "No tags found"}
        </Text>
        {!tags.length && (
          <Text>Try searching for "python", or "javascript"</Text>
        )}
        <View className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tags.map((tag) => (
            <TagCard key={tag.id} tag={tag} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
