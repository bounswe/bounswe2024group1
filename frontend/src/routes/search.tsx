import ErrorAlert from "@/components/ErrorAlert";
import { TagCard } from "@/components/TagCard";
import { useSearchTags } from "@/services/api/programmingForumComponents";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import { useSearchParams } from "react-router-dom";
import { FullscreenLoading } from "../components/FullscreenLoading";

export const Search = () => {
  const [params] = useSearchParams();
  const {
    data: searchResult,
    isLoading,
    error,
  } = useSearchTags({
    queryParams: {
      q: params.get("q") ?? "",
    },
  });

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }
  if (error) {
    return <ErrorAlert error={error} />;
  }
  const tags = (searchResult?.data as { items?: TagDetails[] }).items || [];

  return (
    <div className="container flex flex-col gap-2 py-8">
      <h1 className="text-2xl font-bold ">
        {tags.length ? `Found ${tags.length} results` : "No tags found"}
      </h1>
      {!tags.length && <p>Try searching for "python", or "javascript"</p>}
      <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {tags.map((tag) => (
          <TagCard key={tag.tagId} tag={tag} />
        ))}
      </div>
    </div>
  );
};
