//import { CreateTagForm } from "@/components/CreateTagForm";
import { TagCard } from "@/components/TagCard";
import { useSearchTags } from "@/services/api/programmingForumComponents"; // Import your API hook
import { TagDetails } from "@/services/api/programmingForumSchemas"; // Assuming this is the correct type for tags
import { FullscreenLoading } from "../components/FullscreenLoading";
import { useSearchParams, Link } from "react-router-dom";
import ErrorAlert from "@/components/ErrorAlert";
import { Button } from "@/components/ui/button"; // Assuming Button is a component
import Plus from "@/assets/Icon/General/Plus.svg?react";

export default function TagsPage() {
  // Using the `useSearchTags` hook to fetch the default 20 tags
  const [params] = useSearchParams();
  const {
    data: searchResult,
    isLoading,
    error,
  } = useSearchTags({
    queryParams: { q: params.get("q") ?? "" }, // No query parameter needed to fetch the default 20 tags
  });

  // If the API is still loading, show the loading component
  if (isLoading) {
    return <FullscreenLoading overlay />;
  }

  // If there is an error during the fetch, display the error alert
  if (error) {
    return <ErrorAlert error={error} />;
  }

  // Extracting tags from the API response
  const tags = (searchResult?.data as { items?: TagDetails[] }).items || [];

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
          {tags.map((tag) => (
            <TagCard key={tag.tagId} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
