import LinkIcon from "@/assets/Icon/General/Link.svg?react";
import placeholderProfile from "@/assets/placeholder_profile.png";
import { Answers } from "@/components/Answers";
import BookmarkButton from "@/components/BookmarkButton";
import { ContentWithSnippets } from "@/components/ContentWithSnippets";
import { CreateAnswerForm } from "@/components/CreateAnswerForm";
import { DifficultyBar } from "@/components/DifficultyBar";
import ErrorAlert from "@/components/ErrorAlert";
import { ExerciseCard } from "@/components/ExerciseCard";
import FollowButton from "@/components/FollowButton";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { TagDetails } from "@/services/api/programmingForumSchemas";

import { MultiSelect } from "@/components/multi-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteQuestion as useDeleteQuestionById,
  useDownvoteQuestion,
  useGetQuestionDetails,
  useSearchTags,
  useUpdateQuestion,
  useUpvoteQuestion,
} from "@/services/api/programmingForumComponents";
import useAuthStore from "@/services/auth";
import { convertTagToTrack, useExercismSearch } from "@/services/exercism";
import { Flag, MessageSquare, ThumbsDown, ThumbsUp, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function QuestionPage() {
  const { questionId } = useParams();

  const {
    data: result,
    isLoading,
    error,
    refetch,
  } = useGetQuestionDetails(
    {
      pathParams: { questionId: questionId ? Number(questionId) : -1 },
    },
    {
      enabled: !!questionId,
    },
  );
  const data = result?.data;

  const { mutateAsync: deleteQuestion } = useDeleteQuestionById();
  const { selfProfile, token } = useAuthStore();

  const [optimisticVotes, setOptimisticVotes] = useState<number | null>(null);

  const { mutateAsync: upvoteQuestion } = useUpvoteQuestion({
    onMutate: async () => {
      setOptimisticVotes((prev) => (prev ?? data?.likeCount ?? 0) + 1);
    },
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticVotes(null);
      });
    },
    onError: () => {
      setOptimisticVotes(null);
    },
  });

  const { mutateAsync: downvoteQuestion } = useDownvoteQuestion({
    onMutate: async () => {
      setOptimisticVotes((prev) => (prev ?? data?.likeCount ?? 0) - 1);
    },
    onSuccess: () => {
      refetch().then(() => {
        setOptimisticVotes(null);
      });
    },
  });
  const { data: exercismData } = useExercismSearch(
    {
      params: {
        text: data?.content,
        difficulty:
          (data as unknown as { difficultyLevel: string })?.difficultyLevel ??
          "easy",
        track: convertTagToTrack(data?.tags?.[0]?.name ?? ""),
      },
    },
    {
      enabled: !!data?.content,
    },
  );

  const { data: tagSearchData } = useSearchTags(
    { queryParams: { q: "", pageSize: 1000 } },
    { enabled: true },
  );

  useEffect(() => {
    if (tagSearchData?.data) {
      const tagsData = (tagSearchData.data as { items: TagDetails[] }).items;
      setAvailableTags(tagsData);
    }
  }, [tagSearchData]);

  const question = data! || {};
  const [isEditing, setIsEditing] = useState(false); // To toggle edit mode
  const [isPreviewMode, setIsPreviewMode] = useState(false); // Preview toggle for description

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [tags, setTags] = useState<number[]>(
    question.tags?.map((tag) => Number(tag.id)) || [],
  ); // Tag IDs state
  const [availableTags, setAvailableTags] = useState<
    { tagId: string; name: string }[]
  >([]); // Available tags

  const { mutateAsync: updateQuestion, isPending } = useUpdateQuestion({
    onSuccess: () => {
      refetch();
      setIsEditing(false);
    },
  });

  const saveChanges = async () => {
    try {
      await updateQuestion({
        pathParams: { questionId: question.id },
        body: {
          title: titleRef.current?.value || question.title,
          content: contentRef.current?.value || question.content,
          tags: tags,
        },
      });
      toast({
        variant: "default",
        title: "Changes saved",
        description: "The question has been updated successfully.",
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save changes", err);
      toast({
        variant: "destructive",
        title: "Failed to save changes",
        description: "An error occurred while updating the question.",
      });
    }
  };

  if (isLoading) {
    return <FullscreenLoading overlay />;
  }
  if (error) {
    return <ErrorAlert error={error} />;
  }
  if (!question) {
    return (
      <ErrorAlert
        error={{
          status: 404,
          payload: { status: 404, message: "Question not found" },
        }}
      />
    );
  }

  return (
    <div className="container mx-auto flex gap-6 py-16">
      {/* Left Column: Question and Answers */}
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          {isEditing ? (
            <Input
              defaultValue={question.title}
              ref={titleRef}
              placeholder="Enter question title..."
            />
          ) : (
            <h1 className="text-3xl font-bold">{question.title}</h1>
          )}

          <div className="flex gap-2">
            <Button
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({
                  variant: "default",
                  title: "Link copied",
                  description:
                    "The link to this question has been copied to your clipboard",
                });
              }}
              aria-label="Copy link"
            >
              <LinkIcon className="h-5 w-5" />
            </Button>
            {selfProfile?.id === question.author.id && (
              <Button
                onClick={() =>
                  deleteQuestion({ pathParams: { questionId: question.id } })
                }
                size="icon"
                aria-label="Delete question"
                variant="destructive"
              >
                <Trash className="h-5 w-5" />
              </Button>
            )}
            {!!token && (
              <BookmarkButton
                question={{
                  questionId: question.id,
                  bookmarked: question.bookmarked,
                }}
              />
            )}
          </div>
        </div>

        {/* Author Info and Follow Button */}
        <div className="mb-4 flex items-center justify-between">
          <Link
            to={`/users/${question.author.id}`}
            className="flex items-center gap-4"
          >
            <img
              src={question.author?.profilePicture || placeholderProfile}
              alt={"Profile picture"}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="font-semibold">{question.author.name}</span>
          </Link>
          {token && selfProfile?.id !== question.author.id && (
            <FollowButton profile={question.author} />
          )}
        </div>

        {/* Voting and Answer Count */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4" />
            <span className="font-bold">
              {optimisticVotes ?? question.likeCount - question.dislikeCount!}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="font-bold">{question.commentCount}</span>
          </div>
          {!!token && (
            <div className="flex gap-2">
              <Button
                aria-label="Upvote"
                size="sm"
                disabled={question.selfVoted === 1}
                onClick={() =>
                  upvoteQuestion({
                    pathParams: { questionId: question.id },
                  })
                }
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                aria-label="Downvote"
                size="sm"
                variant="outline"
                disabled={question.selfVoted === -1}
                onClick={() =>
                  downvoteQuestion({
                    pathParams: { questionId: question.id },
                  })
                }
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Metadata and Tags */}
        <div className="mb-4 grid grid-cols-2 gap-2 py-2">
          <span className="flex items-center gap-4 font-semibold">
            <Flag className="h-6 w-6" />
            {isEditing ? (
              <MultiSelect
                options={availableTags.map((tag) => ({
                  value: String(tag.tagId),
                  label: tag.name || "Loading...",
                }))}
                value={tags.map((tag) => String(tag))}
                onValueChange={(selectedIds) => {
                  const selectedTags = selectedIds.map((id) => Number(id)); // Convert back to numbers
                  setTags(selectedTags);
                }}
                placeholder="Select Tags"
              />
            ) : (
              <div>
                {question.tags.map((s) => (
                  <Link to={`/tag/${s.id}`} key={s.name}>
                    <Badge>{s.name}</Badge>
                  </Link>
                ))}
              </div>
            )}
          </span>
          <span className="flex items-center gap-4 font-semibold">
            Asked: {new Date(question.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Question Content */}
        {isEditing ? (
          <div>
            <div className="flex gap-2">
              <Button
                variant={!isPreviewMode ? "default" : "outline"}
                onClick={() => setIsPreviewMode(false)}
              >
                Write
              </Button>
              <Button
                variant={isPreviewMode ? "default" : "outline"}
                onClick={() => setIsPreviewMode(true)}
              >
                Preview
              </Button>
            </div>
            {isPreviewMode ? (
              <div className="min-h-[200px] rounded-lg border border-gray-300 bg-white p-4">
                <ContentWithSnippets
                  content={contentRef.current?.value || ""}
                />
              </div>
            ) : (
              <Textarea
                ref={contentRef}
                defaultValue={question.content}
                placeholder="Enter question content..."
              />
            )}
          </div>
        ) : (
          <ContentWithSnippets content={question.content} />
        )}

        {/* Edit and Save Buttons */}
        {isEditing ? (
          <div className="flex gap-4">
            <Button onClick={saveChanges} disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          selfProfile?.id === question.author.id && (
            <Button variant="default" onClick={() => setIsEditing(true)}>
              Edit Question
            </Button>
          )
        )}

        {/* Difficulty Bar */}
        <DifficultyBar
          easyCount={question.easyCount}
          mediumCount={question.mediumCount}
          hardCount={question.hardCount}
          questionId={question.id}
        />

        {/* Answers Section */}
        <h1 className="mb-4 mt-4 text-2xl font-bold">Answers</h1>
        {questionId && <Answers questionId={Number(questionId)} />}

        {/* Answer Create Form */}
        {token && <CreateAnswerForm questionId={Number(questionId)} />}
      </div>

      {/* Vertical Divider */}
      <div className="w-px bg-gray-300"></div>

      {/* Right Column: Collection of Links */}
      {/* Right Column: Collection of Exercise Cards */}
      <div className="w-1/4 space-y-4 rounded-lg bg-white p-4 shadow-md">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Related Exercises
        </h2>
        {exercismData?.results.map((exercise) => (
          <ExerciseCard
            key={exercise.slug}
            id={Number(exercise.slug)}
            title={exercise.blurb}
            description={exercise.blurb}
            difficulty={exercise.difficulty}
            link={exercise.self_link}
            tags={[]}
          />
        ))}
      </div>
    </div>
  );
}
