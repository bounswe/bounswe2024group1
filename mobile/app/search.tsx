import ErrorAlert from "@/components/ErrorAlert";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { TagCard } from "@/components/TagCard";
import { Text } from "@/components/ui";
import { useSearchTags } from "@/services/api/programmingForumComponents";
import { TagSummary } from "@/services/api/programmingForumSchemas";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
export const Search = () => {
  const { q } = useLocalSearchParams<{ q: string }>();
  const {
    data: searchResult,
    isLoading,
    error,
  } = useSearchTags({
    queryParams: {
      q,
    },
  });

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }
  if (error) {
    return <ErrorAlert error={error} />;
  }
  const tags = (searchResult?.data as { items?: TagSummary[] }).items || [];

  return (
    <View className="container flex flex-col gap-2 py-8">
      <Text className="text-2xl font-bold ">
        {tags.length ? `Found ${tags.length} results` : "No tags found"}
      </Text>
      {!tags.length && <p>Try searching for "python", or "javascript"</p>}
      <View className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {tags.map((tag) => (
          <TagCard key={tag.id} tag={tag} />
        ))}
      </View>
    </View>
  );
};
