import ErrorAlert from "@/components/ErrorAlert";
import { ExerciseCard } from "@/components/ExerciseCard"; // Import ExerciseCard component
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { QuestionCard } from "@/components/QuestionCard";
import { TagCard } from "@/components/TagCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useSearchQuestions,
  useSearchTags,
} from "@/services/api/programmingForumComponents";
import {
  QuestionSummary,
  TagDetails,
} from "@/services/api/programmingForumSchemas";
import { convertTagToTrack, useExercismSearch } from "@/services/exercism";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export const Feed = () => {
  const [params] = useSearchParams();

  // Fetch tags
  const {
    data: tagSearchResult,
    isLoading: isTagsLoading,
    error: tagsError,
  } = useSearchTags({
    queryParams: { q: params.get("q") ?? "" }, // Fetch default tags
  });

  // Fetch questions
  const {
    data: questionSearchResult,
    isLoading: isQuestionsLoading,
    error: questionsError,
  } = useSearchQuestions({
    queryParams: {
      pageSize: 9,
      q: params.get("q") ?? "",
      sortBy: "recommended",
    }, // Fetch default questions
  });

  // Fetch related exercises using your useExercismSearch hook
  const {
    data: exercismData,
    isLoading: isExercisesLoading,
    error: exercisesError,
  } = useExercismSearch(
    {
      params: {
        text: params.get("q") ?? "", // Use the search query (if any)
        difficulty: params.get("difficultyLevel") ?? "easy", // Default to "easy" if not provided
        track: convertTagToTrack(params.get("tag") ?? "python"), // Default to Python if no tag is provided
      },
    },
    {
      enabled: !!params.get("q") || true, // Always enabled if there is content or just to fetch default Python exercises
    },
  );

  // Determine loading state and errors
  const isLoading = isTagsLoading || isQuestionsLoading || isExercisesLoading;
  const error = tagsError || questionsError || exercisesError;

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  // Extract data
  const tags = (tagSearchResult?.data as { items?: TagDetails[] }).items || [];
  const questions =
    (questionSearchResult?.data as { items?: QuestionSummary[] }).items || [];
  const exercises = exercismData?.results || [];

  return (
    <div className="container py-8">
      {/* Tags Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Tags</h2>
          <a href="/tags" className="text-red-700 hover:underline">
            See all →
          </a>
        </div>
        {tags.length === 0 ? (
          <Alert variant="default" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No tags found</AlertTitle>
            <AlertDescription>
              Try searching for something else.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="mt-4 flex gap-4 overflow-x-auto">
            {tags.map((tag) => (
              <div key={tag.tagId} className="flex min-w-[300px]">
                <TagCard tag={tag} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Questions Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recommended Questions</h2>
        </div>
        {questions.length === 0 ? (
          <Alert variant="default" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No questions found</AlertTitle>
            <AlertDescription>
              Try searching for something else.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-4 overflow-x-auto">
            {questions.map((question) => (
              <div key={question.id} className="flex min-w-[300px]">
                <QuestionCard
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
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Exercises Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Related Exercises</h2>
        </div>
        {exercises.length === 0 ? (
          <Alert variant="default" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No exercises found</AlertTitle>
            <AlertDescription>
              Try searching for something else.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="mt-4 flex gap-4 overflow-x-auto">
            {exercises.map((exercise) => (
              <div key={exercise.slug} className="flex min-w-[300px]">
                <ExerciseCard
                  key={exercise.slug}
                  id={Number(exercise.slug)}
                  title={exercise.blurb}
                  description={exercise.blurb}
                  difficulty={exercise.difficulty}
                  link={exercise.self_link}
                  tags={[]}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
