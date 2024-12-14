import { SearchTagsQueryParams, useSearchTags, SearchTagsResponse } from "@/services/api/programmingForumComponents";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useState } from "react";
import { TagCard } from "@/components/TagCard";
import React from "react";

interface TagListProps {
  searchQueryParams?: string;
  pagesize?: number;
}

export const TagList: React.FC<TagListProps> = ({ searchQueryParams="", pagesize=20}) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(pagesize); 

  const q: SearchTagsQueryParams = {
    q: searchQueryParams,
    page,
    pageSize,
  };

  // Fetch tags
  const { data: tagSearchData, isLoading: isLoadingTags, error: tagsError } = useSearchTags({
    queryParams: q,
  });

  const isTagsResponseObject = (
    data: SearchTagsResponse["data"]
  ): data is Exclude<SearchTagsResponse["data"], any[]> => {
    return typeof data === "object" && !Array.isArray(data);
  };

  const tags = tagSearchData && isTagsResponseObject(tagSearchData.data) ? tagSearchData.data.items : [];
  const totalPages = tagSearchData && isTagsResponseObject(tagSearchData.data) ? tagSearchData.data.totalPages : 0;

  const isLoading = isLoadingTags;

  const handleNextPage = () => {
    if (page < (totalPages ?? 0)) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <View>
      {isLoading && <ActivityIndicator size="large" />}
      {tagsError && <Text>Error: {tagsError.status}</Text>}
      {tags && (
        <View className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tags
            .map((tag) => (
              <TagCard key={tag.tagId} tag={tag} />
            )
          )}
        </View>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
        <Button title="Previous" onPress={handlePreviousPage} disabled={page === 1} />
        <Text>Page {page} of {totalPages}</Text>
        <Button title="Next" onPress={handleNextPage} disabled={page === totalPages || isLoading} />
      </View>
    </View>
  );
};