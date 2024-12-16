import { TagSubtypeCard } from "@/components/SubtypeCard";
import { useSearchTags } from "@/services/api/programmingForumComponents";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";

export default function GlossaryPage() {
  const [tagCounts, setTagCounts] = useState<
    { typeId: string; tagCount: number; description: string }[] // Added description field
  >([]);
  const [, setAvailableTags] = useState<TagDetails[]>([]);

  const {
    data: tagSearchData,
    isLoading,
    error,
  } = useSearchTags(
    { queryParams: { q: "", pageSize: 400 } },
    { enabled: true },
  );

  useEffect(() => {
    if (tagSearchData?.data) {
      // Extract available tags
      const tags = (tagSearchData.data as { items: TagDetails[] }).items;
      setAvailableTags(tags);

      // Define the 4 tag types with descriptions from wikidata
      const tagTypes = [
        {
          typeId: "Programming Language",
          description: "language for communicating instructions to a machine",
        },
        {
          typeId: "Software Library",
          description:
            "collection of non-volatile resources used by computer programs, often for software development",
        },
        {
          typeId: "Programming Paradigm",
          description:
            "category of programming languages according to what methodology of designing and implementing programs their features support",
        },
        {
          typeId: "Computer Science Topic",
          description:
            "technical term; word or phrase that is part of computer science terminology",
        },
      ];

      // group and count tags by tagType
      const counts = tagTypes.map((type) => {
        const filteredTags = tags.filter((tag) => tag.tagType === type.typeId);
        return {
          typeId: type.typeId,
          tagCount: filteredTags.length,
          description: type.description,
        };
      });

      setTagCounts(counts);
    }
  }, [tagSearchData]);

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <div className="container py-8">
      <h1 className="mb-4 text-4xl font-bold">Explore Various Tag Types</h1>
      <div className="grid grid-cols-4 gap-4 py-4">
        {tagCounts.map((tagCount) => (
          <TagSubtypeCard key={tagCount.typeId} tagSubtype={tagCount} />
        ))}

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
}
