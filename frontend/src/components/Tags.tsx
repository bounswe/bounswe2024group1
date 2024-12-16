//import { CreateTagForm } from "@/components/CreateTagForm";
import Plus from "@/assets/Icon/General/Plus.svg?react";
import ErrorAlert from "@/components/ErrorAlert";
import { TagCard } from "@/components/TagCard";
import { Button } from "@/components/ui/button"; // Assuming Button is a component
import { useSearchTags } from "@/services/api/programmingForumComponents"; // Import your API hook
import { TagDetails } from "@/services/api/programmingForumSchemas"; // Assuming this is the correct type for tags
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";

export default function TagsPage() {
  const [params] = useSearchParams();
  const [pageSize, setPageSize] = useState(20);
  const [previousData, setPreviousData] = useState<{
    items: TagDetails[];
    totalItems: number;
  }>({ items: [], totalItems: 0 });

  const {
    data: searchResult,
    isLoading,
    error,
  } = useSearchTags(
    {
      queryParams: { q: params.get("q") ?? "", pageSize },
    },
    {},
  );

  useEffect(() => {
    if (searchResult?.data && !isLoading) {
      setPreviousData(searchResult.data as typeof previousData);
    }
  }, [searchResult, isLoading]);

  const searchResultData =
    (searchResult?.data as {
      items?: TagDetails[];
      totalItems?: number;
    }) || previousData;

  const next = () => {
    setPageSize(pageSize + 20);
  };

  // If there is an error during the fetch, display the error alert
  if (error) {
    return <ErrorAlert error={error} />;
  }

  // Extracting tags from the API response
  const tags = searchResultData.items || [];

  return (
    <div className="container py-8">
      {/* Container for the title and the plus button */}
      <div className="flex items-center gap-2 py-4">
        <h1 className="text-2xl font-bold">Tags</h1>

        {/* Button to navigate to create tag page */}
        <Button
          asChild
          size="icon"
          className="rounded-full bg-red-500 text-white"
        >
          <Link to="/tags/new">
            <Plus />
          </Link>
        </Button>
      </div>

      {/* Section for displaying all tags */}
      <div>
        <div className="grid grid-cols-3 gap-4">
          <InfiniteScroll
            next={next}
            hasMore={
              searchResultData.totalItems
                ? searchResultData.totalItems > pageSize
                : false
            }
            isLoading={isLoading}
          >
            {tags?.map((tag) => <TagCard key={tag.tagId} tag={tag} />)}
          </InfiniteScroll>
          {isLoading && (
            <div className="col-span-3 flex w-full items-center justify-center">
              <Loader2
                className="h-16 w-16 animate-spin text-primary"
              />
              <div className="ml-4 text-lg font-normal duration-500 animate-in fade-in">
                Loading...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
