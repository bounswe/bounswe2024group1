// TODO : Replace mock data calls with API calls when backend is ready

// import { useMemo } from "react";
// import { flag } from "country-emoji";
import { Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
// import MeatDish from "@/assets/Icon/Food/MeatDish.svg?react";
import ErrorAlert from "@/components/ErrorAlert";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { useGetTagDetails } from "@/services/api/programmingForumComponents";
// import { Recipe } from "@/components/Recipe";
import { HighlightedQuestionsBox } from "@/components/HighlightedQuestionsBox";
import { QuestionCard } from "@/components/QuestionCard"; // Import your QuestionCard component
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthStore from "@/services/auth";

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

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const tag = data?.data;
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

  // TODO: fix this when backend catches up
  const questions = tag?.relatedQuestions || [];

  return (
    <div className="container flex flex-col gap-4 self-stretch justify-self-stretch py-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <h1>{tag.name}</h1>
        </div>
      </div>
      <img
        src={tag?.photo || "https://placehold.co/400x300"}
        alt={`The logo image of ${tag.name}`}
        title={`alt:The logo image of ${tag.name}`}
        className="h-48 w-full rounded-3xl object-contain lg:h-96"
      />
      <div className="mb-4 flex items-center justify-between px-1">
        <span className="flex-1">{tag.description}</span>
        <div className="flex items-center gap-1">
          <div className="font-bold">{tag.followerCount}</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 px-4 py-2">
        <div className="flex items-center gap-4">
          <h3>Questions</h3>
          {!!token && (
            <Button
              asChild
              size="icon"
              className="rounded-full bg-red-500 text-white"
            >
              <Link to={`/questions/new?tagId=${tag.tagId}`}>
                <Plus />
              </Link>
            </Button>
          )}
        </div>
        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <TabsContent value="top-rated" className="flex flex-col gap-4">
            {!experienceLevel ||
              (experienceLevel === "BEGINNER" && (
                <HighlightedQuestionsBox questions={questions || []} />
              ))}
            <div className="grid grid-cols-3 gap-4">
              {questions &&
                questions.map((question) => (
                  <QuestionCard
                    id={question.id}
                    title={question.title}
                    content={question.questionBody!}
                    votes={question.likeCount}
                    answerCount={question.commentCount}
                    author={question.author}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="recent" className="flex flex-col gap-4">
            {!experienceLevel ||
              (experienceLevel === "BEGINNER" && (
                <HighlightedQuestionsBox questions={questions || []} />
              ))}
            <div className="grid grid-cols-3 gap-4">
              {questions &&
                questions.map((question) => (
                  <QuestionCard
                    id={question.id}
                    title={question.title}
                    content={question.questionBody!}
                    votes={question.likeCount}
                    answerCount={question.commentCount}
                    author={question.author}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
