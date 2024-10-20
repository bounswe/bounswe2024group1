// TODO : Replace mock data calls with API calls when backend is ready

// import { useMemo } from "react";
// import { flag } from "country-emoji";
import { Link, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
// import MeatDish from "@/assets/Icon/Food/MeatDish.svg?react";
import {
  useGetTagDetails,
  useGetQuestionDetails,
} from "@/services/api/programmingForumComponents";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import ErrorAlert from "@/components/ErrorAlert";
// import { Recipe } from "@/components/Recipe";
import { QuestionCard } from "@/components/QuestionCard"; // Import your QuestionCard component
import { Button } from "@/components/ui/button";
import useAuthStore from "@/services/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const { data: questionsRecent } = useGetQuestionDetails(
    {
      pathParams: { questionId: 1 },
    },
    {
      enabled: true,
    },
  );

  const { data: questionsTop } = useGetQuestionDetails(
    {
      pathParams: { questionId: 1 },
    },
    {
      enabled: true,
    },
  );
  const tag = data?.data;
  const token = useAuthStore((s) => s.token);
  //const { countries } = dish || {};

  // const countryEmojis = useMemo(() => {
  //   return (countries || "").split(", ").map(flag).join(" ");
  // }, [countries]);
  // const token = useAuthStore((s) => s.token);

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

  return (
    <div className="container flex flex-col gap-4 self-stretch justify-self-stretch py-16">
      <div className="flex items-center justify-between">
        <h1>{tag.name}</h1>
      </div>
      <img
        src={tag?.photo || "https://placehold.co/400x300"}
        alt={tag.name}
        className="h-48 w-full rounded-3xl object-contain lg:h-96"
      />
      <span className="">{tag.description}</span>

      <div className="mt-4 flex flex-col gap-4 px-4 py-2">
        <div className="flex items-center gap-4">
          <h3>Questions</h3>
          {!!token && (
            <Button
              asChild
              size="icon"
              className="rounded-full bg-red-500 text-white"
            >
              <Link to={`/questions/new?tagId=${tag.id}`}>
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
          <TabsContent value="top-rated">
            <div className="grid grid-cols-3 gap-4">
              {questionsTop?.data && (
                <QuestionCard
                  id={questionsTop.data.id}
                  title={questionsTop.data.title}
                  content={questionsTop.data.content}
                  votes={questionsTop.data.rating}
                  answerCount={questionsTop.data.answerCount}
                  author={questionsTop.data.author}
                />
              )}
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <div className="grid grid-cols-3 gap-4">
              {questionsRecent?.data && (
                <QuestionCard
                  id={questionsRecent.data.id}
                  title={questionsRecent.data.title}
                  content={questionsRecent.data.content}
                  votes={questionsRecent.data.rating}
                  answerCount={questionsRecent.data.answerCount}
                  author={questionsRecent?.data?.author}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
