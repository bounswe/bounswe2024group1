import ErrorAlert from "@/components/ErrorAlert";
import InfiniteScroll from "@/components/InfiniteScroll";
import { TagCard } from "@/components/TagCard";
import { useSearchTags } from "@/services/api/programmingForumComponents";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Search = () => {
  const [params] = useSearchParams();
  const [pageSize, setPageSize] = useState(20);
  const [previousData, setPreviousData] = useState<{
    items: TagDetails[];
    totalItems: number;
  }>({
    items: [],
    totalItems: 0,
  });

  const {
    data: searchResult,
    isLoading,
    error,
  } = useSearchTags({
    queryParams: {
      q: params.get("q") ?? "",
      pageSize,
    },
  });

  useEffect(() => {
    if (searchResult?.data && !isLoading) {
      setPreviousData(searchResult.data as typeof previousData);
    }
  }, [searchResult, isLoading]);

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const searchResultData =
    (searchResult?.data as {
      items?: TagDetails[];
      totalItems?: number;
    }) || previousData;

  const tags = searchResultData.items || [];

  const next = () => {
    setPageSize(pageSize + 20);
  };

  return (
    <div className="container flex flex-col gap-2 py-8">
      <h1 className="text-2xl font-bold ">
        {tags.length
          ? `Found ${searchResultData.totalItems} results`
          : "No tags found"}
      </h1>
      {!tags.length && <p>Try searching for "python", or "javascript"</p>}

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <InfiniteScroll
            next={next}
            hasMore={
              searchResultData.totalItems
                ? searchResultData.totalItems > pageSize
                : false
            }
            isLoading={isLoading}
          >
            {tags.map((tag) => (
              <TagCard key={tag.tagId} tag={tag} />
            ))}
          </InfiniteScroll>
        </div>
        {isLoading && (
          <div className="col-span-3 flex w-full items-center justify-center">
            <Loader2
              aria-label="Loading"
              className="h-16 w-16 animate-spin text-primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};
