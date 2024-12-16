import ErrorAlert from "@/components/ErrorAlert";
import InfiniteScroll from "@/components/InfiniteScroll";
import { TagCard } from "@/components/TagCard";
import { useSearchTags } from "@/services/api/programmingForumComponents";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SubtypePage() {
  const { typeId } = useParams<{ typeId: string }>();
  const [tags, setTags] = useState<TagDetails[]>([]);
  const [tagTypeId, setTagTypeId] = useState<string | undefined>();

  const [pageSize, setPageSize] = useState(20);
  const [previousData, setPreviousData] = useState<{
    items: TagDetails[];
    totalItems: number;
  }>({ items: [], totalItems: 0 });

  const {
    data: tagSearchData,
    isLoading,
    error,
  } = useSearchTags(
    {
      queryParams: { q: "", pageSize },
    },
    { enabled: true },
  );

  useEffect(() => {
    if (tagSearchData?.data) {
      const availableTags = (tagSearchData.data as { items: TagDetails[] })
        .items;

      // Filter tags by the typeId
      const filteredTags = availableTags.filter(
        (tag) => tag.tagType === typeId,
      );

      setTags(filteredTags);

      // Set the tag type name and description
      if (filteredTags.length > 0) {
        setTagTypeId(typeId);
        //setTagDescription(`Description for ${typeId} tags.`); // Replace with actual description if available
      } else {
        setTagTypeId("Unknown Tag Type");
        //setTagDescription("No description available for this tag type.");
      }
    }
  }, [tagSearchData, typeId]);

  useEffect(() => {
    if (tagSearchData?.data && !isLoading) {
      setPreviousData(tagSearchData.data as typeof previousData);
    }
  }, [tagSearchData, isLoading]);

  const searchResultData =
    (tagSearchData?.data as {
      items?: TagDetails[];
      totalItems?: number;
    }) || previousData;

  const next = () => {
    setPageSize(pageSize + 20);
  };

  //descriptions for the tag types
  const getDescription = (TypeId: string) => {
    switch (TypeId) {
      case "Programming Language":
        return (
          <p>
            A programming language is a formal system used to communicate
            instructions to a machine, particularly a computer. It consists of
            syntax, semantics, and rules that allow developers to write software
            and algorithms. Programming languages enable the creation of
            programs that can execute tasks ranging from simple calculations to
            complex data processing and system management. Well-known examples
            include Python, Java, and C++.
          </p>
        );
      case "Programming Paradigm":
        return (
          <p>
            A programming paradigm refers to a fundamental style or approach to
            programming that influences how software is structured and
            developed. It encompasses the methodologies and principles that
            guide the design and implementation of programs, including
            object-oriented programming, functional programming, and procedural
            programming. Different paradigms offer distinct ways of thinking
            about and solving problems in software development.
          </p>
        );
      case "Computer Science Term":
        return (
          <p>
            A computer science term is a word or phrase that is part of the
            technical vocabulary of computer science. These terms represent
            concepts, theories, tools, or techniques that are essential to
            understanding the field. Examples include terms like algorithm, data
            structure, machine learning, and artificial intelligence. These
            terms form the foundation of communication and learning within the
            computer science discipline.
          </p>
        );
      case "Software Library":
        return (
          <p>
            A software library is a collection of pre-written code, functions,
            and resources that developers can use to perform common tasks
            without having to write code from scratch. Libraries are designed to
            provide reusable components for tasks such as data manipulation,
            user interface design, and network communication. Popular software
            libraries include jQuery for web development, TensorFlow for machine
            learning, and NumPy for numerical computations.
          </p>
        );
    }
  };

  const description = typeId ? (
    getDescription(typeId)
  ) : (
    <p>Loading description...</p>
  );

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <div className="container py-8">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2
            aria-label="Loading"
            className="h-16 w-16 animate-spin text-primary"
          />
        </div>
      ) : (
        <>
          {/* Header */}
          <h1 className="mb-4 text-4xl font-bold text-gray-800">{tagTypeId}</h1>

          {/* Render the description based on typeId */}
          <div className="mb-6 text-lg text-gray-700">{description}</div>

          {/* Tags in this type */}
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Tags in Category
          </h2>

          {/* Infinite Scroll for displaying Related Tags */}
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
              {tags.length > 0 ? (
                tags.map((tag) => <TagCard key={tag.tagId} tag={tag} />)
              ) : (
                <p className="col-span-3 text-center text-gray-600">
                  No related tags found for this tag type.
                </p>
              )}
            </InfiniteScroll>
          </div>
        </>
      )}
    </div>
  );
}
