// TODO : Replace mock data calls with API calls when backend is ready

// import { useMemo } from "react";
// import { flag } from "country-emoji";
import {
  Calendar,
  FileText,
  LinkIcon,
  Plus,
  SquareStack,
  Tag,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
// import MeatDish from "@/assets/Icon/Food/MeatDish.svg?react";
import ErrorAlert from "@/components/ErrorAlert";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import {
  useGetTagDetails,
  useSearchQuestions,
} from "@/services/api/programmingForumComponents";
// import { Recipe } from "@/components/Recipe";
import { DifficultyFilter } from "@/components/DifficultyFilter";
import { HighlightedQuestionsBox } from "@/components/HighlightedQuestionsBox";
import { QuestionCard } from "@/components/QuestionCard"; // Import your QuestionCard component
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DifficultyLevel,
  QuestionSummary,
} from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { useState } from "react";

export default function TagPage() {
  const { tagId } = useParams();

  const { data, isLoading, error } = useGetTagDetails(
    {
      pathParams: { tagId: tagId! },
    },
    {
      enabled: !!tagId,
    },
  );

  const token = useAuthStore((s) => s.token);
  const experienceLevel = useAuthStore((s) => s.selfProfile?.experienceLevel);

  const tag = data?.data;

  const [difficulty, setDifficulty] = useState<DifficultyLevel>();

  const { data: questionSearch, isLoading: isQuestionSearchLoading } =
    useSearchQuestions(
      {
        queryParams: {
          tags: tag?.tagId,
          q: "",
          pageSize: 1000,
          ...(difficulty && { difficulty }),
        },
      },
      {
        enabled: !!tag,
      },
    );

  const questions =
    (questionSearch?.data as unknown as { items: QuestionSummary[] })?.items ||
    [];

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!tag) {
    return (
      <ErrorAlert
        error={{
          status: 404,
          payload: { status: 404, message: "Tag not found." },
        }}
      />
    );
  }

  const shouldShowHighlightedQuestions =
    !experienceLevel || experienceLevel === "BEGINNER";
  // TODO: fix this when backend catches up
  const relatedQuestions = tag?.relatedQuestions || [];
  return (
    <div className="container flex flex-col gap-4 self-stretch justify-self-stretch py-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <h1>{tag.name}</h1>
        </div>
      </div>
      {tag.logoImage && (
        <img
          src={tag?.logoImage || "https://placehold.co/400x300"}
          alt={`The logo image of ${tag.name}`}
          title={`alt:The logo image of ${tag.name}`}
          className="h-48 w-full rounded-3xl object-contain lg:h-96"
        />
      )}
      <div className="mb-4 flex items-center justify-between px-1">
        <span className="flex-1">{tag.description}</span>
        <div className="flex items-center gap-1">
          <div className="font-bold">{tag.followerCount}</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {tag.fileExtension && (
          <div
            className="flex items-center gap-2"
            aria-label={`File extension for ${tag.name} is ${tag.fileExtension}`}
          >
            <FileText className="h-5 w-5" />

            <span className="text-sm text-gray-500">{tag.fileExtension}</span>
          </div>
        )}
        {tag.inceptionYear && (
          <div
            className="flex items-center gap-2"
            aria-label={`Inception year for ${tag.name} is ${tag.inceptionYear}`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-sm text-gray-500">
              Created in {new Date(tag.inceptionYear).toLocaleDateString()}
            </span>
          </div>
        )}
        {tag.officialWebsite && (
          <div
            className="flex items-center gap-2"
            aria-label={`Official website for ${tag.name} is ${tag.officialWebsite}`}
          >
            <Link
              to={tag.officialWebsite}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500"
              target="_blank"
            >
              <LinkIcon className="h-5 w-5" /> Official Website
            </Link>
          </div>
        )}
        {tag.stackExchangeTag && (
          <div
            className="flex items-center gap-2"
            aria-label={`Stack Exchange tag for ${tag.name} is ${tag.stackExchangeTag}`}
          >
            <SquareStack className="h-5 w-5" />

            <Link
              to={tag.stackExchangeTag}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500"
              target="_blank"
            >
              Stack Exchange
            </Link>
          </div>
        )}
        {tag.tagType && (
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            <span className="text-sm text-gray-500">{tag.tagType}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-4 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3>Questions</h3>
            {!!token && (
              <Button
                asChild
                size="icon"
                className="rounded-full bg-red-500 text-white"
              >
                <Link to={`/questions/new?tagIds=${tag.tagId}`}>
                  <Plus />
                </Link>
              </Button>
            )}
          </div>
          <DifficultyFilter value={difficulty} onChange={setDifficulty} />
        </div>
        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <TabsContent value="top-rated" className="flex flex-col gap-4">
            {shouldShowHighlightedQuestions && (
              <HighlightedQuestionsBox questions={relatedQuestions} />
            )}
            <div className="grid grid-cols-3 gap-4">
              {questions &&
                questions.map((question) => (
                  <QuestionCard
                    difficulty={question.difficulty}
                    key={question.id}
                    id={question.id}
                    title={question.title}
                    content={question.content ?? ""}
                    votes={question.likeCount ?? 0}
                    answerCount={question.commentCount ?? 0}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="recent" className="flex flex-col gap-4">
            {shouldShowHighlightedQuestions && (
              <HighlightedQuestionsBox questions={relatedQuestions} />
            )}

            <div className="grid grid-cols-3 gap-4">
              {isQuestionSearchLoading && <FullscreenLoading />}
              {questions &&
                questions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    id={question.id}
                    difficulty={question.difficulty}
                    title={question.title}
                    content={question.content ?? ""}
                    votes={
                      ((question as unknown as { upvoteCount: number })
                        .upvoteCount ?? 0) -
                      ((question as unknown as { downvoteCount: number })
                        .downvoteCount ?? 0)
                    }
                    answerCount={
                      (question as unknown as { answerCount: number })
                        .answerCount ?? 0
                    }
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
