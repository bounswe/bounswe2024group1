import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  type Comment as CommentSchema,
  UserSummary,
} from "@/services/api/semanticBrowseSchemas";
import {
  useAddCommentToRecipe,
  useGetCommentsForRecipe,
  useRemoveUpvoteFromComment,
  useUpvoteComment,
} from "@/services/api/semanticBrowseComponents";
import { useEffect } from "react";
import { ThumbsUp } from "lucide-react";
import { formatRelative } from "date-fns";
import { cn } from "@/lib/utils";

export const Comment = ({
  comment: {
    author,
    upvoteCount,
    content,
    createdAt,
    recipeId,
    hasSelfUpvoted,
    id,
  },
}: {
  comment: CommentSchema;
}) => {
  const { refetch } = useGetCommentsForRecipe({ pathParams: { recipeId } });

  const { mutateAsync: upvote } = useUpvoteComment();
  const { mutateAsync: removeUpvote } = useRemoveUpvoteFromComment();
  return (
    <div className="flex flex-col self-stretch ">
      <Card className="flex flex-1 flex-col bg-gray-100 pt-16">
        <CardHeader className="py-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <img
                src={author.profilePicture || "https://placehold.co/640x640"}
                alt="Author"
                className="mr-2 h-16 w-16 rounded-full"
              />
              <p className="text-lg font-medium text-gray-900">
                {author.username}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm text-gray-500">
                {formatRelative(createdAt, new Date())}
              </p>
              <p className="text-sm text-gray-500">{upvoteCount} Upvotes</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-2">
          <p className="text-sm text-gray-500">{content} </p>
          <Button
            onClick={() => {
              if (hasSelfUpvoted) {
                removeUpvote({
                  pathParams: { recipeId, commentId: id },
                }).then(() => refetch());
              } else {
                upvote({ pathParams: { recipeId, commentId: id } }).then(() =>
                  refetch(),
                );
              }
            }}
            size="icon"
            variant="outline"
          >
            <ThumbsUp
              className={cn(
                "h-6 w-6 transition-all",
                hasSelfUpvoted &&
                  "fill-primary text-primary hover:fill-primary/70",
              )}
            />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const addCommentSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty"),
});

type AddCommentFormData = z.infer<typeof addCommentSchema>;

export const AddComment = ({
  user: { username, profilePicture },
  recipeId,
}: {
  user: UserSummary;
  recipeId: number;
}) => {
  const form = useForm<AddCommentFormData>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = form;

  const { mutateAsync, isSuccess } = useAddCommentToRecipe();
  const { refetch } = useGetCommentsForRecipe({
    pathParams: { recipeId },
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
      reset();
    }
  }, [isSuccess, refetch, reset]);

  const onSubmit = (data: AddCommentFormData) => {
    // TODO: fix after backend is fixed
    return mutateAsync({ pathParams: { recipeId }, body: data });
  };

  return (
    <div className="flex flex-col self-stretch">
      <Card className="flex flex-1 flex-col bg-gray-100 pt-16">
        <CardHeader className="py-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <img
                src={profilePicture || "https://placehold.co/640x640"}
                alt="Author"
                className="mr-2 h-16 w-16 rounded-full"
              />
              <p className="text-lg font-medium text-gray-900">{username}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-2">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your comment here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                className="btn btn-primary self-end"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
